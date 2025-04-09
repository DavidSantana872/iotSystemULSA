//Library for DHT11 sensor
#include <DHT.h>
#include <WiFi.h>  
#include <PubSubClient.h>
#include <ArduinoJson.h>

//ESP-32 sector ID
const int esp_sector_id = 7;

//DHT11 variables declaration*****************************************************************

const int DHTPin = 4;
DHT dht(DHTPin, DHT11);
float temperature = 0; 
float humidity = 0;      
float heat_index = 0;   

//Microphone variables declaration***********************************************************

const int Mic_Pin = 34;
unsigned int sample;
unsigned int signalMax = 0;
unsigned int signalMin = 4095;
float dB = 0.0;

//Air quality sensor variables declaration***************************************************

const int air_analog_pin = 35; // A3

//Timing intervals

unsigned long previousMillisDHT = 0;
unsigned long previousMillisMic = 0;
unsigned long previousMillisAir = 0;
unsigned long previousMillisMQTT = 0;

const long intervalDHT = 10000;   // 10 seconds
const long intervalMic = 100;      // 100 ms
const long intervalAir = 30000;   // 30 seconds
const long intervalMQTT = 120000;   //  2 minutes for MQTT publish

//WiFi credentials
const char* ssid = "<network_name>";
const char* password = "<network_password>";

// MQTT Broker Setup 
const char* mqtt_server = "<mqtt_serverIP>";
const char* mqtt_user = "<user_name>";
const char* mqtt_password = "<user_password>";

WiFiClient espClient;
PubSubClient client(espClient);

//Values to get the averages for the last 2 minutes
float avg_dB = 0;
float min_dB = 1000;
float max_dB = -1000;

float avg_air = 0;
float min_air = 1000;
float max_air = -1000;

void setup_wifi() {
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("connected.");
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT broker...");
    if (client.connect("ESP32_Client", mqtt_user, mqtt_password)) {
      Serial.println(" connected.");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200); 
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  dht.begin(); 
  delay(5000);
}

void loop() {
  control_state();
}


void control_state(){

  unsigned long currentMillis = millis();

  if (!client.connected()) reconnect();
  client.loop();

  // DHT11 readings
  if (currentMillis - previousMillisDHT >= intervalDHT) {
    previousMillisDHT = currentMillis;
    readDHT11();
  }

  // Microphone readings
  if (currentMillis - previousMillisMic >= intervalMic) {
    previousMillisMic = currentMillis;
    readMicrophone();
  }

  // Air Quality readings
  if (currentMillis - previousMillisAir >= intervalAir) {
    previousMillisAir = currentMillis;
    readAirQuality();
  }

  // MQTT Publish
  if (currentMillis - previousMillisMQTT >= intervalMQTT) {
    previousMillisMQTT = currentMillis;
    send_data_mqtt();
  }
}

void readDHT11(){

  //Capture temperature, humidity and heat index values
  humidity = dht.readHumidity();      
  temperature = dht.readTemperature(); 
  
  if(isnan(humidity) || isnan(temperature) ){ 
    Serial.println("Sensor reading error");
    return;
  }
  
  heat_index = dht.computeHeatIndex(temperature, humidity, false); 
}

void readMicrophone(){

  sample = analogRead(Mic_Pin);

  if (sample < 4095){
    if (sample > signalMax) signalMax = sample;
    if (sample < signalMin) signalMin = sample;
  }

  int peakToPeak = signalMax - signalMin;
  float voltage = (peakToPeak * 3.3) / 4095.0;
  dB = 20.0 * log10(voltage / 0.006);

  if (dB > max_dB) {
    max_dB = dB;
  }

  if (dB < min_dB) {
    min_dB = dB;
  }

}

void readAirQuality(){

  int analogValueRaw = analogRead(air_analog_pin);
  int analogValue = map(analogValueRaw, 0, 4095, 0, 1023); 

  if (analogValue > max_air) {
    max_air = analogValue;
  }

  if (analogValue < min_air) {
    min_air = analogValue;
  }

}

void calculate_avg(){
  avg_dB = (max_dB+min_dB) / 2;
  avg_air = (max_air+min_air) / 2;
}

void send_data_mqtt(){

  calculate_avg();

  create_json_and_send_data(3, "temperature", temperature);
  create_json_and_send_data(4, "humidity", humidity);
  create_json_and_send_data(5, "heat_index", heat_index);
  create_json_and_send_data(6, "avg_sound_dB", avg_dB);
  create_json_and_send_data(7, "min_sound_dB", min_dB);
  create_json_and_send_data(9, "max_sound_dB", max_dB);
  create_json_and_send_data(10, "avg_air", avg_air);
  create_json_and_send_data(11, "min_air_quality", min_air);
  create_json_and_send_data(12, "max_air_quality", max_air);

  delay(50);
  //reset averages, minimum and maximus values
  min_air = 1000;
  max_air = -1000;
  min_dB = 1000;
  max_dB = -1000;
}

void create_json_and_send_data(int metric_id, char* label, float value){
  
  StaticJsonDocument<128> doc;

  doc["sector_id"] = esp_sector_id;
  doc["metric_id"] = metric_id;
  doc["label"] = label;
  doc["value"] = value;

  char buffer[128];
  serializeJson(doc, buffer);

  bool success = client.publish("esp32/data", buffer);

  if (success) {
    Serial.println("Data published successfully");
    Serial.print("Sent data: "); Serial.println(buffer);
  } else {
    Serial.println("Failed to publish data");
  }
}

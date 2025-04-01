#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// Configuración de WiFi
const char* ssid = "NOMBRE_DE_TU_WIFI";
const char* password = "CONTRASEÑA_DE_TU_WIFI";

// Configuración del broker MQTT (usa la IP de tu servidor en Google Cloud)
const char* mqtt_server = "TU_IP_DEL_SERVIDOR";
const int mqtt_port = 1883; // Asegúrate de que el puerto esté abierto en Google Cloud

WiFiClient espClient;
PubSubClient client(espClient);

// Configuración de sensores
const int DHTPin = 4;
DHT dht(DHTPin, DHT11);

const int Mic_Pin = 34;
const int air_analog_pin = 35; // Sensor de calidad del aire

// Variables para datos
float temperature = 0;
float humidity = 0;
float dB = 0.0;
String airQuality = "";

// Función para conectar a WiFi
void setup_wifi() {
  delay(10);
  Serial.println("Conectando a WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("Conectado a WiFi");
}

// Función para conectar al broker MQTT
void reconnect() {
  while (!client.connected()) {
    Serial.println("Conectando al broker MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Conectado a MQTT");
    } else {
      Serial.print("Falló, rc=");
      Serial.print(client.state());
      Serial.println(" Intentando de nuevo...");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  dht.begin();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Leer sensores
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  dB = analogRead(Mic_Pin);
  int analogValue = analogRead(air_analog_pin);
  airQuality = getAirQuality(analogValue);

  // Enviar datos por MQTT
  String payload = "{";
  payload += "\"temperature\": " + String(temperature) + ",";
  payload += "\"humidity\": " + String(humidity) + ",";
  payload += "\"noise\": " + String(dB) + ",";
  payload += "\"air_quality\": \"" + airQuality + "\"";
  payload += "}";

  client.publish("ulsa/sensores", payload.c_str());
  Serial.println("Datos enviados: " + payload);

  delay(5000);
}

// Función para evaluar calidad del aire
String getAirQuality(int analogValue) {
  if (analogValue <= 200) return "Excellent";
  else if (analogValue <= 400) return "Good";
  else if (analogValue <= 600) return "Moderate";
  else if (analogValue <= 800) return "Poor";
  else return "Very Poor";
}

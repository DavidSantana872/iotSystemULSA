//Library for DHT11 sensor
#include <DHT.h>

//DHT11 variables declaration*****************************************************************

const int DHTPin = 4;
DHT dht(DHTPin, DHT11);
float temperature = 0; 
float humidity = 0;      
float index_heat = 0;   

//Delay time for DHT11;
unsigned long initial_time_DHT11 = 0, final_time_DHT11 = 0;
unsigned long delay_time_DHT11 = 10000; //10 seconds delays
unsigned long diference_DHT11 = 0;

//Microphone variables declaration***********************************************************

const int Mic_Pin = 34;

//Delay time for Microphone;
unsigned long initial_time_Mic = 0, final_time_Mic = 0;
unsigned long delay_time_Mic = 50; // 50 Miliseconds delays
unsigned long diference_Mic = 0;
unsigned int sample;
unsigned int signalMax = 0;
unsigned int signalMin = 4095;
float dB = 0.0;

//Air quality sensor variables declaration***************************************************

const int air_analog_pin = 35; // A3

//Delay for air quality sensor
unsigned long initial_time_air = 0, final_time_air = 0;
unsigned long delay_time_air = 60000; // 60 seconds delays
unsigned long diference_air = 0;
String airQuality = ""; 

void setup() {
  Serial.begin(115200); 
  dht.begin(); //Start instance 
  delay(2000);
}

void loop() {
  // put your main code here, to run repeatedly:
  control_state();
}


void control_state(){

  //Tiempo de respuesta del DHT11 cada 2s
  diference_DHT11 = initial_time_DHT11 - final_time_DHT11;
  initial_time_DHT11 = millis();

  if(diference_DHT11 >= delay_time_DHT11){
    
      final_time_DHT11 = initial_time_DHT11;   
          
      get_Temp_Hume_Index();
   }

  
  //Measurement time for Microphone
  diference_Mic = initial_time_Mic - final_time_Mic;
  initial_time_Mic = millis();

  if(diference_Mic >= delay_time_Mic){
    
      final_time_Mic = initial_time_Mic;   
          
      get_dB();
   }

   //Measurement time for Air quality
  diference_air = initial_time_air - final_time_air;
  initial_time_air = millis();

  if(diference_air >= delay_time_air){
    
      final_time_air = initial_time_air;   
          
      get_air_quality();
   }

}

void get_Temp_Hume_Index(){

  //Capture temperature, humidity and index heat values
  humidity = dht.readHumidity();      
  temperature = dht.readTemperature(); 
  
  if(isnan(humidity) || isnan(temperature) ){ 
    Serial.println("Sensor reading error");
    return;
  }
  
  index_heat = dht.computeHeatIndex(temperature, humidity, false); 
}

void get_dB(){

  sample = analogRead(Mic_Pin);

  if (sample < 4095){
    if (sample > signalMax) signalMax = sample;
    if (sample < signalMin) signalMin = sample;
  }

  int peakToPeak = signalMax - signalMin;
  float voltage = (peakToPeak * 3.3) / 4095.0;
  dB = 20.0 * log10(voltage / 0.006);

  Serial.print("db: "); Serial.println(dB);
}

void get_air_quality(){

  int analogValueRaw = analogRead(air_analog_pin);
  int analogValue = map(analogValueRaw, 0, 4095, 0, 1023); // Scale the value to match the Pico's range
  airQuality = getAirQuality(analogValue);
  Serial.print("Analog Value (Raw): ");
  Serial.print(analogValueRaw);
  Serial.print(", Scaled Value: ");
  Serial.print(analogValue);
}

String getAirQuality(int analogValue) {
  if (analogValue <= 200) {
    return "Excellent";
  } else if (analogValue <= 400) {
    return "Good";
  } else if (analogValue <= 600) {
    return "Moderate";
  } else if (analogValue <= 800) {
    return "Poor";
  } else {
    return "Very Poor";
  }
}
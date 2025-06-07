#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include <ESP32Servo.h>

// WiFi credentials
const char* ssid = "Galaxy Tab A928D";
const char* password = "226031695";

// Server details
const char* serverName = "http://192.168.77.198:3000";

// RFID
#define SS_PIN    5    
#define RST_PIN   27   
MFRC522 mfrc522(SS_PIN, RST_PIN);  

// LCD
#define I2C_ADDR 0x27
#define LCD_COLUMNS 16
#define LCD_ROWS 2
LiquidCrystal_I2C lcd(I2C_ADDR, LCD_COLUMNS, LCD_ROWS);

// LEDs and Buzzer
#define GREEN_LED_PIN 25
#define RED_LED_PIN 33
#define BUZZER_PIN 32

// Servo
#define SERVO_PIN 26 
Servo myServo; 

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // RFID Initialization
  SPI.begin();          
  mfrc522.PCD_Init();   
  Serial.println("RFID Reader initialized");

  // LCD Initialization
  lcd.init();          
  lcd.backlight();     
  lcd.setCursor(0, 0);  
  lcd.print("BABY DRIVER");
  lcd.setCursor(0, 1);  
  lcd.print("LCD test");

  // Servo Initialization
  myServo.attach(SERVO_PIN);  
  Serial.println("Servo test initialized");

  // LEDs and Buzzer Initialization
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  String uuid = readRFID();
  
  if (!uuid.isEmpty()) {
    // Display UID on LCD
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Card UID:");
    lcd.setCursor(0, 1);
    lcd.print(uuid);

    // Send UUID to server
    if (WiFi.status() == WL_CONNECTED) {
      sendUUIDToServer(uuid);
    } else {
      Serial.println("WiFi Disconnected");
    }

    // Get the expected UUID from server
    String expectedUUID = getExpectedUUID();

    // Compare UUID
    boolean result = (uuid == expectedUUID);

    // Send result to server
    sendResult(result);

    // Display result on LCD
    if (result) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Congratulations!");
      digitalWrite(GREEN_LED_PIN, HIGH);

      delay(2000);
       digitalWrite(GREEN_LED_PIN, LOW);

    } else {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Try Again!!!");
      digitalWrite(RED_LED_PIN, HIGH);
            digitalWrite(BUZZER_PIN, HIGH);
      delay(2000);
             digitalWrite(BUZZER_PIN, LOW);
      digitalWrite(RED_LED_PIN, LOW);
    }

    // Move the servo based on the result
    
    myServo.write(160);
    delay(10000);
    myServo.write(0);

    
  }
  
  delay(1000);
}

String readRFID() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    return "";
  }

  // Get the UID of the card
  String content = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }

  content.toUpperCase();

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();

  Serial.println("Card UID: " + content);
  return content;
}

void sendUUIDToServer(String uuid) {
  HTTPClient http;
  http.begin(String(serverName) + "/task1");
  http.addHeader("Content-Type", "application/json");

  String payload = "{\"uuid\":\"" + uuid + "\"}";
  int httpResponseCode = http.POST(payload);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println(httpResponseCode);
    Serial.println(response);
  } else {
    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

String getExpectedUUID() {
  HTTPClient http;
  http.begin(String(serverName) + "/passed-uuid");
  int httpResponseCode = http.GET();

  String payload = "";
  if (httpResponseCode == 200) {
    payload = http.getString();
    // Parse JSON response to get UUID
    StaticJsonDocument<200> doc;
    deserializeJson(doc, payload);
    payload = doc["uuid"].as<String>();
  }
  http.end();

  Serial.println("Expected UUID: " + payload);
  return payload;
}

void sendResult(boolean result) {
  HTTPClient http1;
  http1.begin(String(serverName) + "/sendResult");
  http1.addHeader("Content-Type", "application/json");

  String jsonData = "{\"result\": " + String(result ? 1 : 0) + "}";
  int httpResponseCode = http1.POST(jsonData);

  if (httpResponseCode == 200) {
    Serial.println("Result sent successfully");
  } else {
    Serial.println("Error sending result");
  }
  http1.end();
}

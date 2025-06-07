#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>

const char* ssid = "YOUR SSID";
const char* password = "YOUR PASSWORD";

const char* serverName = "http://192.168.197.198:3000";

// RFID
#define SS_PIN 5
#define RST_PIN 22
MFRC522 rfid(SS_PIN, RST_PIN);

// LCD
#define I2C_SDA 21
#define I2C_SCL 22
LiquidCrystal_I2C lcd(0x27, 16, 2);  // Change address to 0x27 or 0x3F depending on your module

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  SPI.begin();
  rfid.PCD_Init();

    // Initialize I2C for LCD with custom pins
  Wire.begin(I2C_SDA, I2C_SCL);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("System Ready");
}

void loop() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String uuid = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      uuid += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
      uuid += String(rfid.uid.uidByte[i], HEX);
    }
    uuid.toUpperCase();
    Serial.println("UUID read: " + uuid);

    // Send UUID to server
    if (WiFi.status() == WL_CONNECTED) {
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
//led blink
    } else {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Try Again!!!");
//led blink
    }

    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
  delay(1000);
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
    DeserializationError error = deserializeJson(doc, payload);
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return "";
    }
    payload = doc["uuid"].as<String>();
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
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


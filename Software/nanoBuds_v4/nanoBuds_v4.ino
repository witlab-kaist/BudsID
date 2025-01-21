#include <ArduinoBLE.h>
// #include <Arduino_LSM9DS1.h>
#include <TensorFlowLite.h>
#include <tensorflow/lite/micro/all_ops_resolver.h>
#include <tensorflow/lite/micro/micro_error_reporter.h>
#include <tensorflow/lite/micro/micro_interpreter.h>
#include <tensorflow/lite/version.h>
#include <tensorflow/lite/schema/schema_generated.h>
#include <tensorflow/lite/micro/micro_mutable_op_resolver.h>
// #include <tensorflow/lite/micro/system_setup.h>

#include "src/acceleratedIMU/src/Arduino_LSM9DS1.h"
#include "src/CapacitiveSensor/CapacitiveSensor.h"
#include "model.h"

// we use sensor with 7mm by 7mm square electrode and 1kOhm and 1MOhm resistors. 

// *************************************************************************************
// IMPORTANT: comment out this line for the right bud; leave it defined for the left bud
#define USE_LEFT_BUD
// *************************************************************************************

#ifdef USE_LEFT_BUD
CapacitiveSensor   cs_3_12 = CapacitiveSensor(3,12);        // 10M resistor between pins 4 & 2, pin 2 is sensor pin, add a wire and or foil if desired
#else
CapacitiveSensor   cs_3_12 = CapacitiveSensor(12,3);        // 10M resistor between pins 4 & 2, pin 2 is sensor pin, add a wire and or foil if desired
#endif

#ifdef USE_SINGLE_CHARS
  #ifdef USE_LEFT_BUD  // prefix: 21B58C
  BLEService budsService("21B58C3D-D0E0-4E70-9CEA-45C8FFFF8CD7"); // Bluetooth® Low Energy LED Service
  
  BLEFloatCharacteristic accCharacteristic("21B58C42-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic yAccCharacteristic("21B58C43-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic zAccCharacteristic("21B58C44-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  
  BLEFloatCharacteristic xGyrCharacteristic("21B58C45-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic yGyrCharacteristic("21B58C46-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic zGyrCharacteristic("21B58C47-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  
  BLEFloatCharacteristic xMagCharacteristic("21B58C3E-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic yMagCharacteristic("21B58C3F-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic zMagCharacteristic("21B58C40-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  
  BLEFloatCharacteristic capCharacteristic ("21B58C41-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  
  BLEFloatCharacteristic timeCharacteristic("21B58C48-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  #else                // prefix: 21B58D
  BLEService budsService("21B58D3D-D0E0-4E70-9CEA-45C8FFFF8CD7"); // Bluetooth® Low Energy LED Service
  
  BLEFloatCharacteristic xAccCharacteristic("21B58D42-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic yAccCharacteristic("21B58D43-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic zAccCharacteristic("21B58D44-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  
  BLEFloatCharacteristic xGyrCharacteristic("21B58D45-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic yGyrCharacteristic("21B58D46-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEFloatCharacteristic zGyrCharacteristic("21B58D47-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  
  BLEDoubleCharacteristic xMagCharacteristic("21B58D3E-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEDoubleCharacteristic yMagCharacteristic("21B58D3F-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEDoubleCharacteristic zMagCharacteristic("21B58D40-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  
  BLEFloatCharacteristic capCharacteristic ("21B58D41-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  
  BLEFloatCharacteristic timeCharacteristic("21B58D48-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  #endif
#else
  #ifdef USE_LEFT_BUD  // prefix: 21B58C
  BLEService budsService("21B58C3D-D0E0-4E70-9CEA-45C8FFFF8CD7"); // Bluetooth® Low Energy LED Service

  BLEDoubleCharacteristic accCharacteristic ("21B58C50-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEDoubleCharacteristic gyrCharacteristic ("21B58C51-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEDoubleCharacteristic magCharacteristic ("21B58C52-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEDoubleCharacteristic dataCharacteristic("21B58C53-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  
  #else                // prefix: 21B58D
  BLEService budsService("21B58D3D-D0E0-4E70-9CEA-45C8FFFF8CD7"); // Bluetooth® Low Energy LED Service

  BLEDoubleCharacteristic accCharacteristic ("21B58D50-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEDoubleCharacteristic gyrCharacteristic ("21B58D51-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEDoubleCharacteristic magCharacteristic ("21B58D52-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  BLEDoubleCharacteristic dataCharacteristic("21B58D53-D0E0-4E70-9CEA-45C8FFFF8CD7", BLERead | BLENotify);
  #endif
#endif

long updateMS = 1;//1000.0/80.0; // 12.5ms
long lastMS   = 0; 
long btPollMS = 0; 

constexpr int tensorArenaSize = 64 * 1024;
byte tensorArena[tensorArenaSize];

// global variables used for TensorFlow Lite (Micro)
tflite::ErrorReporter* error_reporter = nullptr;
tflite::AllOpsResolver tflOpsResolver;
const tflite::Model *tflModel = nullptr;
tflite::MicroInterpreter *tflInterpreter = nullptr;
TfLiteTensor* tflInputTensor = nullptr;
TfLiteTensor *tflOutputTensor = nullptr;

constexpr int magnet_height = 80;
constexpr int magnet_channels = 3;
constexpr int magnet_byte_count = magnet_height * magnet_channels;
float MagnetometerBuffer[magnet_byte_count];
constexpr int label_count = 3;
const char *labels[label_count] = { "index", "mid", "ring" };

int bufferIndex = 0; 
int capTotal = 0;
int capa = 0;
int BUFFER_SIZE = magnet_byte_count;

void budsConnectHandler(BLEDevice central) {
  // central connected event handler
  Serial.print("Connected event, central: ");
  Serial.println(central.address());
}

void budsDisconnectHandler(BLEDevice central) {
  // central disconnected event handler
  Serial.print("Disconnected event, central: ");
  Serial.println(central.address());
}

void shareData(String header, float x, float y, float z, float scale, BLEDoubleCharacteristic c, boolean showSerial) {
      // multiply for readability, convert to short (check for loss)
      short xS, yS, zS; 
      xS = (short)(x*scale); 
      yS = (short)(y*scale); 
      zS = (short)(z*scale); 
      
      uint64_t largeword  = ((((uint64_t) xS) << 48) & 0xFFFF000000000000);
               largeword |= ((((uint64_t) yS) << 32) & 0x0000FFFF00000000);
               largeword |= ((((uint64_t) zS) << 16) & 0x00000000FFFF0000);

      // share via BT
      if (BLE.connected()) {
        c.writeValue(largeword);
      }

      // share via serial
      if (Serial && showSerial) {
        Serial.print(header);
        Serial.print(x);
        Serial.print("\t");
        Serial.print(xS);
        Serial.print("\t");
        Serial.print(y);
        Serial.print("\t");
        Serial.print(yS);
        Serial.print("\t");
        Serial.print(z);
        Serial.print("\t");
        Serial.print(zS);
        Serial.println("\t");
      }
}

void normalization(){
  float max = 0;
  float min = 0;

  // Feature extraction(x,y,z)
  // 1. 2D(80*3), however TINY ML input should be like (x,y,z,x,y,z,x,y,z...) in 1D(240*1)
  // 2. magnetometer normalization
  for (int i = 0; i < 240; i = i + 3) {
    if( MagnetometerBuffer[i] < min ){
      min =  MagnetometerBuffer[i];
    } 
    if( MagnetometerBuffer[i] > max ){
      max =  MagnetometerBuffer[i];
    } 
  }
  for (int i = 0; i < 240; i = i + 3) {
    MagnetometerBuffer[i] = (MagnetometerBuffer[i] - min) / (max-min);
  }

  for (int i = 1; i < 240; i = i + 3) {
    if( MagnetometerBuffer[i] < min ){
      min =  MagnetometerBuffer[i];
    } 
    if( MagnetometerBuffer[i] > max ){
      max =  MagnetometerBuffer[i];
      } 
  }

  for (int i = 1; i < 240; i = i + 3) {
    MagnetometerBuffer[i] = (MagnetometerBuffer[i] - min) / (max-min);
  }

  for (int i = 2; i < 240; i = i + 3) {
    if( MagnetometerBuffer[i] < min ){
      min =  MagnetometerBuffer[i];
    } 
    if( MagnetometerBuffer[i] > max ){
      max =  MagnetometerBuffer[i];
      } 
  }
  for (int i = 2; i < 240; i = i + 3) {
    MagnetometerBuffer[i] = (MagnetometerBuffer[i] - min) / (max-min);
  }
}

void input(){
  // Model input
  for (int i = 0; i < 240; i++) {
    tflInputTensor->data.f[i] = MagnetometerBuffer[i];
  }
  TfLiteStatus invokeStatus = tflInterpreter->Invoke();
}

void output(){
  // Model output
  for (int i = 0; i < label_count; i++) {
    Serial.print(labels[i]);
    Serial.print(": ");
    float value = tflOutputTensor->data.f[i];
    Serial.println(value, 6);
  }

  capa = 0;
  bufferIndex = 0;
}

void setup() {
  static tflite::MicroErrorReporter micro_error_reporter;  
  error_reporter = &micro_error_reporter;
  tflModel = tflite::GetModel(model);
  tflInterpreter = new tflite::MicroInterpreter(tflModel, tflOpsResolver, tensorArena, tensorArenaSize, error_reporter);
  tflInterpreter->AllocateTensors();
  tflInputTensor = tflInterpreter->input(0);
  tflOutputTensor = tflInterpreter->output(0);

  Serial.begin(230400);

  // begin initialization
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }

  Serial.print("Sampling sensors (M/A/G) at: ");
  Serial.println(IMU.magneticFieldSampleRate());
  Serial.println(IMU.accelerationSampleRate());
  Serial.println(IMU.gyroscopeSampleRate());

  if (!BLE.begin()) {
    Serial.println("Starting Bluetooth® Low Energy module failed!");
    while (1);
  }

  // set advertised local name and service UUID:
#ifdef USE_LEFT_BUD
  BLE.setLocalName("NanoEarbuds");
  BLE.setDeviceName("NanoEarbuds");
#else
  BLE.setLocalName("NanoEarbudsRight");
  BLE.setDeviceName("NanoEarbudsRight");
#endif
  BLE.setAdvertisedService(budsService);


#ifdef USE_SINGLE_CHARS
  // add the characteristic to the service
  budsService.addCharacteristic(xMagCharacteristic);
  budsService.addCharacteristic(yMagCharacteristic);
  budsService.addCharacteristic(zMagCharacteristic);
  
  budsService.addCharacteristic(xAccCharacteristic);
  budsService.addCharacteristic(yAccCharacteristic);
  budsService.addCharacteristic(zAccCharacteristic);
  
  budsService.addCharacteristic(xGyrCharacteristic);
  budsService.addCharacteristic(yGyrCharacteristic);
  budsService.addCharacteristic(zGyrCharacteristic);
  
  budsService.addCharacteristic(capCharacteristic);

  budsService.addCharacteristic(timeCharacteristic);
#else
  budsService.addCharacteristic(accCharacteristic);
  budsService.addCharacteristic(gyrCharacteristic);
  budsService.addCharacteristic(magCharacteristic);
  budsService.addCharacteristic(dataCharacteristic);
#endif
  // add service
  BLE.addService(budsService);

  // assign event handlers for connected, disconnected to peripheral
  BLE.setEventHandler(BLEConnected, budsConnectHandler);
  BLE.setEventHandler(BLEDisconnected, budsDisconnectHandler);

  // start advertising
  BLE.advertise();
  Serial.println("Advertizing BLE EarBud Peripheral");
}

void loop() {
  // timer is approximate - we skip every now and then. 
  long nowMS = millis(); 
  capTotal = cs_3_12.capacitiveSensor(1);
  if (true) {
    BLE.poll();
    float x, y, z;
    shareData("Time/Cap:  ", (float)(nowMS%10000), (float)constrain(capTotal, 0, 2000), 0, 1, dataCharacteristic, false); 
    
    // read and share any new acc data
    if (IMU.accelerationAvailable()) {
      IMU.readAcceleration(x, y, z);
      shareData("Acc:  ", x, y, z, 1000, accCharacteristic, false); 
    }

    // read and share any new gyro data
    if (IMU.gyroscopeAvailable()) {
      IMU.readGyroscope(x, y, z);
      shareData("Gyr:  ", x, y, z, 100, gyrCharacteristic, false); 
    }

    // read any new mag data
    if (IMU.magneticFieldAvailable()) {
      IMU.readMagneticField(x, y, z);
      delay(100/42); //Our model input is 60hz. this delay code for 70hz -> 60hz.
      magML(x,y,z);
      shareData("Mag:  ", x, y, z, 100, magCharacteristic, false); 
    }
    lastMS = nowMS; 
  }
}

void magML(float mx, float my, float mz){
  if (bufferIndex == BUFFER_SIZE & capa == 0) {
    for (int i = 3; i < BUFFER_SIZE; i = i + 3) {
      MagnetometerBuffer[i - 3] = MagnetometerBuffer[i];
    }
    for (int i = 4; i < BUFFER_SIZE; i = i + 3) {
      MagnetometerBuffer[i - 3] = MagnetometerBuffer[i];
    }
    for (int i = 5; i < BUFFER_SIZE; i = i + 3) {
      MagnetometerBuffer[i - 3] = MagnetometerBuffer[i];
    }
    bufferIndex= bufferIndex-3;
  }

  if (bufferIndex < 240 & capa == 0) {
    MagnetometerBuffer[bufferIndex] = mx;
    bufferIndex++;
    MagnetometerBuffer[bufferIndex] = my;
    bufferIndex++;
    MagnetometerBuffer[bufferIndex] = mz;
    bufferIndex++;

  }

  if (capTotal >= 100 & capa == 0) {
    //get 40 samples when touched
    for (int i = 120; i < 240; i = i + 3) {
      MagnetometerBuffer[i - 120] = MagnetometerBuffer[i];
    }
    for (int i = 121; i < 240; i = i + 3) {
      MagnetometerBuffer[(i - 120)] = MagnetometerBuffer[i];
    }
    for (int i = 122; i < 240; i = i + 3) {
      MagnetometerBuffer[(i - 120)] = MagnetometerBuffer[i];
    }
    bufferIndex = 120;
    capa = 1;
  }

  if (capa == 1){
    MagnetometerBuffer[bufferIndex] = mx;
    bufferIndex++;
    MagnetometerBuffer[bufferIndex] = my;
    bufferIndex++;
    MagnetometerBuffer[bufferIndex] = mz;
    bufferIndex++;
    if (bufferIndex == BUFFER_SIZE) {
      normalization(); 
      input();
      output();
    }
  }
}

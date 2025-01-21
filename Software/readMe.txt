BudsID Software

* This software materials cover single tap study, and modest changes are required for double-tap implementation.

Software/
├── Arduino_LSM9DS1.zip
├── Arduino_TensorFlowLite.zip 
├── nanoBuds_v4/
│   ├── model.h 
│   ├── nanoBuds_v4.ino 
│   ├── src/
│   │   ├── CapacitiveSensor/
├── nanoBudsBLE_v5/
│   ├── index.html
│   ├── nanoBudsBLE_v5.js
│   └── libraries/ 
└── readMe.txt

- Arduino_LSM9DS1.zip: This archive contains external libraries required for achieving a higher magnetometer sampling rate.

- Arduino_TensorFlowLite.zip: Libraries to enable tinyML on microcontollers

- nanoBuds_v4/:
  - nanoBuds_v4.ino: This Arduino (.ino) file consists of the code responsible for BLE communication and TensorFlow Lite for Microcontrollers.

- model.h: trained model.

- CapacitiveSensor/: This directory contains an external library related to capacitive sensing.

- nanoBudsBLE_v5/:
  - index.html: This webpage provides a user interface for viewing magnetometer, accelerometer, gyroscope data, and capacitive touch inputs via a BLE connection.

- readMe.txt: This is the project's README file, providing additional details and instructions.

- Data preprocessing and classifier code will be shared with github repository with publication of this work.

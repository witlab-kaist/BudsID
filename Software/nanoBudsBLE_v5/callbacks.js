// UI event handlers. 

// *******************************************************
// Basic BLE functions
// *******************************************************

/*
 * Connect to a device by passing the service UUID, and handler for response (a list of characteristics)
 */
function bleConnectLeft() {
  nanoBudsLeftBLE = new p5ble();  

  if (!isConnectedLeft)
    {
    nanoBudsLeftBLE.connect(SERV_ID_LEFT, "NanoEarbudsLeft", BLEHandleCharacteristicsLeft);
    //nanoBudsLeftBLE.connect(SERV_ID), BLEHandleCharacteristics);
    console.log("Connecting to NanoEarbuds Left....");
    }
  else
    {
    nanoBudsLeftBLE.disconnect();
    isConnectedLeft = nanoBudsLeftBLE.isConnected(); // Check if myBLE is connected
    connectLeft.elt.textContent = 'Connect Left';
    console.log("Disconnecting from NanoEarbuds Left....");
    }
  }  


function bleConnectRight() {
  nanoBudsRightBLE = new p5ble();  
    
  if (!isConnectedRight)
    {
    nanoBudsRightBLE.connect(SERV_ID_RIGHT, "NanoEarbudsRight", BLEHandleCharacteristicsRight);
    //nanoBudsLeftBLE.connect(SERV_ID), BLEHandleCharacteristics);
    console.log("Connecting to NanoEarbuds Right....");
    }
  else
    {
    nanoBudsRightBLE.disconnect();
    isConnectedRight = nanoBudsRightBLE.isConnected(); // Check if myBLE is connected
    connectRight.elt.textContent = 'Connect Right';
    console.log("Disconnecting from NanoEarbuds Right....");
    }
  }  


// *******************************************************
// END basic BLE functions
// *******************************************************




// *******************************************************
// Commands to arduino
// *******************************************************


// *******************************************************
// END Commands to arduino
// *******************************************************

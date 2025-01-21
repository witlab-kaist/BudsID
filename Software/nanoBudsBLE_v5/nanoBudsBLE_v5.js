/*
 * BLE object
 */
let nanoBudsLeftBLE;
let nanoBudsRightBLE; 
let isConnectedLeft = false;
let isConnectedRight = false;

/* BLE data size - aiming for 64 bit numbers; fall back to 32 bit numbers */
let dataType64 = 'float64';
let dataType = 'float32';

/*
 * Service/characteristic IDs. 
 */
const SERV_ID_LEFT   = "21B58C3D-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase() // Service UUID
// left bud
// mag
const CODE_X_LEFT     = "21B58C3E-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_Y_LEFT     = "21B58C3F-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_Z_LEFT     = "21B58C40-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
// acc
const CODE_XA_LEFT    = "21B58C42-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_YA_LEFT    = "21B58C43-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_ZA_LEFT    = "21B58C44-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
// gyro
const CODE_XG_LEFT    = "21B58C45-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_YG_LEFT    = "21B58C46-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_ZG_LEFT    = "21B58C47-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
//cap
const CODE_C_LEFT     = "21B58C41-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
// time
const CODE_TIME_LEFT  = "21B58C48-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()

// right bud
const SERV_ID_RIGHT   = "21B58D3D-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase() // Service UUID
// mag
const CODE_X_RIGHT    = "21B58D3E-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_Y_RIGHT    = "21B58D3F-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_Z_RIGHT    = "21B58D40-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
// acc
const CODE_XA_RIGHT   = "21B58D42-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_YA_RIGHT   = "21B58D43-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_ZA_RIGHT   = "21B58D44-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
// gyro
const CODE_XG_RIGHT   = "21B58D45-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_YG_RIGHT   = "21B58D46-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_ZG_RIGHT   = "21B58D47-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
// cap
const CODE_C_RIGHT    = "21B58D41-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
// time
const CODE_TIME_RIGHT = "21B58D48-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()



// codes for the new characteristics
const CODE_ACC_LEFT    = "21B58C50-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_GYR_LEFT    = "21B58C51-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_MAG_LEFT    = "21B58C52-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_DATA_LEFT   = "21B58C53-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()

const CODE_ACC_RIGHT   = "21B58D50-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_GYR_RIGHT   = "21B58D51-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_MAG_RIGHT   = "21B58D52-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()
const CODE_DATA_RIGHT  = "21B58D53-D0E0-4E70-9CEA-45C8FFFF8CD7".toLowerCase()



/*
 * variables for the characteristics. 
 */
let mag_x_charLeft;
let mag_y_charLeft;
let mag_z_charLeft;

let acc_x_charLeft;
let acc_y_charLeft;
let acc_z_charLeft;

let gyr_x_charLeft;
let gyr_y_charLeft;
let gyr_z_charLeft;

let cap_charLeft;

let time_charLeft;

// combined
let acc_charLeft; 
let gyro_charLeft; 
let mag_charLeft; 
let data_charLeft; 


let mag_x_charRight;
let mag_y_charRight;
let mag_z_charRight;

let acc_x_charRight;
let acc_y_charRight;
let acc_z_charRight;

let gyr_x_charRight;
let gyr_y_charRight;
let gyr_z_charRight;

let cap_charRight;

let time_charRight;

// combined
let acc_charRight; 
let gyro_charRight; 
let mag_charRight; 
let data_charRight;

/*
 * variables for the data 
 */
let mag_xLeft;
let mag_yLeft;
let mag_zLeft;

let acc_xLeft;
let acc_yLeft;
let acc_zLeft;

let gyr_xLeft;
let gyr_yLeft;
let gyr_zLeft;

let capLeft;

let timeLeft;

let mag_xRight;
let mag_yRight;
let mag_zRight;

let acc_xRight;
let acc_yRight;
let acc_zRight;

let gyr_xRight;
let gyr_yRight;
let gyr_zRight;

let capRight;

let timeRight;

// variables for the display of the data
let SHOW_ACC = 0;
let SHOW_GYR = 1;
let SHOW_MAG = 2;
let chart = SHOW_MAG;


// text
let textDelay = 1000/5; 
let lastTextms = 0; 

// drawing
let offscreen; 
let xPos = 0;                           // x position of the graph
let chartData = [0, 0, 0, 0,   0, 0, 0, 0];

/*
 * UI elements
 */
let connectLeft;       // Connect button, terminal toggle 
let connectRight;
let downloadBtn;
let startSittingBtn;
let startStandingBtn;
let startWalkingBtn;
let subjectTextView;

// touch markers
let isTouched = false;
let touchCounter = {
  touchInternal: 0,
  touchListener: function(val) {},
  set touch(val) {
    this.touchInternal = val;
    this.touchListener(val);
  },
  get touch() {
    return this.touchInternal;
  },
  registerListener: function(listener) {
    this.touchListener = listener;
  },
  unregisterListner: function() {
    this.touchListener = function() {console.log("No Listener");}
  }
}

// data save
let currentCondition;
let currentTrial=0;
let currentBlock=0;
let currentFinger;
let whichEar;
let dataArray = [];
let sittingTrials = [];
let isRecording = false;


function parse2sComp(num, length = num.length){
  if(num[num.length-length] !== '1') {
    return +('0b'+num)
  }
  let inverse = ''
  for(const digit of num.slice(-length)) {
    if (digit=='0') {inverse += '1';}
    else {inverse += '0';}
  } 
  return -('0b' + inverse) - 1
}


/*
 * Setup - config graphics.  
 */
function setup() 
  {
  createCanvas(500, 500); 
  background(0x08, 0x16, 0x40);
  smooth(8);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  
  // testing two's comp parsing. 
  //let n = 937033728;
  //binString = n.toString(2).padStart(64, "0");
  //console.log(parse2sComp(binString.substring(0,16))); 
  //console.log(parse2sComp(binString.substring(16,32)));  
  //console.log(parse2sComp(binString.substring(32,48)));  
  
  // connect/disconnect/restart
  connectLeft = createButton('Connect Left');
  connectLeft.mousePressed(bleConnectLeft);
  connectRight = createButton('Connect Right');
  connectRight.mousePressed(bleConnectRight);
  downloadBtn = createButton('Download CSV');
  downloadBtn.mousePressed(downloadCSV);
  startSittingBtn = createButton('Start Sitting Block');
  startSittingBtn.mousePressed(function() { startBlock('sitting');});
  startStandingBtn = createButton('Start Standing Block');
  startStandingBtn.mousePressed(function() { startBlock('standing');});
  startWalkingBtn = createButton('Start Walking Block');
  startWalkingBtn.mousePressed(function() { startBlock('walking');});
  subjectTextView = document.createElement('input');
  subjectTextView.name = 'subjectTextView';
  subjectTextView.type = 'text';
  subjectTextView.value = '9999';
  subjectTextView.placeholder = "subject number";

  dataArray = [];
    
  // resize the window and hide ui (as we are disconnected)
  windowResized();
  drawTextIntro();
  
  offscreen = createGraphics(width/5*4,height/5*3); // create offscreen buffer
  offscreen.background(200);
  offscreen.stroke(128); 
  offscreen.noFill(); 
  offscreen.rect(0, 0, offscreen.width, offscreen.height);
  
  }
  
/*
 * should resize on mobile - todo: TEST
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  let bWidth = windowWidth / 4;  
  let gGap   = bWidth / 4; 
  let hGap   = max(30, windowHeight / 20);
  let termY  = 3;
  
  connectLeft.position(gGap, hGap*2);
  connectLeft.size(bWidth);  
  
  connectRight.position(gGap*2 + bWidth, hGap*2);
  connectRight.size(bWidth);
  
  downloadBtn.position(gGap*3 + bWidth*2, hGap*2);
  downloadBtn.size(bWidth);  

  startSittingBtn.position(gGap, hGap*3);
  startSittingBtn.size(bWidth);  
  
  startStandingBtn.position(gGap*2 + bWidth, hGap*3);
  startStandingBtn.size(bWidth);
  
  startWalkingBtn.position(gGap*3 + bWidth*2, hGap*3);
  startWalkingBtn.size(bWidth);

  // startBtn.position(gGap, hGap*3);
  // startBtn.size(bWidth);  

  
  
  subjectTextView.style.position = 'absolute';
  subjectTextView.style.left = gGap*3 + bWidth*2;
  subjectTextView.style.top = hGap;
  subjectTextView.style.width = bWidth;
  document.body.appendChild(subjectTextView);
}




/*
 * Draw - most of the text content in the UI is manually drawn here. This is a bit messy. Use html objects? 
 */
function draw() 
  {     
  let bWidth = windowWidth / 4;  
  let gGap   = bWidth / 4; 
  let hGap   = max(30, windowHeight / 20);  
  let now = millis();  
  
  if (now - lastTextms>textDelay) {
      drawTextIntro();
      if (isConnectedLeft) {
        text("Mag Data (xyz):\t\t"          + Math.round(mag_xLeft) + "\t\t" +
                                              Math.round(mag_yLeft) + "\t\t" + 
                                              Math.round(mag_zLeft) + "\t\t" + 
            "Acc Data (xyz):\t\t"           + Math.round(acc_xLeft) + "\t\t" +
                                              Math.round(acc_yLeft) + "\t\t" + 
                                              Math.round(acc_zLeft) + "\t\t" + 
            "Gyro Data (xyz):\t\t"          + Math.round(gyr_xLeft) + "\t\t" +
                                              Math.round(gyr_yLeft) + "\t\t" + 
                                              Math.round(gyr_zLeft) + "\t\t" + 
            "Cap Data: "                    + Math.round(capLeft)   + "\t\t" +
            "Time: "                        + Math.round(timeLeft),
                                              gGap, hGap*4);
      }
      if (isConnectedRight) {
        text("Mag Data (xyz):\t\t"          + Math.round(mag_xRight) + "\t\t" +
                                              Math.round(mag_yRight) + "\t\t" + 
                                              Math.round(mag_zRight) + "\t\t" + 
            "Acc Data (xyz):\t\t"           + Math.round(acc_xRight) + "\t\t" +
                                              Math.round(acc_yRight) + "\t\t" + 
                                              Math.round(acc_zRight) + "\t\t" + 
            "Gyro Data (xyz):\t\t"          + Math.round(gyr_xRight) + "\t\t" +
                                              Math.round(gyr_yRight) + "\t\t" + 
                                              Math.round(gyr_zRight) + "\t\t" + 
            "Cap Data: "                    + Math.round(capRight)   + "\t\t" +
            "Time: "                        + Math.round(timeRight),
                                              gGap, hGap*5);
      }
      lastTextms = millis(); 
    } 
    
  
  if (isConnectedLeft) {
    whichEar = "left";
    let timeNow = millis();
    if (isRecording) {
      dataArray.push({timestamp:timeNow, blockNum: currentBlock, conditionNum: currentCondition, trialNum: currentTrial, fingerNum: currentFinger, 
                      magX:Math.round(mag_xLeft), magY:Math.round(mag_yLeft), magZ:Math.round(mag_zLeft),
                      accX:Math.round(acc_xLeft), accY:Math.round(acc_yLeft), accZ:Math.round(acc_zLeft),
                      gyrX:Math.round(gyr_xLeft), gyrY:Math.round(gyr_yLeft), gyrZ:Math.round(gyr_zLeft),
                      cap:Math.round(capLeft),
                      time:timeLeft});
    }
    if (Math.round(capLeft) > 100){
      isTouched = true;
    } else {
      if (isTouched) {
        touchCounter.touch = touchCounter.touch + 1;
        console.log("Touched");
      }
      isTouched = false;
    }
    
    if (chart == SHOW_ACC) { 
      graphData(acc_xLeft, 0, 0);
      graphData(acc_yLeft, 1, 0);
      graphData(acc_zLeft, 2, 0);
      }
    else if (chart == SHOW_GYR) { 
      graphData(gyr_xLeft, 0, 1);
      graphData(gyr_yLeft, 1, 1);
      graphData(gyr_zLeft, 2, 1);
      }
    else {//if (chart == SHOW_MAG) { 
      graphData(mag_xLeft, 0, 2);
      graphData(mag_yLeft, 1, 2);
      graphData(mag_zLeft, 2, 2);
      }
    graphData  (capLeft,   3, 3);
    image(offscreen, width/10, height-offscreen.height-50); 
  }
  
  if (isConnectedRight) {
    whichEar = "right";
    let timeNow = millis();
    if (isRecording) {
      dataArray.push({timestamp:timeNow, blockNum: currentBlock, conditionNum: currentCondition, trialNum: currentTrial, fingerNum: currentFinger, 
                    magX:Math.round(mag_xRight), magY:Math.round(mag_yRight), magZ:Math.round(mag_zRight), 
                    accX:Math.round(acc_xRight), accY:Math.round(acc_yRight), accZ:Math.round(acc_zRight), 
                    gyrX:Math.round(gyr_xRight), gyrY:Math.round(gyr_yRight), gyrZ:Math.round(gyr_zRight), 
                    cap:Math.round(capRight),
                    time:timeRight});
    }
    if (Math.round(capRight) > 50){
      isTouched = true;
    } else {
      if (isTouched) {
        touchCounter.touch = touchCounter.touch + 1;
        console.log("Touched");
      }
      isTouched = false;
    }
    if (chart == SHOW_ACC) { 
      graphData(acc_xRight, 0, 0);
      graphData(acc_yRight, 1, 0);
      graphData(acc_zRight, 2, 0);
      }
    else if (chart == SHOW_GYR) { 
      graphData(gyr_xRight, 0, 1);
      graphData(gyr_yRight, 1, 1);
      graphData(gyr_zRight, 2, 1);
      }
    else {//if (chart == SHOW_MAG) { 
      graphData(mag_xRight, 4, 2);
      graphData(mag_yRight, 5, 2);
      graphData(mag_zRight, 6, 2);
    }
      graphData(capRight,   7, 3);
    image(offscreen, width/10, height-offscreen.height-50);
  }
  
  if (isConnectedLeft || isConnectedRight) {
    // at the edge of the screen, go back to the beginning:
    if (xPos >= offscreen.width) {
      xPos = 1;
      // clear the screen by resetting the background: 
      offscreen.background(200); 
      offscreen.stroke(128); 
      offscreen.noFill(); 
      offscreen.rect(0, 0, offscreen.width, offscreen.height);
    } else {
      // increment the horizontal position for the next reading:
      xPos+=2;
    }
        
    textAlign(CENTER, CENTER);
    let s = ". Press [G]yro, [A]ccelometer or [M]agnetometer to change data visualized in chart";  
    if (chart == SHOW_ACC) {text("Acc"+s,       windowWidth/2, windowHeight-20);}
    else if (chart == SHOW_GYR) {text("Gyro"+s, windowWidth/2, windowHeight-20);}
    else if (chart == SHOW_MAG) {text("Mag"+s,  windowWidth/2, windowHeight-20);}
  }
}

function drawTextIntro() {
  let bWidth = windowWidth / 4;  
  let gGap   = bWidth / 4; 
  let hGap   = max(30, windowHeight / 20);  
  
  background(225); 
  fill(0);
  textSize(24); 
  textAlign(CENTER, CENTER);
  text("NanoBuds", width/2, hGap);
  textSize(18); textAlign(LEFT, CENTER);
}






// *******************************************************
// BLE callbacks
// *******************************************************

/*
 * Call back for receiving characteristics details - basically, its "onConnect"
 */
function BLEHandleCharacteristicsLeft(error, characteristics) {
  if (error) {console.log('ERROR: ', error); return;}  // log the problem
  else if (characteristics==null || characteristics.length==0) {console.log('ERROR: no characteristics. Probably user cancelled connect request.'); return;}  // log the problem    
  else {
    console.log('NanoBudsLeft connected.');
    console.log('Characteristics: ', characteristics); // log the list of characterisitcs.
    }  
  
  // update state var
  isConnectedLeft = nanoBudsLeftBLE.isConnected();
  
  // Go through all the characteristics wrt an expected list. Adafruit RX/TX profile just has send/receive.
  for (var i=0;i<characteristics.length;i++)
    {
    console.log("Checking:", characteristics[i].uuid);

    // store transmit characteristic with a convenient local name  
    // combined chars
    if (characteristics[i].uuid == CODE_ACC_LEFT.toLowerCase())   {
      acc_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(acc_charLeft, BLEHandleAccLeft, dataType64);                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_GYR_LEFT.toLowerCase())   {
      gyr_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(gyr_charLeft, BLEHandleGyrLeft, dataType64);                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_MAG_LEFT.toLowerCase())   {
      mag_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(mag_charLeft, BLEHandleMagLeft, dataType64);                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_DATA_LEFT.toLowerCase())   {
      data_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(data_charLeft, BLEHandleDataLeft, dataType64);                   // and a handler for data we receive.  
      }
      
      
    
    if (characteristics[i].uuid == CODE_X_LEFT.toLowerCase())   {
      mag_x_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(mag_x_charLeft, BLEHandleXLeft, dataType);                   // and a handler for data we receive.  
      }     
    else if (characteristics[i].uuid == CODE_Y_LEFT.toLowerCase())   {
      mag_y_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(mag_y_charLeft, BLEHandleYLeft, dataType);                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_Z_LEFT.toLowerCase())   {
      mag_z_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(mag_z_charLeft, BLEHandleZLeft, dataType);                   // and a handler for data we receive.  
      }
    
    else if (characteristics[i].uuid == CODE_XA_LEFT.toLowerCase())   {
      acc_x_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(acc_x_charLeft, BLEHandleXALeft, 'float32');                   // and a handler for data we receive.  
      }     
    else if (characteristics[i].uuid == CODE_YA_LEFT.toLowerCase())   {
      acc_y_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(acc_y_charLeft, BLEHandleYALeft, 'float32');                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_ZA_LEFT.toLowerCase())   {
      acc_z_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(acc_z_charLeft, BLEHandleZALeft, 'float32');                   // and a handler for data we receive.  
      }
      
    else if (characteristics[i].uuid == CODE_XG_LEFT.toLowerCase())   {
      gyr_x_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(gyr_x_charLeft, BLEHandleXGLeft, 'float32');                   // and a handler for data we receive.  
      }     
    else if (characteristics[i].uuid == CODE_YG_LEFT.toLowerCase())   {
      gyr_y_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(gyr_y_charLeft, BLEHandleYGLeft, 'float32');                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_ZG_LEFT.toLowerCase())   {
      gyr_z_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(gyr_z_charLeft, BLEHandleZGLeft, 'float32');                   // and a handler for data we receive.  
      }
      
      
    else if (characteristics[i].uuid == CODE_C_LEFT.toLowerCase())   {
      cap_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(cap_charLeft, BLEHandleCapLeft, 'float32');                   // and a handler for data we receive.  
      } 
      
    else if (characteristics[i].uuid == CODE_TIME_LEFT.toLowerCase())   {
      time_charLeft = characteristics[i];
      nanoBudsLeftBLE.startNotifications(time_charLeft, BLEHandleTimeLeft, 'float32');                   // and a handler for data we receive.  
      } 
    }

  connectLeft.elt.textContent = 'Disconnect Left';
}


/*
 * Call back for receiving characteristics details - basically, its "onConnect"
 */
function BLEHandleCharacteristicsRight(error, characteristics) {
  if (error) {console.log('ERROR: ', error); return;}  // log the problem
  else if (characteristics==null || characteristics.length==0) {console.log('ERROR: no characteristics. Probably user cancelled connect request.'); return;}  // log the problem    
  else {
    console.log('NanoBudsRight connected.');
    console.log('Characteristics: ', characteristics); // log the list of characterisitcs.
    }  
  
  // update state var
  isConnectedRight = nanoBudsRightBLE.isConnected();
  
  // Go through all the characteristics wrt an expected list. Adafruit RX/TX profile just has send/receive.
  for (var i=0;i<characteristics.length;i++)
    {
    console.log("Checking:", characteristics[i].uuid);

    // combined chars
    if (characteristics[i].uuid == CODE_ACC_RIGHT.toLowerCase())   {
      acc_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(acc_charRight, BLEHandleAccRight, dataType64);                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_GYR_RIGHT.toLowerCase())   {
      gyr_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(gyr_charRight, BLEHandleGyrRight, dataType64);                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_MAG_RIGHT.toLowerCase())   {
      mag_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(mag_charRight, BLEHandleMagRight, dataType64);                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_DATA_RIGHT.toLowerCase())   {
      data_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(data_charRight, BLEHandleDataRight, dataType64);                   // and a handler for data we receive.  
      }

    // store transmit characteristic with a convenient local name  
    if (characteristics[i].uuid == CODE_X_RIGHT.toLowerCase())   {
      mag_x_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(mag_x_charRight, BLEHandleXRight, 'float32');                   // and a handler for data we receive.  
      }     
    else if (characteristics[i].uuid == CODE_Y_RIGHT.toLowerCase())   {
      mag_y_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(mag_y_charRight, BLEHandleYRight, 'float32');                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_Z_RIGHT.toLowerCase())   {
      mag_z_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(mag_z_charRight, BLEHandleZRight, 'float32');                   // and a handler for data we receive.  
      }
      
    else if (characteristics[i].uuid == CODE_XA_RIGHT.toLowerCase())   {
      acc_x_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(acc_x_charRight, BLEHandleXARight, 'float32');                   // and a handler for data we receive.  
      }     
    else if (characteristics[i].uuid == CODE_YA_RIGHT.toLowerCase())   {
      acc_y_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(acc_y_charRight, BLEHandleYARight, 'float32');                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_ZA_RIGHT.toLowerCase())   {
      acc_z_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(acc_z_charRight, BLEHandleZARight, 'float32');                   // and a handler for data we receive.  
      }
      
    else if (characteristics[i].uuid == CODE_XG_RIGHT.toLowerCase())   {
      gyr_x_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(gyr_x_charRight, BLEHandleXGRight, 'float32');                   // and a handler for data we receive.  
      }     
    else if (characteristics[i].uuid == CODE_YG_RIGHT.toLowerCase())   {
      gyr_y_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(gyr_y_charRight, BLEHandleYGRight, 'float32');                   // and a handler for data we receive.  
      }
    else if (characteristics[i].uuid == CODE_ZG_RIGHT.toLowerCase())   {
      gyr_z_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(gyr_z_charRight, BLEHandleZGRight, 'float32');                   // and a handler for data we receive.  
      }
      
    else if (characteristics[i].uuid == CODE_C_RIGHT.toLowerCase())   {
      cap_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(cap_charRight, BLEHandleCapRight, 'float32');                   // and a handler for data we receive.  
      }
      
    else if (characteristics[i].uuid == CODE_TIME_RIGHT.toLowerCase())   {
      time_charRight = characteristics[i];
      nanoBudsRightBLE.startNotifications(time_charRight, BLEHandleTimeRight, 'float32');                   // and a handler for data we receive.  
      } 
    }

  connectRight.elt.textContent = 'Disconnect Right';
}



/*
 * Callback for rx characteristic - gets notified when the arduino sends data. 
 */
function BLEHandleXLeft(data)    {mag_xLeft = data;}
function BLEHandleYLeft(data)    {mag_yLeft = data;}
function BLEHandleZLeft(data)    {mag_zLeft = data;}

function BLEHandleXALeft(data)   {acc_xLeft = data;}
function BLEHandleYALeft(data)   {acc_yLeft = data;}
function BLEHandleZALeft(data)   {acc_zLeft = data;}

function BLEHandleXGLeft(data)   {gyr_xLeft = data;}
function BLEHandleYGLeft(data)   {gyr_yLeft = data;}
function BLEHandleZGLeft(data)   {gyr_zLeft = data;}

function BLEHandleCapLeft(data)  {capLeft = data;}

function BLEHandleTimeLeft(data) {timeLeft = data;}


function BLEHandleAccLeft(data) {
  binString = data.toString(2).padStart(64, "0");
  acc_xLeft = parse2sComp(binString.substring(0,16)); 
  acc_yLeft = parse2sComp(binString.substring(16,32));  
  acc_zLeft = parse2sComp(binString.substring(32,48));
  }

function BLEHandleGyrLeft(data) {
  binString = data.toString(2).padStart(64, "0");
  gyr_xLeft = parse2sComp(binString.substring(0,16)); 
  gyr_yLeft = parse2sComp(binString.substring(16,32));  
  gyr_zLeft = parse2sComp(binString.substring(32,48));
  }

function BLEHandleMagLeft(data) {
  binString = data.toString(2).padStart(64, "0");
  mag_xLeft = parse2sComp(binString.substring(0,16)); 
  mag_yLeft = parse2sComp(binString.substring(16,32));  
  mag_zLeft = parse2sComp(binString.substring(32,48));
  }

function BLEHandleDataLeft(data) {
  binString = data.toString(2).padStart(64, "0");
  timeLeft = parse2sComp(binString.substring(0,16)); 
  capLeft  = parse2sComp(binString.substring(16,32));  
  }



/*
 * Callback for rx characteristic - gets notified when the arduino sends data. 
 */
function BLEHandleXRight(data)    {mag_xRight = data;}
function BLEHandleYRight(data)    {mag_yRight = data;}
function BLEHandleZRight(data)    {mag_zRight = data;}

function BLEHandleXARight(data)   {acc_xRight = data;}
function BLEHandleYARight(data)   {acc_yRight = data;}
function BLEHandleZARight(data)   {acc_zRight = data;}

function BLEHandleXGRight(data)   {gyr_xRight = data;}
function BLEHandleYGRight(data)   {gyr_yRight = data;}
function BLEHandleZGRight(data)   {gyr_zRight = data;}

function BLEHandleCapRight(data)  {capRight = data;}

function BLEHandleTimeRight(data) {timeRight = data;}
  

function BLEHandleAccRight(data) {
  binString = data.toString(2).padStart(64, "0");
  acc_xRight = parse2sComp(binString.substring(0,16)); 
  acc_yRight = parse2sComp(binString.substring(16,32));  
  acc_zRight = parse2sComp(binString.substring(32,48));
  }

function BLEHandleGyrRight(data) {
  binString = data.toString(2).padStart(64, "0");
  gyr_xRight = parse2sComp(binString.substring(0,16)); 
  gyr_yRight = parse2sComp(binString.substring(16,32));  
  gyr_zRight = parse2sComp(binString.substring(32,48));
  }

function BLEHandleMagRight(data) {
  binString = data.toString(2).padStart(64, "0");
  mag_xRight = parse2sComp(binString.substring(0,16)); 
  mag_yRight = parse2sComp(binString.substring(16,32));  
  mag_zRight = parse2sComp(binString.substring(32,48));
  }

function BLEHandleDataRight(data) {
  binString = data.toString(2).padStart(64, "0");
  timeRight = parse2sComp(binString.substring(0,16)); 
  capRight  = parse2sComp(binString.substring(16,32));  
  }
  


function graphData(newData, index, range) {
  // map the range of the input to the window height:
  var ypos = newData; 
  if (range == 0) { // acc
    yPos = map(newData, -2000, 2000, 0, offscreen.height);
  }
  else if (range == 1) { // gyro
    yPos = map(newData, -20000, 20000, 0, offscreen.height);
  }
  else if (range == 2) { // mag
    yPos = map(newData, -10000, 10000, 0, offscreen.height);
  }
  else if (range == 3) { // cap
    yPos = map(newData, 0, 500, 0, offscreen.height);
  }
     
  switch (index) {
    case 0 : offscreen.stroke(255, 0, 0); break;
    case 1 : offscreen.stroke(0, 255, 0); break;
    case 2 : offscreen.stroke(0, 0, 255); break;
    case 3 : offscreen.stroke(0, 0, 0  ); break;
    case 4 : offscreen.stroke(128, 0, 0); break;
    case 5 : offscreen.stroke(0, 128, 0); break;
    case 6 : offscreen.stroke(0, 0, 128); break;
    case 7 : offscreen.stroke(128, 128, 128  ); break;
  }
  
  offscreen.strokeWeight(5); 
  offscreen.line(xPos-1, offscreen.height-chartData[index], xPos, offscreen.height - yPos);
  
  chartData[index] = yPos; 
}

function startBlock(conditionName){
  dataArray = [];
  NofFingers = 3;
  NofReps = 20;
  sittingTrials = initTrialBlock(conditionName, NofFingers, NofReps);
  currentCondition = conditionName;
  speak("To Start Block 1, Please Tap Your Earbud");

  touchCounter.registerListener(function(val) {
    beep();
    touchCounter.unregisterListner();
    setTimeout(trialInitStart, 500);
    
  });
}

function trialInitStart(){
  setTimeout(function(){}, 500);
  if (sittingTrials.length == 0){
    speak("Block Finished");
    downloadCSV();
    currentBlock += 1;
  }
  else {
    console.log(currentCondition, currentTrial);

    if (currentCondition == 'standing'){
      if (currentTrial%4==0){
        speak("stand forward, and tap to start");
      } else if (currentTrial%4==1){
        speak("stand to the right, and tap to start");
      } else if (currentTrial%4==2){
        speak("stand backward, and tap to start");
      } else if (currentTrial%4==3){
        speak("stand to the left, and tap to start");
      }
    }
    else {
      speak("Tap to start");
    }
    

    touchCounter.registerListener(function(val) {
      beep();
      touchCounter.unregisterListner();
      setTimeout(trialStart, 500);
    });
  }
}

function trialStart(){
  let trial = sittingTrials.shift();
  currentFinger = trial.fingerNum;
  trial.trialStartTime = millis();

  isRecording=true;
  setTimeout(function(){}, 500);

  if (currentFinger == 0){
    speak("Index");
  } else if (currentFinger == 1){
    speak("Middle");
  } else if (currentFinger == 2){
    speak("Ring");
  }
  touchCounter.registerListener(function(val) {
    beep();
    touchCounter.unregisterListner();
    setTimeout(trialEndStart, 500);
  });
}

function trialEndStart(){
  setTimeout(trialInitStart, 500);
  isRecording = false;
  currentTrial += 1;
}



function beep(){
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 800;
  oscillator.connect(context.destination);
  oscillator.start(); 
  // Beep for 500 milliseconds
  setTimeout(function () {
      oscillator.stop();
  }, 100);
}

function downloadCSV(){
  var tempData = "timestamp, subject, ear, block, condition, trial, finger, magX, magY, magZ, accX, accY, accZ, gyrX, gyrY, gyrZ, capacitance, time \r\n";
  let subjectID = document.getElementsByName('subjectTextView')[0].value;
  console.log(dataArray.length);

  for(var i=0; i<dataArray.length; i++){
    tempData += dataArray[i].timestamp + "," + subjectID + "," + whichEar + "," + dataArray[i].blockNum + "," + dataArray[i].conditionNum + "," + 
                dataArray[i].trialNum + "," + dataArray[i].fingerNum + "," + 
                dataArray[i].magX + "," + dataArray[i].magY + "," + dataArray[i].magZ + "," +
                dataArray[i].accX + "," + dataArray[i].accY + "," + dataArray[i].accZ + "," +
                dataArray[i].gyrX + "," + dataArray[i].gyrY + "," + dataArray[i].gyrZ + "," +
                dataArray[i].cap + "," +
                dataArray[i].time + "\r\n";
  }

  var downloadLink = document.createElement("a");
  var blob = new Blob([tempData], { type: "text/csv;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = subjectID + "_" + dataArray[0].blockNum + "_" + dataArray[0].conditionNum + ".csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function speak(text) {
  if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
    alert("No speak service in this browser")
    console.log("No speak service in this browser")
    return;
  }

  window.speechSynthesis.cancel() // if in speaking, init.

  const speechMsg = new SpeechSynthesisUtterance()
  speechMsg.rate = 0.9     
  speechMsg.pitch = 1 
  speechMsg.lang = "en-US"
  speechMsg.text = text

  // SpeechSynthesisUtterance
  window.speechSynthesis.speak(speechMsg);
}




function trialFactory(condition, fingerNum) {
  return {
    condition,
    fingerNum,
    trialStartTime:0,
    trialEndTime:0,
    isCorrect:false,
    startTrial(currentTime){
      this.trialStartTime = currentTime;
    },
    endTrial(currentTime){
      this.trialEndTime = currentTime;
    }
  }
}

function initTrialBlock(condition, fingerNum, reps){
  var trials = [];

  for (let r=0;r<reps;r++){
    for (let f=0;f<fingerNum;f++){
      trials.push(trialFactory(condition, f));   
    }         
  }

  trials.sort(()=>Math.random() - 0.5);
  return trials;
}



// function for the display of the data
function keyPressed() {
  if (key=='a' || key=='A') { 
    chart = SHOW_ACC;
  }
  else if (key=='g' || key=='G') { 
    chart = SHOW_GYR;
  }
  else if (key=='m' || key=='M') { 
    chart = SHOW_MAG;
  }
}

const btnManager = require("./btnManager");
const wsController = require("./wsController");
//// !! initial  for use wsController
// let ledController = new wsController();
//let ledController = wsController;
// ledController.init();
//// !! initial  for use btnManager
btnManager.init();
//// udp
const dgram = require("dgram");
var serverPORT = 9090; //// pi's port 9090
var serverHOST = "192.168.168.45"; //// pi's ip 10.1.8.241 //// local ip is 192.168.168.45
var clientPORT = 3040; //// watchout production's port is 3040
var clientHOST = "10.1.8.239"; //watchout's ip 10.1.8.239 ////

let currentTime = 0; //// set default current time

let scene_btnMode; //// for change btn count mode


const delay = (interval) => {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
};

/*                              */
/** scene timer counting by secs */
/*                              */

let scene2 = {
  1: {
    action: async () => {
      console.log("S2Q21");
      //// call btn - no action
      //// call btn color - 4 colors in 4 areas, 1 color for 6 btns.
      btnManager.s2_default();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  6: {
    action: async () => {
      console.log("S2Q22");
      //// call btn - s2 mode
      //// call btn color - 
      scene_btnMode = "s2";
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q22.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q22.
    },
  },
  36:{
    action: async () => {
      console.log("S2Q23");
      //// call btn - leave s2 mode
      scene_btnMode = "s2_end";
      //// call btn color - 1 color in 4 areas.
      btnManager.s2_ending();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  56:{
    action: async () => {
      console.log("S2 finished");
      //// set all led to black.
      btnManager.scene_reset();
      //// go to next scene (s3)
    },  
  },
};

let scene3 = {
  1: {
    action: async () => {
      console.log("S3Q31");
      //// call btn - no action
      //// call btn color - 4 colors in 4 areas, 1 color for 6 btns.
      btnManager.s3_default();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  11: {
    action: async () => {
      console.log("S3Q32");
      //// call btn - s2 mode
      //// call btn color - 
      scene_btnMode = "s3";
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q22.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q22.
    },
  },
  41:{
    action: async () => {
      console.log("S2Q33");
      //// call btn - leave s3 mode
      scene_btnMode = "s3_end";
      //// call btn color - 1 color in 4 areas.
      btnManager.s3_ending_q33();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  51:{
    action: async () => {
      console.log("S2Q34");
      //// call btn - leave s2 mode
   
      //// call btn color - 1 color in 4 areas.
      btnManager.s3_ending_q34();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  61:{
    action: async () => {
      console.log("S2Q35");
      //// call btn - leave s2 mode
   
      //// call btn color - 1 color in 4 areas.
      btnManager.s3_ending_q35();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  66:{
    action: async () => {
      console.log("S3 finished");
      //// set all led to black.
      btnManager.scene_reset();
      //// go to next scene (s3)
    },  
  },
};


/*                                   */
/** scene timer mode (main timeline) */
/*                                   */

async function callMode(scene, t) {
  switch (scene) {
    case "S2":
      if (!scene2[t]) {
        return;
      }
      scene2[t].action();
      break;
    case "S3":
      if (!scene3[t]) {
        return;
      }
      scene3[t].action();
      break;
    case "S5":
      break;
  }
}
//// udp trigger timer(1, "S5", 60), timer(1, "S2", 56), timer(1, "S3", 66)
async function timer(state, scene, totalTime) {
  while (state) {
    await delay(1000);
    currentTime++;
    callMode(scene, currentTime);
    if (currentTime > totalTime) {
      state = 0;
      console.log(`time up , total:${totalTime}`);
    }
  }
}

/*                    */
/** scene button mode */
/*                    */

////4. button event cue (scene based)
let s2a1_counter = {
  1: {
    action: async () => {
      console.log("s2 area1 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s2 area1 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s2 area1 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s2 area1 4 times");
    },
  },
  5: {
    action: async () => {
      console.log("s2 area1 5 times");
    },
  },
  6: {
    action: async () => {
      console.log("s2 area1 6 times");
    },
  },
  7: {
    action: async () => {
      console.log("s2 area1 7 times");
      //sendWatchout("run b4-1")
    },
  },
  8: {
    action: async () => {
      console.log("s2 area1 8 times");
    },
  },
  9: {
    action: async () => {
      console.log("s2 area1 9 times");
    },
  },
  10: {
    action: async () => {
      console.log("s2 area1 10 times");
    },
  },
  11: {
    action: async () => {
      console.log("s2 area1 11 times");
    },
  },
  12: {
    action: async () => {
      console.log("s2 area1 12 times");
    },
  },
  
};
let s2a2_counter = {
  1: {
    action: async () => {
      console.log("s2 area2 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s2 area2 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s2 area2 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s2 area2 4 times");
    },
  },
  5: {
    action: async () => {
      console.log("s2 area2 5 times");
    },
  },
  6: {
    action: async () => {
      console.log("s2 area2 6 times");
    },
  },
  7: {
    action: async () => {
      console.log("s2 area2 7 times");
      //sendWatchout("run b4-1")
    },
  },
  8: {
    action: async () => {
      console.log("s2 area2 8 times");
    },
  },
  9: {
    action: async () => {
      console.log("s2 area2 9 times");
    },
  },
  10: {
    action: async () => {
      console.log("s2 area2 10 times");
    },
  },
  11: {
    action: async () => {
      console.log("s2 area2 11 times");
    },
  },
  12: {
    action: async () => {
      console.log("s2 area2 12 times");
    },
  },
  
};
let s2a3_counter = {
  1: {
    action: async () => {
      console.log("s2 area3 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s2 area3 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s2 area3 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s2 area3 4 times");
    },
  },
  5: {
    action: async () => {
      console.log("s2 area3 5 times");
    },
  },
  6: {
    action: async () => {
      console.log("s2 area3 6 times");
    },
  },
  7: {
    action: async () => {
      console.log("s2 area3 7 times");
      //sendWatchout("run b4-1")
    },
  },
  8: {
    action: async () => {
      console.log("s2 area3 8 times");
    },
  },
  9: {
    action: async () => {
      console.log("s2 area3 9 times");
    },
  },
  10: {
    action: async () => {
      console.log("s2 area3 10 times");
    },
  },
  11: {
    action: async () => {
      console.log("s2 area3 11 times");
    },
  },
  12: {
    action: async () => {
      console.log("s2 area3 12 times");
    },
  },
  
};
let s2a4_counter = {
  1: {
    action: async () => {
      console.log("s2 area4 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s2 area4 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s2 area4 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s2 area4 4 times");
    },
  },
  5: {
    action: async () => {
      console.log("s2 area4 5 times");
    },
  },
  6: {
    action: async () => {
      console.log("s2 area4 6 times");
    },
  },
  7: {
    action: async () => {
      console.log("s2 area4 7 times");
      //sendWatchout("run b4-1")
    },
  },
  8: {
    action: async () => {
      console.log("s2 area4 8 times");
    },
  },
  9: {
    action: async () => {
      console.log("s2 area4 9 times");
    },
  },
  10: {
    action: async () => {
      console.log("s2 area4 10 times");
    },
  },
  11: {
    action: async () => {
      console.log("s2 area4 11 times");
    },
  },
  12: {
    action: async () => {
      console.log("s2 area4 12 times");
    },
  },
  
};

let s3a1_counter = {
  1: {
    action: async () => {
      console.log("s3 area1 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s3 area1 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s3 area1 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s3 area1 4 times");
    },
  },
  5: {
    action: async () => {
      console.log("s3 area1 5 times");
    },
  },
  6: {
    action: async () => {
      console.log("s3 area1 6 times");
    },
  },
  7: {
    action: async () => {
      console.log("s3 area1 7 times");
      //sendWatchout("run b4-1")
    },
  },
  8: {
    action: async () => {
      console.log("s3 area1 8 times");
    },
  },
  9: {
    action: async () => {
      console.log("s3 area1 9 times");
    },
  },
  10: {
    action: async () => {
      console.log("s3 area1 10 times");
    },
  },
  11: {
    action: async () => {
      console.log("s3 area1 11 times");
    },
  },
  12: {
    action: async () => {
      console.log("s3 area1 12 times");
    },
  },
  
};
let s3a2_counter = {
  1: {
    action: async () => {
      console.log("s3 area2 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s3 area2 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s3 area2 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s3 area2 4 times");
    },
  },
  5: {
    action: async () => {
      console.log("s3 area2 5 times");
    },
  },
  6: {
    action: async () => {
      console.log("s3 area2 6 times");
    },
  },
  7: {
    action: async () => {
      console.log("s3 area2 7 times");
      //sendWatchout("run b4-1")
    },
  },
  8: {
    action: async () => {
      console.log("s3 area2 8 times");
    },
  },
  9: {
    action: async () => {
      console.log("s3 area2 9 times");
    },
  },
  10: {
    action: async () => {
      console.log("s3 area2 10 times");
    },
  },
  11: {
    action: async () => {
      console.log("s3 area2 11 times");
    },
  },
  12: {
    action: async () => {
      console.log("s3 area2 12 times");
    },
  },
  
};
let s3a3_counter = {
  1: {
    action: async () => {
      console.log("s3 area3 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s3 area3 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s3 area3 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s3 area3 4 times");
    },
  },
  5: {
    action: async () => {
      console.log("s3 area3 5 times");
    },
  },
  6: {
    action: async () => {
      console.log("s3 area3 6 times");
    },
  },
  7: {
    action: async () => {
      console.log("s3 area3 7 times");
      //sendWatchout("run b4-1")
    },
  },
  8: {
    action: async () => {
      console.log("s3 area3 8 times");
    },
  },
  9: {
    action: async () => {
      console.log("s3 area3 9 times");
    },
  },
  10: {
    action: async () => {
      console.log("s3 area3 10 times");
    },
  },
  11: {
    action: async () => {
      console.log("s3 area3 11 times");
    },
  },
  12: {
    action: async () => {
      console.log("s3 area3 12 times");
    },
  },
  
};
let s3a4_counter = {
  1: {
    action: async () => {
      console.log("s3 area4 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s3 area4 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s3 area4 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s3 area4 4 times");
    },
  },
  5: {
    action: async () => {
      console.log("s3 area4 5 times");
    },
  },
  6: {
    action: async () => {
      console.log("s3 area4 6 times");
    },
  },
  7: {
    action: async () => {
      console.log("s3 area4 7 times");
      //sendWatchout("run b4-1")
    },
  },
  8: {
    action: async () => {
      console.log("s3 area4 8 times");
    },
  },
  9: {
    action: async () => {
      console.log("s3 area4 9 times");
    },
  },
  10: {
    action: async () => {
      console.log("s3 area4 10 times");
    },
  },
  11: {
    action: async () => {
      console.log("s3 area4 11 times");
    },
  },
  12: {
    action: async () => {
      console.log("s3 area4 12 times");
    },
  },
  
};

//// 3. using return value to call button event cue (scene based)
async function s2_btn_cue(counter){
  let area = counter[0];
  let area_counter = counter[1];
  //console.log(`s2_btn_cue - area: ${area}, area_counter: ${area_counter}`);
  if (area == 1) {
    if (!s2a1_counter[area_counter]) {
      return;
    }
    s2a1_counter[area_counter].action();
  }

  if (area == 2) {
    if (!s2a2_counter[area_counter]) {
      return;
    }
    s2a2_counter[area_counter].action();
  }

  if (area == 3) {
    if (!s2a3_counter[area_counter]) {
      return;
    }
    s2a3_counter[area_counter].action();
  }

  if (area == 4) {
    if (!s2a4_counter[area_counter]) {
      return;
    }
    s2a4_counter[area_counter].action();
  }
}

async function s3_btn_cue(counter){
  let area = counter[0];
  let area_counter = counter[1];
  //console.log(`s2_btn_cue - area: ${area}, area_counter: ${area_counter}`);
  if (area == 1) {
    if (!s3a1_counter[area_counter]) {
      return;
    }
    s3a1_counter[area_counter].action();
  }

  if (area == 2) {
    if (!s3a2_counter[area_counter]) {
      return;
    }
    s3a2_counter[area_counter].action();
  }

  if (area == 3) {
    if (!s3a3_counter[area_counter]) {
      return;
    }
    s3a3_counter[area_counter].action();
  }

  if (area == 4) {
    if (!s3a4_counter[area_counter]) {
      return;
    }
    s3a4_counter[area_counter].action();
  }
}

//// 2.pass btn value (x,y)to "btnManager" to do computation and return value.
function btnMode(x, y) {
  switch(scene_btnMode){
    case "s2" :
      let counter = btnManager.s2_count_mode(x,y);
      //console.log(`process - counter: ${counter}`);
      s2_btn_cue(counter)
      break;
    case "s2_end" :
      break; 
    case "s3" :
      let counter_s3 = btnManager.s3_count_mode(x,y);
      //console.log(`process - counter_s3: ${counter_s3}`);
      s3_btn_cue(counter_s3)
      break;
    case "s3_end" :
      break; 
    case "s5" :
      break;         
  }
}
//// 1.get btn value from app.js to function btnMode
process.on("message", function (args) {
  // console.log(args);
  let x = args["x"];
  let y = args["y"];
  //console.log(`test.js get btn ${x} and ${y}`);
  btnMode(x, y);
});



/*             */
/** udp server */
/*             */

var server = dgram.createSocket("udp4");
server.on("listening", function () {
  var address = server.address();
  console.log(
    "UDP Server listening on " + address.address + ":" + address.port
  );
});
server.on("message", function (message, remote) {
  console.log(remote.address + ":" + remote.port + " - " + message);
  //// udp receive from watchout says "S5", then trigger timer
  if (message == "S5") {
    timer(1, "S5", 60); //// 3rd value is scene totalTime
  }else if(message == "S2"){
    timer(1, "S2", 56); //// 3rd value is scene totalTime
  }else if(message == "S3"){
    timer(1, "S3", 66); //// 3rd value is scene totalTime
  }
});
server.bind(serverPORT, serverHOST);

/*             */
/** udp client */
/*             */
// msg = run C1
//let msg = "run end1"
//sendWatchout("run b1-3") //gotoControlCue b1-5
async function sendWatchout(msg) {
  var message = msg;
  var client = dgram.createSocket("udp4");
  client.send(message, clientPORT, clientHOST, function (err, bytes) {
    if (err) throw err;
    console.log("UDP message sent to " + clientHOST + ":" + clientPORT);
    client.close();
  });
}



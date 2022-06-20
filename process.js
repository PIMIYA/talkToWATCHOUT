const btnManager = require("./btnManager");
const wsController = require("./wsController");
//// !! initial  for use wsController
let ledController = new wsController();
//let ledController = wsController;
ledController.init();
//// !! initial  for use btnManager
btnManager.init();
//// udp
const dgram = require("dgram");
var serverPORT = 9090; //// pi's port 9090
var serverHOST = "192.168.168.45"; //// pi's ip 10.1.8.241 //// local ip is 192.168.168.45
var clientPORT = 3040; //// watchout production's port is 3040
var clientHOST = "10.1.8.239"; //watchout's ip 10.1.8.239 ////

let currentTime = 0; //// set default current time
let scene5_count_mode = 0; //// if 0 then btn do nothing
let scene_5_btn_count = "compete"; //// if "compete" then go to trigger watchout's video (indicator)
let area_win = 0; //// area to win

let scene2_count_mode = 0;


const delay = (interval) => {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
};

/*                              */
/** main timer counting by secs */
/*                              */

// timer counting secs then do something
let scene5 = {
  1: {
    action: async () => {
      console.log("Q51");
      //// call btn - no action
      scene5_count_mode = 0;
      //// call btn color - 4 color in 4 areas, 1 color for 6 btn.
      ledController.brightness("0xff0000", "0x00ff00", "0x0000ff", "0xffffff");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - Q51.
      sendWatchout("run s5");
      //// call watchout audio cue - Q51.
    },
  },

  6: {
    action: async () => {
      console.log("Q51_5");
      //// call btn - count btn in each areas, pressed 10 times and return, pressed 100 times and return
      scene5_count_mode = 1;
      //// call btn color - 4 color in 4 areas, 1 color for 6 btn.
      
      //// call audio - play 1 audio file, when btn in 1 of 4 area, pressed 100 times.

      //// call led stripe - ??

      //// call watchout video cue - play 1 of 4 cues, Q52-A, Q52-B, Q52-C, Q52-D.

      //// call watchout audio cue - none.
    },
  },

  31: {
    action: async () => {
      console.log("Q52");
      //// call btn - no action
      scene5_count_mode = 0;
      //// call btn color - 1 color in all areas, 1 color for 24 btn.
      //// call watchout video cue - play 1 of 4 cues, Q52-A, Q52-B, Q52-C, Q52-D.
      ledController.reset();
      w = area_win;
      console.log(`area win: ${w}`);
      switch (w) {
        case 0: //// if no one win, then play this.
          sendWatchout("run end2");
          break;
        case 1: //// area1 (red) win
          // ledController.reset();
          ledController.init(); //// !! remember to call b4 ledController'f function
          ledController.brightness("0xff0000", "0xff0000", "0xff0000", "0xff0000");
          console.log(" area 1 win");
          sendWatchout("run end1");
          break;
        case 2: //// area2 (green) win
          // ledController.reset();
          ledController.init(); //// !! remember to call b4 ledController'f function
          ledController.brightness("0x00ff00", "0x00ff00", "0x00ff00", "0x00ff00");
          console.log(" area 2 win");
          sendWatchout("run end2");
          break;
        case 3: //// area3 (blue) win
          ledController.init(); //// !! remember to call b4 ledController'f function
          ledController.brightness("0x0000ff", "0x0000ff", "0x0000ff", "0x0000ff");
          console.log(" area 3 win");
          sendWatchout("run end3");
          break;
        case 4: //// area4 (white) win
          ledController.init(); //// !! remember to call b4 ledController'f function
          ledController.brightness("0xffffff", "0xffffff", "0xffffff", "0xffffff");
          console.log(" area 4 win");
          sendWatchout("run end4");
          break;
      }
      //// call audio - play 1 of 4 audio files.

      //// call led stripe - ??

      //// call watchout audio cue - none.
    },
  },

  51: {
    action: async () => {
      console.log("Q53");
      //// call btn - no action.
      scene5_count_mode = 0;
      //// call btn color - 1 color(white) in all areas, and flash.
      //ledController.init();
      ledController.reset();
      //// call audio - play 1 audio file(號角喇叭聲).
      //// call led stripe - ??
      //// call watchout video cue - Q53.
      //// call watchout audio cue - Q53.
    },
  },

  60: {
    action: async () => {
      //// kill all
      scene5_count_mode = 0;
    },
  },
};

let scene2 = {
  1: {
    action: async () => {
      console.log("S2Q20");
      //// call btn - no action
      scene2_count_mode = 1;
      //// call btn color - 4 color in 4 areas, 1 color for 6 btn.
      ledController.brightness("0xff0000", "0xfcdb03", "0xffffff", "0x035afc");
      //ledController.brightnessOne("0xff0000");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - Q51.
      //sendWatchout("run s5");
      //// call watchout audio cue - Q51.
    },
  },
  5: {
    action: async () => {
      console.log("S2Q20-5");
      //// call btn - no action
      //scene2_count_mode = 1;
      //// call btn color - 4 color in 4 areas, 1 color for 6 btn.
      //ledController.brightnessOne(5, "0x0000ff");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - Q51.
      //sendWatchout("run s5");
      //// call watchout audio cue - Q51.
    },
  },
  51:{
    action: async () => {
      console.log("S2Q21");
      //// call btn - no action
      //scene5_count_mode = 0;
      //// call btn color - 4 color in 4 areas, 1 color for 6 btn.
      ledController.reset();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - Q51.
      //sendWatchout("run s5");
      //// call watchout audio cue - Q51.
    },  
  },
};

// scene timer counting
async function callMode(scene, t) {
  switch (scene) {
    case "S5":
      if (!scene5[t]) {
        return;
      }
      scene5[t].action();
      break;
    case "S1":
      break;
    case "S2":
      if (!scene2[t]) {
        return;
      }
      scene2[t].action();
      break;
  }
}

//// udp trigger timer(1, "S5", 60), timer(1, "S2", 75)
async function timer(state, scene, totalTime) {
  while (state) {
    await delay(1000);
    currentTime++;
    callMode(scene, currentTime);
    //console.log(currentTime);
    if (currentTime > totalTime) {
      state = 0;
      console.log(`time up , total:${totalTime}`);
    }
  }
}

/*                                  */
/** scene_5 btn counting by pressed */
/*                                  */

//// count amount of btn pressed then do something
let area1_countAmount = {
  10: {
    action: async () => {
      console.log("area1 10 times");
      sendWatchout("run b1-1")
    },
  },
  20: {
    action: async () => {
      console.log("area1 20 times");
      sendWatchout("run b1-2")
    },
  },
  30: {
    action: async () => {
      console.log("area1 30 times");
      sendWatchout("run b1-3")
    },
  },
  40: {
    action: async () => {
      console.log("area1 40 times");
      sendWatchout("run b1-4")
    },
  },
  50: {
    action: async () => {
      console.log("area1 50 times");
      sendWatchout("run b1-5")
    },
  },
};
let area2_countAmount = {
  10: {
    action: async () => {
      console.log("area2 10 times");
      sendWatchout("run b2-1")
    },
  },
  20: {
    action: async () => {
      console.log("area2 20 times");
      sendWatchout("run b2-2")
    },
  },
  30: {
    action: async () => {
      console.log("area2 30 times");
      sendWatchout("run b2-3")
    },
  },
  40: {
    action: async () => {
      console.log("area2 40 times");
      sendWatchout("run b2-4")
    },
  },
  50: {
    action: async () => {
      console.log("area2 50 times");
      sendWatchout("run b2-5")
    },
  },
  
};
let area3_countAmount = {
  10: {
    action: async () => {
      console.log("area3 10 times");
      sendWatchout("run b3-1")
    },
  },
  20: {
    action: async () => {
      console.log("area3 20 times");
      sendWatchout("run b3-2")
    },
  },
  30: {
    action: async () => {
      console.log("area3 30 times");
      sendWatchout("run b3-3")
    },
  },
  40: {
    action: async () => {
      console.log("area3 40 times");
      sendWatchout("run b3-4")
    },
  },
  50: {
    action: async () => {
      console.log("area3 50 times");
      sendWatchout("run b3-5")
    },
  },
  
};
let area4_countAmount = {
  10: {
    action: async () => {
      console.log("area4 10 times");
      sendWatchout("run b4-1")
    },
  },
  20: {
    action: async () => {
      console.log("area4 20 times");
      sendWatchout("run b4-2")
    },
  },
  30: {
    action: async () => {
      console.log("area4 30 times");
      sendWatchout("run b4-3")
    },
  },
  40: {
    action: async () => {
      console.log("area4 40 times");
      sendWatchout("run b4-4")
    },
  },
  50: {
    action: async () => {
      console.log("area4 50 times");
      sendWatchout("run b4-5")
    },
  },
  
};

//// s5 pressed count operation
async function call_btn_counter(area, count) {
  //// count number for win
  if (count > 30) {
    scene_5_btn_count = "win";
    area_win = area;
  }
  switch (scene_5_btn_count) {
    case "compete":
      if (area == 1) {
        if (!area1_countAmount[count]) {
          return;
        }
        area1_countAmount[count].action();
      }

      if (area == 2) {
        if (!area2_countAmount[count]) {
          return;
        }
        area2_countAmount[count].action();
      }

      if (area == 3) {
        if (!area3_countAmount[count]) {
          return;
        }
        area3_countAmount[count].action();
      }

      if (area == 4) {
        if (!area4_countAmount[count]) {
          return;
        }
        area4_countAmount[count].action();
      }

      break;
    case "win":
      console.log("win");
      break;
  }
}

//// s2 pressed count operation
async function call_btn_press(area, pos) {
  //// change led when btn pressed
  //console.log(`call_btn_press, area: ${area}, pos: ${pos}`);
  // if (pos == ){

  // }
  ledController.brightnessOne(pos, "0x000000");
  
}

//// 2.pass btn value to "btnManager", and from "btnManager" to "call_btn_counter"
function btnMode(x, y) {
  if (scene5_count_mode == 1) {
    let amount = btnManager.btn_count(x, y);
    console.log(`area: ${x}, amount: ${amount}`);
    call_btn_counter(x, amount);
  } else if (scene2_count_mode == 1){
    let pos = btnManager.btn_pressed(x, y);
    //let pos_y = btnManager.btn_test(y);
    //console.log(`area: ${x}, pos: ${pos}`);
    call_btn_press(x, pos);
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
    timer(1, "S2", 75); //// 3rd value is scene totalTime
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

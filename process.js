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
var serverHOST = "192.168.168.56"; //// pi's ip 10.1.8.241 //// local ip is 192.168.168.45
var clientPORT = 3040; //// watchout production's port is 3040
var clientHOST = "10.1.8.239"; //watchout's ip 10.1.8.239 ////

let currentTime = 0; //// set default current time

let scene_btnMode; //// for change btn count mode

//// vvvv for s5
let scene_5_btn_count = "compete"; //// if "compete" then go to trigger watchout's video (indicator)
let area_win = 0; //// area to win

//test sound
const sound = require("./sound");


const delay = (interval) => {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
};

/*                              */
/** scene timer counting by secs */
/*                              */

let scene0 = {
  1: {
    action: async () => {
      console.log("S0Q1");
      //// call btn - no action
      //btnManager.scene_reset();
      //// call btn color - big and small flash
      btnManager.s0_flash(32000);
      //await delay(3000);
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  11: {
    action: async () => {
      console.log("S0Q2");
      //// call btn - no action
      //btnManager.s0_bigFlash(false);
      scene_btnMode = "s0";
      //// call btn color - set all black and count = 0.
      //btnManager.scene_reset();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  31: {
    action: async () => {
      console.log("S0Q3");
      //// call btn - no action
      //// call btn color - set all black and count = 0.
      btnManager.s0_force_FlashOff();
      //btnManager.scene_reset();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  41:{
    action: async () => {
      console.log("S0 finished");
      scene_btnMode = "nothing";
      btnManager.scene_reset();
      //// go to next scene (s2)
    },  
  },
};

let scene1 = {
  1: {
    action: async () => {
      console.log("S1Q11");
      //// call btn - no action
      //// call btn color - set all black and count = 0.
      btnManager.scene_reset();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  21:{
    action: async () => {
      console.log("S1 finished");
      //// go to next scene (s2)
    },  
  },
};

let scene2 = {
  1: {
    action: async () => {
      console.log("S2Q21");
      //// call btn - no action
      //// call btn color - 4 colors in 4 areas, 1 color for 6 btns.
      //btnManager.sceneInit();
      btnManager.scene_default("s2");
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
      //// call btn - enter s2 btn mode
      scene_btnMode = "s2";
      //// call btn color - same as last cue.
      // btnManager.scene_ending("s2");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q22.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q22.
    },
  },
  11: {
    action: async () => {
      console.log("test");
      //// call btn - enter s2 btn mode
      //scene_btnMode = "s2";
      //// call btn color - same as last cue.
      // btnManager.stop_breathing();
      // btnManager.scene_default("s2");
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
      //// call btn - leave s2 btn mode
      scene_btnMode = "nothing";
      //// call btn color - 1 color in 4 areas. (blue + breath)
      //btnManager.sceneInit();
      btnManager.scene_ending("s2");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  55:{
    action: async () => {
      //console.log("S2 reset cue");
      //// set all breath led to black and reset led.
      //btnManager.sceneInit();
      //btnManager.scene_default("s2");
      //// go to next scene (s3)
    },  
  },
  56:{
    action: async () => {
      console.log("S2 finished");
      //// set all breath led to black and reset led.
      //btnManager.scene_reset_for_ledBreath();
      //// go to next scene (s3)
    },  
  },
};

let scene3 = {
  1: {
    action: async () => {
      console.log("S3Q31");
      btnManager.scene_reset();
      //// call btn - no action
      //// call btn color - 4 colors in 4 areas, 1 color for 6 btns.
      //btnManager.sceneInit();
      btnManager.scene_default("s3");
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
      //// call btn - enter s3 btn mode
      scene_btnMode = "s3";
      //// call btn color - same as last cue.

      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q22.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q22.
    },
  },
  41:{
    action: async () => {
      console.log("S3Q33");
      //// call btn - leave s3 mode
      scene_btnMode = "nothing";
      //// call btn color - 1 color in 4 areas. (var color breath)
      //btnManager.sceneInit();
      btnManager.scene_ending("s3q33");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  51:{
    action: async () => {
      console.log("S3Q34");
      //// call btn - leave s2 mode
   
      //// call btn color - 1 color in 4 areas. (60% white no breath)
      //btnManager.sceneInit();
      btnManager.scene_ending("s3q34");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  61:{
    action: async () => {
      console.log("S3Q35");
      //// call btn - leave s2 mode
   
      //// call btn color - 1 color in 4 areas.  (100% white no breath)
      //btnManager.sceneInit();
      btnManager.scene_ending("s3q35");
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

let scene4 = {
  1: {
    action: async () => {
      console.log("S4Q41");
      //// call btn - no action
      //// call btn color - 1 colors in 4 areas. (black)
      //btnManager.scene_reset();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  6: {
    action: async () => {
      console.log("S4Q42");
      //// call btn color - 
      btnManager.s4_rand_call_btn(0);
      //// call btn - s4 mode
      scene_btnMode = "s4";
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q22.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q22.
    },
  },
  36:{
    action: async () => {
      console.log("S4Q43");
      //// call btn - leave s4 mode
      scene_btnMode = "nothing";
      //// call btn color - 1 color in 4 areas. (black)
      btnManager.scene_reset();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  41:{
    action: async () => {
      console.log("S4 finished");
      //// set all led to black.
      //btnManager.scene_reset();
      //// go to next scene (s3)
    },  
  },
};

let scene5 = {
  1: {
    action: async () => {
      console.log("S5Q51");
      //// call btn - no action
      //// call btn color - 4 colors in 4 areas, 1 color for 6 btns.
      btnManager.scene_default("s5");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  6: {
    action: async () => {
      console.log("S5Q51.5");
      //// call btn - s5 mode, start counting.
      scene_btnMode = "s5";
      //// call audio - none

      //// call led stripe - ??
    },
  },
  31:{
    action: async () => {
      console.log("S5Q52");
      
      //// call btn color - 1 color in 4 areas. (win color, win video)
      w = area_win;
      console.log(`area win: ${w}`);
      switch (w) {
        case 0: //// if no one win, then play this.
           //sendWatchout("run end2");
           break;
         case 1: //// area1 (red) win
           console.log(" s5 area 1 win");
           btnManager.scene_ending("s5a1");
           //sendWatchout("run end1");
           break;
         case 2: //// area2 (green) win
           console.log(" s5 area 2 win");
           btnManager.scene_ending("s5a2");
           //sendWatchout("run end2");
           break;
         case 3: //// area3 (blue) win
           console.log(" s5 area 3 win");
           btnManager.scene_ending("s5a3");
           //sendWatchout("run end3");
           break;
         case 4: //// area4 (white) win
           console.log(" s5 area 4 win");
           btnManager.scene_ending("s5a4");
           //sendWatchout("run end4");
           break;
      }
      //// call btn - leave s5 mode,.
      scene_btnMode = "nothing";
      //// call audio - none

      //// call led stripe - ??
    },  
  },
  51:{
    action: async () => {
      console.log("S5Q53");
      //// call btn - 
      //// call btn color - 1 color in 4 areas.
      btnManager.scene_ending("s5");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S5Q53.
      //sendWatchout("run s5");
      //// call watchout audio cue - S5Q53.
    },  
  },
  61:{
    action: async () => {
      console.log("S5 finished");
      //// set all led to black.
      btnManager.scene_reset();
      //// go to next scene (s3)
    },  
  },
};

let scene6 = {
  1: {
    action: async () => {
      console.log("S6Q61");
      //// call btn - no action
      //// call btn color - 1 colors in 4 areas. (black)
      //btnManager.scene_reset();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  6: {
    action: async () => {
      console.log("S6Q62");
      //// call btn color - 
      btnManager.s6_rand_call_btn(0);
      //// call btn - s6 mode
      scene_btnMode = "s6";
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q22.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q22.
    },
  },
  46:{
    action: async () => {
      console.log("S6Q63");
      //// call btn - leave s4 mode
      scene_btnMode = "nothing";
      //// call btn color - 1 color in 4 areas. (black)
      btnManager.scene_default("s0");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  61:{
    action: async () => {
      console.log("S6 finished");
      //// set all led to black.
      btnManager.scene_reset();
      //// go to next scene (s3)
    },  
  },
};

let scene7 = {
  1: {
    action: async () => {
      console.log("S7Q71");
      //// call btn color - random 6 ctn led on
      btnManager.s7_rand_call_btn(6);
      //// call btn - start s7 count mode
      scene_btnMode = "s7";
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q21.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q21.
    },
  },
  6: {
    action: async () => {
      console.log("S7Q72");
      //// call btn color - 
      btnManager.s7_rand_call_btn(0);
      btnManager.scene_reset();
      //// call btn - s6 mode
      //scene_btnMode = "s6";
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q22.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q22.
    },
  },
  11:{
    action: async () => {
      console.log("S7Q73");
      //// call btn color - random 6 ctn led on
      //// call btn - leave s4 mode
      btnManager.s7_rand_call_btn(6);
      //scene_btnMode = "nothing";
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  16:{
    action: async () => {
      console.log("S7Q74");
      //// call btn - leave s4 mode
      //scene_btnMode = "nothing";
      //// call btn color - reset
      btnManager.s7_rand_call_btn(0);
      btnManager.scene_reset();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  21:{
    action: async () => {
      console.log("S7Q74-2");
      //// call btn - 
      //scene_btnMode = "nothing";
      //// call btn color - 
      //btnManager.scene_default("s4s6");
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  36:{
    action: async () => {
      console.log("S7Q75");
      //// call btn - 
      //// call btn color - random 6 ctn led on
      btnManager.s7_rand_call_btn(5);
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  51:{
    action: async () => {
      console.log("S7Q76");
      //// call btn - leave s4 mode
      //scene_btnMode = "nothing";
      //// call btn color - reset
      btnManager.s7_rand_call_btn(0);
      btnManager.scene_reset();
      //// call audio - none

      //// call led stripe - ??

      //// call watchout video cue - S2Q23.
      //sendWatchout("run s5");
      //// call watchout audio cue - S2Q23.
    },  
  },
  66:{
    action: async () => {
      console.log("S7 finished, and s8 start");
      //// call watchout video cue - S8Q81.
      //sendWatchout("run s5");
    },  
  },
  86:{
    action: async () => {
      console.log("S8 finished");
      //// got preset mode
    },

  }
};

/*                                   */
/** scene timer mode (main timeline) */
/*                                   */

async function callMode(scene, t) {
  switch (scene) {
    case "S0":
      if (!scene0[t]) {
        return;
      }
      scene0[t].action();
      break;
    case "S1":
      if (!scene1[t]) {
        return;
      }
      scene1[t].action();
      break;
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
    case "S4":
      if (!scene4[t]) {
        return;
      }
      scene4[t].action();
      break;
    case "S5":
      if (!scene5[t]) {
        return;
      }
      scene5[t].action();
      break;
    case "S6":
      if (!scene6[t]) {
        return;
      }
      scene6[t].action();
      break;
    case "S7":
      if (!scene7[t]) {
        return;
      }
      scene7[t].action();
      break;
  }
}
//// udp trigger 
//// timer(1, "S0", 41)
//// timer(1, "S1", 21), timer(1, "S2", 56), timer(1, "S3", 66),  timer(1, "S4", 41)
//// timer(1, "S5", 61), timer(1, "S6", 61), timer(1, "S7", 66)
async function timer(state, scene, totalTime) {
  while (state) {
    await delay(1000);
    currentTime++;
    callMode(scene, currentTime);
    if (currentTime > totalTime) {
      state = 0;
      currentTime = 0; //// set up time back to 0
      console.log(`times up , total: ${totalTime} secs`);
    }
  }
}

/*                    */
/** scene button mode */
/*                    */

////4. button event cue (scene based)
let s0gs_counter = {
  1: {
    action: async () => {
      console.log("s0 small button lights off");
      //// trigger other cue
    },
  },
};
let s0gb_counter = {
  1: {
    action: async () => {
      console.log("s0 big button lights off");
      //// trigger other cue
    },
  }
};

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

let s4_counter = {
  1: {
    action: async () => {
      console.log("s4 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s4 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s4 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s4 4 times");
    },
  }
};

let s5a1_counter = {
  10: {
    action: async () => {
      console.log("s5 area1 10 times");
      //sendWatchout("run b4-1")
    },
  },
  20: {
    action: async () => {
      console.log("s5 area1 20 times");
    },
  },
  30: {
    action: async () => {
      console.log("s5 area1 30 times");
    },
  },
  40: {
    action: async () => {
      console.log("s5 area1 40 times");
    },
  },
  50: {
    action: async () => {
      console.log("s5 area1 50 times");
    },
  },
  60: {
    action: async () => {
      console.log("s5 area1 60 times");
    },
  },
  70: {
    action: async () => {
      console.log("s5 area1 70 times");
      //sendWatchout("run b4-1")
    },
  },
  80: {
    action: async () => {
      console.log("s5 area1 80 times");
    },
  },
  90: {
    action: async () => {
      console.log("s5 area1 90 times");
    },
  },
  100: {
    action: async () => {
      console.log("s5 area1 100 times");
    },
  }
};
let s5a2_counter = {
  10: {
    action: async () => {
      console.log("s5 area2 10 times");
      //sendWatchout("run b4-1")
    },
  },
  20: {
    action: async () => {
      console.log("s5 area2 20 times");
    },
  },
  30: {
    action: async () => {
      console.log("s5 area2 30 times");
    },
  },
  40: {
    action: async () => {
      console.log("s5 area2 40 times");
    },
  },
  50: {
    action: async () => {
      console.log("s5 area2 50 times");
    },
  },
  60: {
    action: async () => {
      console.log("s5 area2 60 times");
    },
  },
  70: {
    action: async () => {
      console.log("s5 area2 70 times");
      //sendWatchout("run b4-1")
    },
  },
  80: {
    action: async () => {
      console.log("s5 area2 80 times");
    },
  },
  90: {
    action: async () => {
      console.log("s5 area2 90 times");
    },
  },
  100: {
    action: async () => {
      console.log("s5 area2 100 times");
    },
  }
};
let s5a3_counter = {
  10: {
    action: async () => {
      console.log("s5 area3 10 times");
      //sendWatchout("run b4-1")
    },
  },
  20: {
    action: async () => {
      console.log("s5 area3 20 times");
    },
  },
  30: {
    action: async () => {
      console.log("s5 area3 30 times");
    },
  },
  40: {
    action: async () => {
      console.log("s5 area3 40 times");
    },
  },
  50: {
    action: async () => {
      console.log("s5 area3 50 times");
    },
  },
  60: {
    action: async () => {
      console.log("s5 area3 60 times");
    },
  },
  70: {
    action: async () => {
      console.log("s5 area3 70 times");
      //sendWatchout("run b4-1")
    },
  },
  80: {
    action: async () => {
      console.log("s5 area3 80 times");
    },
  },
  90: {
    action: async () => {
      console.log("s5 area3 90 times");
    },
  },
  100: {
    action: async () => {
      console.log("s5 area3 100 times");
    },
  }
};
let s5a4_counter = {
  10: {
    action: async () => {
      console.log("s5 area4 10 times");
      //sendWatchout("run b4-1")
    },
  },
  20: {
    action: async () => {
      console.log("s5 area4 20 times");
    },
  },
  30: {
    action: async () => {
      console.log("s5 area4 30 times");
    },
  },
  40: {
    action: async () => {
      console.log("s5 area4 40 times");
    },
  },
  50: {
    action: async () => {
      console.log("s5 area4 50 times");
    },
  },
  60: {
    action: async () => {
      console.log("s5 area4 60 times");
    },
  },
  70: {
    action: async () => {
      console.log("s5 area4 70 times");
      //sendWatchout("run b4-1")
    },
  },
  80: {
    action: async () => {
      console.log("s5 area4 80 times");
    },
  },
  90: {
    action: async () => {
      console.log("s5 area4 90 times");
    },
  },
  100: {
    action: async () => {
      console.log("s5 area4 100 times");
    },
  }
};

let s6_counter = {
  1: {
    action: async () => {
      console.log("s6 1 times");
      //sendWatchout("run b4-1")
    },
  },
  2: {
    action: async () => {
      console.log("s6 2 times");
    },
  },
  3: {
    action: async () => {
      console.log("s6 3 times");
    },
  },
  4: {
    action: async () => {
      console.log("s6 4 times");
    },
  }
};


//// 3. using return value to call button event cue (scene based)
async function s0_btn_cue(counter){
  let group = counter[0];
  let group_counter = counter[1];

  if (group == "small") {
    if (!s0gs_counter[group_counter]) {
      return;
    }
    s0gs_counter[group_counter].action();
  }

  if (group == "big") {
    if (!s0gb_counter[group_counter]) {
      return;
    }
    s0gb_counter[group_counter].action();
  }
}
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

async function s4_btn_cue(counter){
    if (!s4_counter[counter]) {
      return;
    }
    s4_counter[counter].action();
}

async function s5_btn_cue(counter){
  let area = counter[0];
  //console.log(area);
  let all_area_counter = counter[1];
  //console.log(all_area_counter);
  let a1_counter = all_area_counter[0];
  let a2_counter = all_area_counter[1];
  let a3_counter = all_area_counter[2];
  let a4_counter = all_area_counter[3];
  //console.log('current max: ' + Math.max(...all_area_counter));

  if (Math.max(...all_area_counter) === 30) {
    scene_5_btn_count = "win";
    //console.log(scene_5_btn_count);
    area_win = area;
  }

  switch (scene_5_btn_count) {
    case "compete":
      if (area == 1) {
        if (!s5a1_counter[a1_counter]) {
          return;
        }
        s5a1_counter[a1_counter].action();
      }
    
      if (area == 2) {
        if (!s5a2_counter[a2_counter]) {
          return;
        }
        s5a2_counter[a2_counter].action();
      }
    
      if (area == 3) {
        if (!s5a3_counter[a3_counter]) {
          return;
        }
        s5a3_counter[a3_counter].action();
      }
    
      if (area == 4) {
        if (!s5a4_counter[a4_counter]) {
          return;
        }
        s5a4_counter[a4_counter].action();
      }
    
      break;
    case "win":
      console.log(" win win");
      scene_5_btn_count = ""; 
      break;
   }
}

async function s6_btn_cue(counter){
  if (!s6_counter[counter]) {
    return;
  }
  s6_counter[counter].action();
}

//// 2.pass btn value (x,y)to "btnManager" to do computation and return value.
function btnMode(x, y) {
  switch(scene_btnMode){
    case "s0" :
      let counter0 = btnManager.s0_count_mode(x,y);
      //console.log(`process - counter0: ${counter0}`);
      s0_btn_cue(counter0);
      break;
    case "s2" :
      let counter = btnManager.s2_count_mode(x,y);
      //console.log(`process - counter: ${counter}`);
      s2_btn_cue(counter);
      break;
    case "s3" :
      let counter_s3 = btnManager.s3_count_mode(x,y);
      //console.log(`process - counter_s3: ${counter_s3}`);
      s3_btn_cue(counter_s3);
      break;
    case "s4" :
      let counter_s4 = btnManager.s4_count_mode(x,y);
      //console.log(`process - counter_s7: ${counter_s7}`);
      s4_btn_cue(counter_s4);
      break;
    case "s5" :
      let counter_s5 = btnManager.s5_count_mode(x,y);
      //console.log(`process - counter_s5: ${counter_s5}`);
      s5_btn_cue(counter_s5);
      break;
    case "s6" :
      let counter_s6 = btnManager.s6_count_mode(x,y);
      //console.log(`process - counter_s6: ${counter_s6}`);
      s6_btn_cue(counter_s6);
      break; 
    case "s7" :
      let counter_s7 = btnManager.s7_count_mode(x,y);
      console.log(`process - counter_s7: ${counter_s7}`);
      //s7_btn_cue(counter_s7);
      break; 
    case "nothing" :
      break;       
  }
}
//// 1.get btn value from app.js to function btnMode
process.on("message", function (args) {
  // console.log(args);
  let x = args["x"];
  let y = args["y"];
  console.log(`test.js get btn ${x} and ${y}`);
  let s = new sound.Sound();
  // s.playAudio('/home/pi/Q22B.wav', 0);
  s.playRandAudio(0);
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
  if (message == "S0") {
    timer(1, "S0", 41); //// 3rd value is scene totalTime
  }else if(message == "S1"){
    timer(1, "S1", 21); //// 3rd value is scene totalTime
  }else if(message == "S2"){
    timer(1, "S2", 56); //// 3rd value is scene totalTime
  }else if(message == "S3"){
    timer(1, "S3", 66); //// 3rd value is scene totalTime
  }else if(message == "S4"){
    timer(1, "S4", 41); //// 3rd value is scene totalTime
  }else if(message == "S5"){
    timer(1, "S5", 61); //// 3rd value is scene totalTime
  }else if(message == "S6"){
    timer(1, "S6", 61); //// 3rd value is scene totalTime
  }else if(message == "S7"){
    timer(1, "S7", 66); //// 3rd value is scene totalTime
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



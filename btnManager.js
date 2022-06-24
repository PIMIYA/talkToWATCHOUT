const exec = require('child_process').exec;
const kill = require('tree-kill');
const { Buttons } = require('./button');
var sref = null;

let xyPos = [
    '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', 
    '2-6', '2-5', '2-4', '2-3', '2-2', '2-1',
    '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', 
    '4-6', '4-5', '4-4', '4-3', '4-2', '4-1',
   ];

let tmp_XY = [
    '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', 
    '2-6', '2-5', '2-4', '2-3', '2-2', '2-1',
    '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', 
    '4-6', '4-5', '4-4', '4-3', '4-2', '4-1',
   ];
let rand_max =23;
let current_xy = "";
let s4_amount = 1;

let s7_default_xy = [];
let s7_amount = 0;

const BTN = require('./button');
let buttons = new BTN.Buttons();

////s2 setting
let area1_counter = 0;
let area2_counter = 0;
let area3_counter = 0;
let area4_counter = 0;

let s4_pos = 0;

class btnManager {
    constructor() {
    }
  
    init() {
      this.exec_btn();
      for(var i = 0; i<=23; i++){
        buttons.addButton(i);
      }
    }

    xyToPos(x, y) {
        let xy = x + "-" + y;
        let pos = xyPos.indexOf(xy);
        // console.log(pos);
        return pos
    }  

    scene_reset() {
        for(var i=0 ; i <=23; i++){
            buttons.allButtons[i].color = '0x000000'; //// black
            buttons.allButtons[i].ledReset();
            buttons.allButtons[i].count = 0;
        }
    }

    s2_default() {
        buttons.defaultMode = "s2";
    }
    s2_count_mode(x, y) {
        let pos = this.xyToPos(x, y);
        let black = '0x000000';   
        let area = buttons.allButtons[pos].area; 
        //let a1_color = '0xff0000'; 
        
        buttons.allButtons[pos].pressCount();
        let pos_counter = buttons.allButtons[pos].count; //// !! must call after .pressCount()
             
        if (area == 1 && pos_counter == 1) {
            buttons.allButtons[pos].color = black;
            buttons.allButtons[pos].ledOn();
            area1_counter++;
            //for 2nd rounds
            if (area1_counter == 6) {
                for(var i=0 ; i <=5; i++){
                    buttons.allButtons[i].color = '0x4b9600'; //// brown
                    buttons.allButtons[i].count = 0;
                    buttons.allButtons[i].ledOn();
                }
            }
            //console.log(`area: ${area}, area1_counter: ${area1_counter}`);
            return [area, area1_counter]
        } else if (area == 2 && pos_counter == 1) {
            buttons.allButtons[pos].color = black;
            buttons.allButtons[pos].ledOn();
            area2_counter++;
            //for 2nd rounds
            if (area2_counter == 6) {
                for(var i=6 ; i <=11; i++){
                    buttons.allButtons[i].color = '0xfcdb03'; //// yellow
                    buttons.allButtons[i].count = 0;
                    buttons.allButtons[i].ledOn();
                }
            }
            return [area, area2_counter]
        } else if (area == 3 && pos_counter == 1) {
            buttons.allButtons[pos].color = black;
            buttons.allButtons[pos].ledOn();
            area3_counter++;
            //for 2nd rounds
            if (area3_counter == 6) {
                for(var i=12 ; i <=17; i++){
                    buttons.allButtons[i].color = '0xffffff'; //// white
                    buttons.allButtons[i].count = 0;
                    buttons.allButtons[i].ledOn();
                }
            }
            return [area, area3_counter]
        } else if (area == 4 && pos_counter == 1) {
            buttons.allButtons[pos].color = black;
            buttons.allButtons[pos].ledOn();
            area4_counter++;
            //for 2nd rounds
            if (area4_counter == 6) {
                for(var i=18 ; i <=23; i++){
                    buttons.allButtons[i].color = '0x035afc'; //// blue
                    buttons.allButtons[i].count = 0;
                    buttons.allButtons[i].ledOn();
                }
            }
            return [area, area4_counter]
        } else return [area, 0]     
        //console.log(counter);
        //return [pos, pos_counter, area, area1_counter]
    }

    s2_ending() {
        buttons.endingMode = "s2";    
    }

    s3_default() {
        buttons.defaultMode = "s3";
    }

    s3_count_mode(x, y) {
        let pos = this.xyToPos(x, y);
        let black = '0x000000';   
        let area = buttons.allButtons[pos].area; 
        //let a1_color = '0xff0000'; 
        
        buttons.allButtons[pos].pressCount();
        let pos_counter = buttons.allButtons[pos].count; //// !! must call after .pressCount()
             
        if (area == 1 && pos_counter == 1) {
            buttons.allButtons[pos].color = black;
            buttons.allButtons[pos].ledOn();
            area1_counter++;
            //for 2nd rounds
            if (area1_counter == 6) {
                for(var i=0 ; i <=5; i++){
                    buttons.allButtons[i].color = '0x00ff00'; //// red
                    buttons.allButtons[i].count = 0;
                    buttons.allButtons[i].ledOn();
                }
            }
            //console.log(`area: ${area}, area1_counter: ${area1_counter}`);
            return [area, area1_counter]
        } else if (area == 2 && pos_counter == 1) {
            buttons.allButtons[pos].color = black;
            buttons.allButtons[pos].ledOn();
            area2_counter++;
            //for 2nd rounds
            if (area2_counter == 6) {
                for(var i=6 ; i <=11; i++){
                    buttons.allButtons[i].color = '0x0000ff'; //// blue
                    buttons.allButtons[i].count = 0;
                    buttons.allButtons[i].ledOn();
                }
            }
            return [area, area2_counter]
        } else if (area == 3 && pos_counter == 1) {
            buttons.allButtons[pos].color = black;
            buttons.allButtons[pos].ledOn();
            area3_counter++;
            //for 2nd rounds
            if (area3_counter == 6) {
                for(var i=12 ; i <=17; i++){
                    buttons.allButtons[i].color = '0xff0000'; //// green
                    buttons.allButtons[i].count = 0;
                    buttons.allButtons[i].ledOn();
                }
            }
            return [area, area3_counter]
        } else if (area == 4 && pos_counter == 1) {
            buttons.allButtons[pos].color = black;
            buttons.allButtons[pos].ledOn();
            area4_counter++;
            //for 2nd rounds
            if (area4_counter == 6) {
                for(var i=18 ; i <=23; i++){
                    buttons.allButtons[i].color = '0xffffff'; //// white
                    buttons.allButtons[i].count = 0;
                    buttons.allButtons[i].ledOn();
                }
            }
            return [area, area4_counter]
        } else return [area, 0]     
        //console.log(counter);
        //return [pos, pos_counter, area, area1_counter]
    }

    s3_ending_q33() {
        buttons.endingMode = "s3q33";    
    }

    s3_ending_q34() {
        buttons.endingMode = "s3q34";    
    }

    s3_ending_q35() {
        buttons.endingMode = "s3q35";    
    }

    s4_default() {
        buttons.defaultMode = "s4";
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    s4_rand_call_btn(){
        let pos = this.getRandomInt(rand_max);
        buttons.allButtons[pos].color = '0xffff00'; //// yellow
        buttons.allButtons[pos].ledOn();
        current_xy = tmp_XY[pos];
    }

    s4_count_mode(x, y) {
        let xy = x + '-' + y;
        console.log(s4_amount);
        if(xy == current_xy){
            if(s4_amount < 4){
                let pos = this.xyToPos(x, y);
                buttons.allButtons[pos].color = '0x000000'; //// black
                buttons.allButtons[pos].ledOn();
                // console.log(xy, current_xy);
                // console.log(tmp_XY);
                // console.log('tmp_XY length:' + tmp_XY.length);
                this.s4_rand_call_btn();
                s4_amount ++;
                return s4_amount;
            }else if(s4_amount == 4){
                //console.log('all leds off');
                this.scene_reset();
            }
        }
        
    }

    s5_default() {
        buttons.defaultMode = "s5";
    }

    s5_count_mode(x, y){
        let pos = this.xyToPos(x, y);
        buttons.allButtons[pos].pressCount();
        let amounts = buttons.allButtons[pos].count;
        //buttons.defaultMode = "s2";
        return [x, buttons.totalAreaAmount];
    }
    s5_ending() {
        buttons.endingMode = "s5"; 
    }

    s7_count_mode(x, y) {
        let click_xy = x +'-' + y;
        console.log('click: ' + click_xy);
        for (let i = 0; i < s7_default_xy.length; i++) {
            if(click_xy == s7_default_xy[i]){
                console.log(s7_default_xy[i]);
                let xy = s7_default_xy[i].split('-');
                let pos = this.xyToPos(xy[0], xy[1]);
                console.log(pos);
                buttons.allButtons[pos].color = '0x000000'; //// black
                buttons.allButtons[pos].ledOn();
                s7_amount --;
                return s7_amount;
            }

        }

    }


    getRandomlist(r){
        let numbers = [];
        let min = 0;
        let max = rand_max;
        for (let i = 0; i < r; i++) {
            do {
              var n = Math.floor(Math.random() * (max - min + 1)) + min;
              var p = numbers.includes(n);
              if(!p){
                numbers.push(n);
              }
            }
            while(p);
        }
        return numbers;
    }


    s5_area_compete(){
    }

    s7_rand_call_btn(n){
        s7_amount = n;
        let pos = this.getRandomlist(n);
        console.log(pos);
        var step;
        for (step = 0; step < n; step++) {
            buttons.allButtons[pos[step]].color = '0x00ff00'; //// red
            buttons.allButtons[pos[step]].ledOn();
            s7_default_xy.push(xyPos[pos[step]]);
        }
        console.log(s7_default_xy);
        
    }






    // btn_test(x, y, color){   
    //     console.log(buttons.numberOfButtons);
    //     buttons.allButtons[this.xyToPos(x, y)].state = false;
    //     buttons.allButtons[this.xyToPos(x, y)].color = color;
    //     buttons.allButtons[this.xyToPos(x, y)].ledOn();
    // }

    // get_btnState(x, y){
    //     let pos = this.xyToPos(x, y);
    //     return buttons.allButtons[pos].state;
    // }

    // change_btnState(x, y, state){
    //     let pos = this.xyToPos(x, y);
    //     buttons.allButtons[pos].state = state;
    // }

    // return_btn_count(x, y) {
    //     let pos = this.xyToPos(x, y);
    //     buttons.allButtons[pos].pressCount();
    //     let amounts = buttons.allButtons[pos].count;
    //     buttons.defaultMode = "s2";
    //     //console.log(buttons.totalAreaAmount);
    //     return amounts;
    // }




    //執行按扭btn.py
    exec_btn() {
        if (sref == null) {
            var call = 'python ./btn4pi/btn.py';
            sref = exec(call, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    return;
                }

                console.log(stdout);
            });
        }
    }

    //停止按扭btn.py
    stop_btn() {
        if (sref && sref.pid > 0) {
            kill(sref.pid, 'SIGTERM', function () {
                myLog('Killed btn process with PID: ', sref.pid);
                sref = null;
            });
        }
    }
}

module.exports = new btnManager();
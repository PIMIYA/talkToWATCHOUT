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

const BTN = require('./button');
let buttons = new BTN.Buttons();

////s2 setting
let area1_counter = 0;
let area2_counter = 0;
let area3_counter = 0;
let area4_counter = 0;

////s4 s6 setting
let tmp_XY = [
    '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', 
    '2-6', '2-5', '2-4', '2-3', '2-2', '2-1',
    '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', 
    '4-6', '4-5', '4-4', '4-3', '4-2', '4-1',
   ];
let rand_max =23;
let s4_current_xy = "";
let s6_current_xy = "";
let s4_amount = 0;
let s6_amount = 0;

//// s7 setting
let s7_default_xy = [];
let s7_amount = 0;

let buttonPos_s = [0,3,5,7,8,10,13,15,17,19,21,22];
let buttonPos_b = [1,2,4,6,9,11,12,14,16,18,20,23];

let bs = false;
let ss = false;


const delay = (interval) => {
    return new Promise((resolve) => {
      setTimeout(resolve, interval);
    });
  };


function flash(bigon, bigoff, smallOn, smallOff){
    this.MaxIterations = 1000000;
    this.Enabled = true;    
    this.condition = true;
    this.iteration = 0;
    this.Loop = async function(){
        if (this.condition 
            && this.Enabled 
            && this.iteration++ < this.MaxIterations){
                console.log(this.iteration);
                //do things
                console.log('b: '+ bs);
                console.log('s: '+ ss);
                if(bs == false && ss ==false){
                    await delay(500);
                    smallOff();
                    bigon();
                    await delay(500);
                    smallOn();
                    bigoff();
                }else if(bs == true && ss == false){
                    await delay(500);
                    smallOff();
                    bigoff();
                    await delay(500);
                    smallOn();
                    bigoff();
                }else if(bs == false && ss == true){
                    await delay(500);
                    smallOff();
                    bigon();
                    await delay(500);
                    smallOff();
                    bigoff();
                }else if(bs == true && ss == true){
                    await delay(500);
                    smallOff();
                    bigoff();
                    await delay(500);
                    smallOff();
                    bigoff();
                }
                setTimeout(this.Loop.bind(this),0);
            }
        };  
        this.Stop = function()
        {
            this.Enabled = false;
        };
}

class btnManager {  
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

    scene_default(s) {
        buttons.defaultMode = s;
    }

    scene_ending(sq) {
        buttons.endingMode = sq;
    }


    s0_bigOn(){
        let bigPos = buttonPos_b;
        var step;
        for (step = 0; step < bigPos.length; step++) {
            buttons.allButtons[bigPos[step]].color = '0xffffff'; //// white
            buttons.allButtons[bigPos[step]].ledOn();
        }
    }

    s0_bigOff(){
        let bigPos = buttonPos_b;
        var step;
        for (step = 0; step < bigPos.length; step++) {
            buttons.allButtons[bigPos[step]].color = '0x000000'; //// white
            buttons.allButtons[bigPos[step]].ledOn();
        }
    }



    
    
    
    s0_smallOn(){
        let smallPos = buttonPos_s;
        var step;
        for (step = 0; step < smallPos.length; step++) {
            buttons.allButtons[smallPos[step]].color = '0xffffff'; //// white
            buttons.allButtons[smallPos[step]].ledOn();
        }
    }
    
    s0_smallOff(){
        let smallPos = buttonPos_s;
        var step;
        for (step = 0; step < smallPos.length; step++) {
            buttons.allButtons[smallPos[step]].color = '0x00000'; //// white
            buttons.allButtons[smallPos[step]].ledOn();
        }
    }
    
    s0_flash(time){
        var f = new flash(this.s0_bigOn, this.s0_bigOff, this.s0_smallOn, this.s0_smallOff);
        setTimeout(f.Loop.bind(f), 0);
        setTimeout(f.Stop.bind(f), time);
    }
    
    s0_count_mode(x, y){
        let pos = this.xyToPos(x, y);
        if(buttonPos_s.indexOf(pos) != -1){
            ss = true;
        }else if(buttonPos_b.indexOf(pos) != -1){
            bs = true;
        }
        console.log(`bigState: ${bs}, smallState: ${ss}`);
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

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    s4_rand_call_btn(amount){      
        //console.log('amount in amount :' + amount);
        let pos = this.getRandomInt(rand_max);

        if(amount == 4) {
            buttons.allButtons[pos].color = '0x000000'; //// black
            buttons.allButtons[pos].ledOn();
            this.scene_reset();
        } else {
            buttons.allButtons[pos].color = '0xffff00'; //// yellow
            buttons.allButtons[pos].ledOn();
            s4_current_xy = tmp_XY[pos];  
        }               
    }

    s4_count_mode(x, y) {
        let xy = x + '-' + y;
        if(xy == s4_current_xy){
            if (s4_amount < 4) {
                let pos = this.xyToPos(x, y);
                buttons.allButtons[pos].color = '0x000000'; //// black
                buttons.allButtons[pos].ledOn();
              
                s4_amount ++;
                this.s4_rand_call_btn(s4_amount, pos);
                //console.log('s4_amount in s4_count_mode :' + s4_amount);
                return s4_amount;
            }
        }
    }

    s5_count_mode(x, y){
        let pos = this.xyToPos(x, y);
        buttons.allButtons[pos].pressCount();
        let amounts = buttons.allButtons[pos].count;
        //buttons.defaultMode = "s2";
        return [x, buttons.totalAreaAmount];
    }

    s6_rand_call_btn(amount){      
        //console.log('amount in amount :' + amount);
        let pos = this.getRandomInt(rand_max);

        if(amount == 4) {
            buttons.allButtons[pos].color = '0x000000'; //// black
            buttons.allButtons[pos].ledOn();
            this.scene_reset();
        } else {
            buttons.allButtons[pos].color = '0xffff00'; //// yellow
            buttons.allButtons[pos].ledOn();
            s6_current_xy = tmp_XY[pos];  
        }               
    }

    s6_count_mode(x, y) {
        let xy = x + '-' + y;
        if(xy == s6_current_xy){
            if (s6_amount < 4) {
                let pos = this.xyToPos(x, y);
                buttons.allButtons[pos].color = '0x000000'; //// black
                buttons.allButtons[pos].ledOn();
              
                s6_amount ++;
                this.s6_rand_call_btn(s6_amount, pos);
                //console.log('s6_amount in s6_count_mode :' + s6_amount);
                return s6_amount;
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

    s7_count_mode(x, y) {
        let click_xy = x +'-' + y;
        //console.log('click: ' + click_xy);
        for (let i = 0; i < s7_default_xy.length; i++) {
            if(click_xy == s7_default_xy[i]){
                //console.log(s7_default_xy[i]);
                let xy = s7_default_xy[i].split('-');
                let pos = this.xyToPos(xy[0], xy[1]);
                //console.log(pos);
                buttons.allButtons[pos].color = '0x000000'; //// black
                buttons.allButtons[pos].ledOn();
                s7_amount --;
                if(s7_amount == 0) {
                   let resault = " success 1 time"
                   return resault;
                }
                //return s7_amount;
            }
        }
    }

    s7_rand_call_btn(n){
        s7_amount = n;
        let pos = this.getRandomlist(n);
        //console.log(pos);
        var step;
        for (step = 0; step < n; step++) {
            buttons.allButtons[pos[step]].color = '0xffff00'; //// yellow
            buttons.allButtons[pos[step]].ledOn();
            s7_default_xy.push(xyPos[pos[step]]);
        }
        //console.log(s7_default_xy);   
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
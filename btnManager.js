//啟動按扭btn.py
var NUM_BUTTON = 24;
var area1_count = 0;
var area2_count = 0;
var area3_count = 0;
var area4_count = 0;
let most = 0;

////s2 setting
let pos = 0;

const exec = require('child_process').exec;
const kill = require('tree-kill');
var sref = null

class btnManager {
    constructor() { }
  
    init() {
      this.exec_btn();
    }

    btn_pressed(x,y){

        if (x == 1) {
            pos = y;
            //console.log(`row 1 pos : ${pos}`)
            return pos;
        } else if (x == 2) {
            switch(y){
                case 1 :
                    pos = 12;
                    return pos;
                    //break;
                case 2 :
                    pos = 11;
                    return pos;
                case 3 :
                    pos = 10;
                    return pos;
                case 4 :
                    pos = 9;
                    return pos;
                case 5 :
                    pos = 8;
                    return pos;
                case 6 :
                    pos = 7;
                    return pos;             
            }
            //pos = 6 + y;
            //console.log(`row 2 pos : ${pos}`)
            //return pos;
        } else if (x == 3) {
            pos = 12 + y;
            //console.log(`row 3 pos : ${pos}`)
            return pos;
        } else if (x == 4) {
            switch(y){
                case 1 :
                    pos = 24;
                    return pos;
                    //break;
                case 2 :
                    pos = 23;
                    return pos;
                case 3 :
                    pos = 22;
                    return pos;
                case 4 :
                    pos = 21;
                    return pos;
                case 5 :
                    pos = 20;
                    return pos;
                case 6 :
                    pos = 19;
                    return pos;             
            }
            // pos = 18 + y;
            //console.log(`row 4 pos : ${pos}`)
            // return pos;
        }

        //console.log(`xx : ${current_x} , yy: ${current_y}`)
        //return pos;
    }

    btn_count(x,y){           
                
            if (x == 1) {
                area1_count ++;
                return x, area1_count;
            } else if (x == 2) {
                area2_count ++;
                return x, area2_count;
            } else if (x == 3) {
                area3_count ++;
                return x, area3_count;
            } else if (x == 4) {
                area4_count ++;
                return x, area4_count;
            } 
             
            // most = Math.max(area1_count, area2_count, area3_count, area4_count);;
    }

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
const myLed = require('./wsController');
let ledController = new myLed();
ledController.init();

let xyPos = [
             '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', 
             '2-6', '2-5', '2-4', '2-3', '2-2', '2-1',
             '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', 
             '4-6', '4-5', '4-4', '4-3', '4-2', '4-1',
            ];

// let buttonPos_s = [0,3,5,7,8,10,13,15,17,19,21,22];
// let buttonPos_b = [1,2,4,6,9,11,12,14,16,18,20,23];


class Button {
    constructor(pos, color, count = 0, area, brightness ) {
        this.pos = pos;
        this.color = color;
        this.count = count;
        this.area = area;
        this.brightness = brightness;
    }

    ledOn() {
        ledController.brightnessOne(this.pos+1, this.color);
    }

    ledSetBrightness(){
        ledController.set_brightness(this.pos, this.color, this.brightness)
    }

    ledReset() {
        ledController.brightnessOne(this.pos+1, this.color);
    } 

    pressCount() {
        this.count++;
    }

    amountReset() {
        this.count = 0;
    }   
}

class Buttons {
    constructor() {
        this.buttons = [];
    }

    addButton(pos) {
        let b = new Button(pos);
        let xy = xyPos[pos];
        b.area = xy.split('-')[0];
        //b.state = false;
        this.buttons.push(b);
        return b
    }

    get allButtons() {
        return this.buttons
    }

    get numberOfButtons() {
        return this.buttons.length
    }

    get totalAreaAmount(){
        let firstAreaAmount =0;
        let secondAreaAmount =0;
        let thirdAreaAmount = 0;
        let fourthAreaAmount = 0;
        for(var i=0 ; i <=5; i++){
            firstAreaAmount += this.buttons[i].count;
        }
        for(var i=6 ; i <=11; i++){
            secondAreaAmount += this.buttons[i].count;
        }
        for(var i=12 ; i <=17; i++){
            thirdAreaAmount += this.buttons[i].count;
        }
        for(var i=18 ; i <=23; i++){
            fourthAreaAmount += this.buttons[i].count;
        }
        return [firstAreaAmount, secondAreaAmount, thirdAreaAmount, fourthAreaAmount];
    }

    get iniAreaAmount(){
        let allAreaAmount =0;
        for(var i=0 ; i <=23; i++){
            allAreaAmount += this.buttons[i].count;
        }
        return allAreaAmount;
    }

    randomOn() {
        let randomPos = Math.floor(Math.random()*23);
        this.buttons[randomPos].color = '0xffff00'; //// yellow
        this.buttons[randomPos].count = 0;
        this.buttons[randomPos].ledOn();
        return randomPos;
    }


    set defaultMode(m){
        if(m == "s2"){
            for(var i=0 ; i <=5; i++){
                // this.buttons[i].lightMode = "notBreath";
                this.buttons[i].color = '0x4b9600'; //// brown
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
            for(var i=6 ; i <=11; i++){
                // this.buttons[i].lightMode = "notBreath";
                this.buttons[i].color = '0xfcdb03'; //// yellow
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
            for(var i=12 ; i <=17; i++){
                // this.buttons[i].lightMode = "notBreath";
                this.buttons[i].color = '0xffffff'; //// white
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
            for(var i=18 ; i <=23; i++){
                // this.buttons[i].lightMode = "notBreath";
                this.buttons[i].color = '0x035afc'; //// blue
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
        }else if(m == "s3"){
            for(var i=0 ; i <=5; i++){
                this.buttons[i].color = '0x00ff00'; //// red
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
            for(var i=6 ; i <=11; i++){
                this.buttons[i].color = '0x0000ff'; //// blue
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
            for(var i=12 ; i <=17; i++){
                this.buttons[i].color = '0xff0000'; //// green
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
            for(var i=18 ; i <=23; i++){
                this.buttons[i].color = '0xffffff'; //// white
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
        }else if(m == "s0s4s6"){
            for(var i=0 ; i <=23; i++){
                this.buttons[i].color = '0x000000'; //// black
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
        }else if(m == "s5"){
            for(var i=0 ; i <=5; i++){
                this.buttons[i].color = '0x00ff00'; //// red
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
            for(var i=6 ; i <=11; i++){
                this.buttons[i].color = '0x0000ff'; //// blue
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
            for(var i=12 ; i <=17; i++){
                this.buttons[i].color = '0xff0000'; //// green
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
            for(var i=18 ; i <=23; i++){
                this.buttons[i].color = '0xffffff'; //// white
                this.buttons[i].count = 0;
                this.buttons[i].ledOn();
            }
        }
    }

    set endingMode(m){
        if(m == "s2"){
            for(var i=0 ; i <=23; i++){
                //this.buttons[i].lightMode = "breath";
                this.buttons[i].color = '0x035afc'; //// blue
                this.buttons[i].brightness = 20;
                this.buttons[i].ledSetBrightness();
                this.buttons[i].count = 0;
            } 
        } else if(m == "s3q33"){
            for(var i=0 ; i <=23; i++){
                this.buttons[i].color = '0x660066'; //// wrong color, should be rainbow color.
                this.buttons[i].ledOn();
                this.buttons[i].count = 0;
            }                  
        } else if(m == "s3q34"){
            for(var i=0 ; i <=23; i++){
                this.buttons[i].color = '0x666666'; //// white 60%
                this.buttons[i].ledOn();
                this.buttons[i].count = 0;
            }               
        } else if(m == "s3q35"){
            for(var i=0 ; i <=23; i++){
                this.buttons[i].color = '0xffffff'; //// white 100%
                this.buttons[i].ledOn();
                this.buttons[i].count = 0;
            }               
        } else if(m == "s5"){
            for(var i=0 ; i <=23; i++){
                this.buttons[i].color = '0xffffff'; //// white 100%
                this.buttons[i].ledOn();
                this.buttons[i].count = 0;
            } 
        } else if(m == "s5a1"){
            for(var i=0 ; i <=23; i++){
                this.buttons[i].color = '0x00ff00'; //// red
                this.buttons[i].ledOn();
                this.buttons[i].count = 0;
            } 
        } else if(m == "s5a2"){
            for(var i=0 ; i <=23; i++){
                this.buttons[i].color = '0x0000ff'; //// blue
                this.buttons[i].ledOn();
                this.buttons[i].count = 0;
            } 
        } else if(m == "s5a3"){
            for(var i=0 ; i <=23; i++){
                this.buttons[i].color = '0xff0000'; //// green
                this.buttons[i].ledOn();
                this.buttons[i].count = 0;
            } 
        } else if(m == "s5a4"){
            for(var i=0 ; i <=23; i++){
                this.buttons[i].color = '0xffffff'; //// white
                this.buttons[i].ledOn();
                this.buttons[i].count = 0;
            } 
        }
    }

}

module.exports = {
    Button : Button,
    Buttons : Buttons
}
    
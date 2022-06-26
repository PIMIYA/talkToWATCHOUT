const exec = require('child_process').exec;
const kill = require('tree-kill');
let fs = require('fs');
var path = require('path');
let filepath = path.join(__dirname, '/' , 'soundFiles', '/');
let files = fs.readdirSync('./soundFiles');

let myLog = function (lbl, vars) {
    if (1) console.log(lbl, vars);
}

const device = ['default:CARD=Device','default:CARD=Device_3','default:CARD=Device_2','default:CARD=Device_1']


class Sound {
    constructor(sref){
        this.sref = sref;
    }

    playAudio(file, d_num){
        let call = 'aplay -D ' + device[d_num] + ' ' + file;
        this.sref = exec(call);
        this.sref.on('close', (code) => {
            console.log('Finished');
            //this.stop();
        });
    }

    playRandAudio(d_num){
        //myLog('current', filepath);
        let chosenFile = filepath + files[Math.floor(Math.random() * files.length)];
        myLog('file: ', chosenFile);
        this.playAudio(chosenFile, d_num);
    }

    stop(){
        if (this.sref && this.sref.pid > 0) {
            kill(this.sref.pid, 'SIGTERM', function () {
                myLog('Killed audioPlay with PID: ', this.sref.pid);
                this.sref = null;
            });
        }
    }
}

module.exports = { Sound:Sound } 




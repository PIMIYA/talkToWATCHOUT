const express = require('express');
const http = require('http');
const child_process = require("child_process");

const constValue = require('./common/constValue');
const config = require('./config');
let port = process.env.Port || config.Port || 3000;
let nodeIndex = process.env.Index || config.NodeIndex;
let serverHost = process.env.ServerHost || config.ServerHost;
constValue.setNodeCount(config.NodeRow, config.NodeColumn);
config.SetIndex(nodeIndex);
config.SetServerHost(serverHost);

// !! fork to test.js
let test = child_process.fork("./process.js");




if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

process.on("SIGINT", function () {
    // ledController.reset(true);
    console.log('Node server stopped. Node Index: ' + config.NodeIndex);
    process.exit();
});



let app = express();
app.set('port', port)
app.use(express.json());
app.use(express.static('public'));

// ========== API

app.route('/api/mode')
    .get(function (req, res) {
            res.json({
                    nodeIndex: config.NodeIndex,
                    // mode: ledController.getMode()
                });
            })
            .post(function (req, res) {
                    let mode = req.body.mode;
                    // ledController.setMode(mode);
                    // ledController.reset();
            
                    res.end();
                });
            
            
            app.route('/api/led')
                .post(function (req, res) {
                        // let payload = req.body.payload;
                
                        res.end();
                    }).delete(function (req, res) {
                        // controller.reset();
                    
                            res.end();
                        });
                    
                    app.get('/api/button/:x/:y', function (req, res) {
                            let x = parseInt(req.params.x, null);
                            let y = parseInt(req.params.y, null);
                            if (x == null || y == null) {
                                    res.status(400).end('X and Y can not null.');
                                    return;
                                }
                                // ledController.onButtonClickEvent(x, y);
                                test.send({
                                    x: x,
                                    y: y,
                                });
                            
                                res.end();
                            });
                            
                            // API ==========
                       
                                                                         

let server = http.createServer(app)
server.listen(app.get('port'), function () {
    console.log('Node server listening on port ' + app.get('port'));
    console.log('Node Index ' + config.NodeIndex);
    console.log('Server Host ' + config.ServerHost);
});



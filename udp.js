const dgram = require('dgram');
var serverPORT = 9090;
var serverHOST = '192.168.168.56'; //pi's ip 192.168.168.45  //// 10.1.8.241
var clientPORT = 9090; //watchout production port is 3040
var clientHOST = '192.168.168.56'; //watchout's ip 192.168.168.45 //// 10.1.8.241


// var server = dgram.createSocket('udp4');
// server.on('listening', function () {
// var address = server.address();
// console.log('UDP Server listening on ' + address.address + ":" + address.port);
// });
// server.on('message', function (message, remote) {
//     console.log(remote.address + ':' + remote.port +' - ' + message);
//     // if (message == "S1"){
//     //     timer(0,"S1",50);
//     // }
// });
// server.bind(serverPORT, serverHOST)

// 例子：UDP客戶端
var message = "S2"; //S5
console.log(message);
var client = dgram.createSocket('udp4');
client.send(message, clientPORT, clientHOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + clientHOST +':'+ clientPORT + ' ' + message);
    client.close();
});

const ws281x = require('rpi-ws281x-native');

var NUM_LEDS = parseInt(process.argv[2], 24) || 24,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

// let breathLed;
// let lightMode;
// let new_pos;
// let new_color;





/**
  * 使用前一定要呼叫 init
  */
class wsController {
  constructor() { }

  init() {
    ws281x.init(NUM_LEDS);
    // this.exec_btn();
  }

  /**
    * Reset all led to disabled.
    */
  reset() {
    ws281x.reset(NUM_LEDS);
    //
    //ws281x.init(NUM_LEDS);
  }

  /**
    * all led on, depends on the input of hex color
    */
  brightness(color1,color2,color3,color4) {
    
    for(var i = 0; i < NUM_LEDS/4; i++) {
      pixelData[i] = color1;
    }
    for(var j = NUM_LEDS/4; j < NUM_LEDS/2; j++) {
      pixelData[j] = color2;
    }
    for(var k = NUM_LEDS/2; k < NUM_LEDS/4*3; k++) {
      pixelData[k] = color3;
    }
    for(var l = NUM_LEDS/4*3; l < NUM_LEDS; l++) {
      pixelData[l] = color4;
    }

    ws281x.render(pixelData);
    console.log('Enter brightness mode. Press <ctrl>+C to exit.');      
  }

  /**
    * all led on, depends on the input of hex color
    */
  brightnessAll(color) {
    for(var i = 0; i < NUM_LEDS; i++) {
      pixelData[i] = color;
    }
    ws281x.render(pixelData);
    console.log('Enter brightnessAll mode. Press <ctrl>+C to exit.');      
  }

  brightnessOne(pos, color){
    let ledPos = pos - 1;
    pixelData[ledPos] = color;
    ws281x.render(pixelData);
  }


  set_brightness(pos, color, brightness){
    let ledPos = pos - 1;
    pixelData[ledPos] = color;
    ws281x.render(pixelData);
    ws281x.setBrightness(brightness);
  }


  // brightnessOne(pos, color, lightMode){
  //   //console.log(pos);
  //   //console.log(color);
  //   new_pos = pos;
  //   new_color = color;

  //   if(lightMode == "notBreath"){
  //     lightMode = false;
  //     //breathLed = new wsLed(this.ledbrightnessOne);
  //   }else if (lightMode == "breath"){
  //     lightMode = true;
  //     //noBreathLed = new wsLed(this.ledbrightnessOneBreath);
  //   }
  //   breathLed = new wsLed(this.ledbrightnessOne);
  // }

  // ledbrightnessOne(pos, color, lightMode){
  //   let ledPos = pos - 1;
  //   pixelData[ledPos] = color;
  //   ws281x.render(pixelData);

  //   // ---- animation-loop
  //   var t0 = Date.now();
  //   var breath = setInterval(function () {
  //     var dt = Date.now() - t0;
      
  //     ws281x.setBrightness(
  //       Math.floor(Math.sin(dt/1000) * 128 + 128));
  //   }, 1000 / 30);
  //   if(lightMode == true){
  //     clearInterval(breath);
  //   }
  //   //clearInterval(breath);
  // }





  // ledbrightnessOne(pos, color){
  //   let ledPos = pos - 1;
  //   pixelData[ledPos] = color;
  //   ws281x.render(pixelData);
  // }

  // ledbrightnessOneBreath(pos, color){
  //   let ledPos = pos - 1;
  //   pixelData[ledPos] = color;
  //   ws281x.render(pixelData);

  //   // ---- animation-loop
  //   var t0 = Date.now();
  //   var breath = setInterval(function () {
  //     var dt = Date.now() - t0;
      
  //     ws281x.setBrightness(
  //       Math.floor(Math.sin(dt/1000) * 128 + 128));
  //   }, 1000 / 30);
  //   //clearInterval(breath);
  // }



}

module.exports = wsController;



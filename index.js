var five = require("johnny-five");
var board = new five.Board();
var controller = process.argv[2] || "GP2Y0A02YK0F";

board.on("ready", function() {
  var led = new five.Led(13);

  this.repl.inject({
    led: led
  });

  

  var proximity = new five.Proximity({
    controller: controller,
    pin: "A0"
  });

  proximity.on("data", function() {

    if(this.inches > 210 ){
     // console.log("inches: ", this.inches);
     led.on();
     console.log("object is close ");
    }else{
      //console.log("cm: ", this.cm);
      led.off();
    }
    
  });
});
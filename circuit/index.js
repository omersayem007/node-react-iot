const five = require("johnny-five");
const dweetClient = require('node-dweetio');



var board = new five.Board();
const dweetio =new dweetClient();
const dweetThing ='node-iot';
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
      // console.log("object is close ");


    const tweetMessage = {
      busParked :"bus is Parked"
      }

    dweetio.dweet_for(dweetThing, tweetMessage, (err, dweet) => {
      // if (err) {
      //   console.log('[Error]: ', err);
      // }
      if (dweet) {
        console.log(dweet.content);
      }
    })


  }
  else{
      //console.log("cm: ", this.cm);
      led.off();
    }``

    
    
  });
});
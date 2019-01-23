import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080/');
function subscribeToTimer(cb) {
  socket.on('sensor-data', (data)=>{
    console.log(data.sensorData.busParked)
    if( data.sensorData.busParked === " "){
        cb(null, "Bus isNot parked") 
    }
     cb(null, data.sensorData.busParked) 
  });
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };
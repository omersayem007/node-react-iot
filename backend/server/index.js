const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/Db');
const http = require("http");
require('dotenv').load();
const dweetClient = require('node-dweetio');
const mongoose = require('mongoose');
const PollRouter = require('./routes/PollRoute');
const port = process.env.PORT;
mongoose.connect(config.DB,{ useNewUrlParser: true }).then(
    () => {console.log('Database is connected')},
    err => { console.log('Database connection error'+ err)}
);

const app = express();
var server = app.listen(8080);
const io = require('socket.io')(server);


app.use(helmet());
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));
app.use(morgan('combined'));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


app.use(PollRouter)

const dweetio = new dweetClient();
const dweetThing = 'node-iot';

io.on('connection', (socket) => {
    console.log('Connection has been established with browser.');
    socket.on('disconnect', () => {
      console.log('Browser client disconnected from the connection.');
    });
  });
  
  dweetio.listen_for(dweetThing, (dweet) => {
    const data = {
      sensorData: dweet.content
    };
    io.emit('sensor-data', data);
  });

app.listen(port,() => {

    console.log("listening on port "+port);
})

module.exports = app;
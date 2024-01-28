//1 reading file syncronously
const fs = require('fs');
const readText = fs.readFileSync('PATH', 'utf-8');

//2 writing in a file syncronously
const textOut = 'ye likhna h nyi file mejo banegi';
fs.writeFileSync('path', textOut);

//3 reading file asyncronously
const data = fs.readFile('path', 'utf-8', (err, data) => {
  console.log(data);
});

//4 wirting file asyncrounously
fs.writeFile('path', 'utf-8', (err) => {
  console.log(err);
});

//5 creating server and listening to request

const server = http.createServer((req, res) => {
  res.end('hello from the server');
});

server.listen('8000', '127.0.0.1', () => {
  console.log('server running on port 8000');
});

//6 Creating server and hosting
const server1 = http.createServer((req, res) => {
  const pathName = req.params;
  if (pathName == '/') {
    res.end('ha bhai ye chalega koi dikkat ki bat ni h and make more lse cases if u wish to learn');
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1> page not found');
  }
});

//7 click events and handling click events
const EventEmitter = require('events');
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on('shashwat', () => {
  console.log('shashwat clicked');
});
myEmitter.emit('shashwat');

//8 server pe bhi event accept kr skte h

const server2 = http.createServer();
server2.on('request', (req, res) => {
  res.end('req,response received otayyyy !');
  //9 reading and writing through streams
  const readable = fs.createWriteStream('filname');
  readable.on('data', (chunk) => {
    res.write(chunk);
  });
  //file khtm ho jaegi tb
  readable.on('end', () => {
    res.end;
  });
  // kch error agya to ye wala function
  res.on('err', () => {
    res.end('file not found');
  });

  //10 throught pipe reading and writing
  const readable1 = fs.createReadStream('filename');
  readable.pipe(res); //writing destination is res in this case
});

//11 express a node js framework
const express = require('express');
const app = express;

app.get('/', (req, res) => {
  console.log('get req 1');
  res.status(200).json({
    sttaus: 'success',
    data: res,
  });
});

app.post('/', (req, res) => {
  console.log('get req 1');
  res.status(200).send('huihuiuhui');
});

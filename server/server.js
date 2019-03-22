const express = require('express'); // load express library into file

const server = express();

server.use(express.static( __dirname + '/html'))

var insults = [
    'someones feet smells',
    'stop talking, you bumbling idiot',
    'mr. 7 leaves cant stop, wont stop',
    'all star jason coming in hot with that patience',
    'vivian still sucks',
    'david gumby climber with them v10s'
]

// the path to listen for
// the callback function to call once that path has been received
server.get('/', function(request, response) {
    // an object representing all of the data coming from the client to the server
    // an object representing all of the data going from the server to the client
    response.send('response')
})

server.get('/time', (request, response) => {
    var now = new Date();
    response.send(now.toLocaleDateString());
})

server.get('/insult', (request, response) => {
    let randomIndex = Math.floor(Math.random()*insults.length);
    response.send(insults[randomIndex]);
})

server.listen(3001, () => {
    console.log('carrier has arriver')
});
const express = require('express'); // load express library into file

const server = express();

server.use(express.static( __dirname + '/html'))

server.get('/api/grades', (req, res) => {
    res.send(`{
        "success": true,
        "data": [{
            "id": 1,
            "name": "Quan Le",
            "course": "LFZ",
            "grade": 100
        }, {
            "id": 2,
            "name": "Vivan Sucks",
            "course": "coding",
            "grade": 50
        }, {
            "id": 3,
            "name": "David Gumby",
            "course": "climber",
            "grade": 0
        }]
    }`);
})

server.listen(3001, () => {
    console.log('carrier has arriver')
});
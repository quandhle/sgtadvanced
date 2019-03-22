const express = require('express'); // load express library into file
const mysql = require('mysql');
const server = express();
const mysquelcredentials = require('./mysqlcreds.js');

// using the credentials that we loaded, establish a preliminary connection to the database
const db = mysql.createConnection(mysquelcredentials);

server.use(express.static( __dirname + '/html'))

// when server receives this url at port 3001 specified on line 17, call this function
// make an endpoint to handle retrieving the grades of all studnets
server.get('/api/grades', (req, res) => {
    // establish the connection to the database and call callback function when connection is made
    db.connect( () => {
        // create a query for our desired connection
        const query = "SELECT `id`, CONCAT(`givenname`, \" \", `surname`) AS `name`, `course`,  `grade` FROM `grades`";

        // send the query to the database and call callbac fuynction once the data is retireved or an error happens
        db.query(query, (error, data) => {
            // if error is null, no error occured
            // create an output object to be sent back to the client
            const output = {
                success: false,
            }

            // if error is null, send the data
            if (!error) {
                // notify rthe client that we were successful
                output.success = true;
                // attach the data from the database to the output object
                output.data = data;
            } else {
                // an error occurred, attach that error onto the output so we can see what happened
                output.error = error;
            }

            // send the data back to the client
            res.send(output);
        });
    });
})

server.post('/api/grades', (req, res) => {

})

server.listen(3001, () => {
    // console.log('server is running on port 3001');
    console.log('carrier has arrived')
});
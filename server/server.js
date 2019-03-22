const express = require('express'); // load express library into file
const mysql = require('mysql');
const server = express();
const mysquelcredentials = require('./mysqlcreds.js');

// using the credentials that we loaded, establish a preliminary connection to the database
const db = mysql.createConnection(mysquelcredentials);

server.use(express.static( __dirname + '/html'));
//have express pull body data that is urlencoded and place it into an object called "body"
server.use(express.urlencoded({extended: false}));

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
});

server.post('/api/grades', (req, res) => {

    // check body object and see if any data was not sent
    if (req.body.name === undefined || req.body.name === undefined || req.body.grade === undefined) {

        // respond to client with an appropriate error message
        res.send({
            success: false,
            error: 'invalid name, course, or grade'
        });

        return;
    }

    // connect to database
    db.connect( () => {
        const name = req.body.name.split(' ');

        const query = 'INSERT INTO `grades` SET `surname` = "'+name[1]+'", `givenname` = "'+name[0]+'", `course` = "'+req.body.course+'", `grade` = '+req.body.grade+', `added` = NOW()';
        console.log(query);
        db.query(query, (error, result) => {
            if (!error) {
                res.send({
                    success: true,
                    new_id: result.insertId
                })
            }
        })
    });
})

server.listen(3001, () => {
    // console.log('server is running on port 3001');
    console.log('carrier has arrived')
});
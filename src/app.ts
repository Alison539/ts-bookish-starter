import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);

//INITAL CONNECTION
var Request = require('tedious').Request;
var Connection = require('tedious').Connection;

//configuration for login
var config = {
  server: "localhost", 
  options: {
    database: 'bookish',
    port: 1433,
    trustServerCertificate: true
  },
  authentication: {
    type: "default",
    options: {  
      userName: "bookishUser",
      password: "bookishPassword!14",
    }
  }
};

var connection = new Connection(config);
connection.on('connect', function(err) {
    if(err) {
      console.log('Error: ', err)
    }
    // If no error, then good to go...
    
  });
connection.connect();

//BOOKS ENDPOINT TO RETURN ALL BOOKS
app.get('/books', (req, res) => {
    let message = []

    let request = new Request("SELECT * FROM Book", function(err, rowCount) {
        if (err) {
          console.log(err);
        } else {
          console.log(rowCount + ' rows');
          // and we close the connection
          connection.close()
        }
      });

    request.on('row', function(columns) {
        let tempArray = []
        columns.forEach(function(column) {
        //   console.log(column.value);
          tempArray.push(column.value)
        });
        message.push(tempArray)
        tempArray = []
        console.log(message)
    });


    connection.execSql(request);
    res.send(message);
});
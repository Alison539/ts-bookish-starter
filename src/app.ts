import express from 'express';
import 'dotenv/config';
import {AllBooks} from './book2'

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { json } from 'stream/consumers';

//INITAL CONNECTION
var Request = require('tedious').Request;
var Connection = require('tedious').Connection;

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

let flag = false

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
  var books = new AllBooks();
  let getGeneral = new Request("SELECT ISBN, Title, numberOfCopies FROM Book \n SELECT ISBN, AuthorName FROM Wrote JOIN Author ON Wrote.AuthorID = Author.AuthorID \n SELECT ISBN, DueDate, Username, Borrowing.UserID FROM Borrowing JOIN Users ON Borrowing.UserID = Users.UserID", function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      // and we close the connection
      connection.close()
      //returning information about the books
      res.send(JSON.stringify(books));
    }
  });

  //this gets called just before connection.close() above
  getGeneral.on('row', function(columns) {

    //temp array stores the contents of a row (a record from the returned query)
    let tempArray = []
    columns.forEach(function(column) {
      tempArray.push(column.value)
    });

    let numberItems = tempArray.length
    if (numberItems == 3){
        //it is the general (ISBN Title numberofCopies)
        books.newBook(tempArray)
    }
    else if (numberItems == 2){
        //it is an author
        books.setAuthors(tempArray)
    }
    else if (numberItems == 4){
      //its about an unavailable book
        books.setUnavailable(tempArray)

    }   
  
});

connection.execSql(getGeneral);


    
});

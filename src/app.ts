import express from 'express';
import 'dotenv/config';
import {AllBooks} from './book2'

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';

const port = process.env['PORT'] || 3000;

var books = new AllBooks();

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
    

    let getGeneral = new Request("SELECT ISBN, Title, numberOfCopies FROM Book \n SELECT ISBN, AuthorName FROM Wrote JOIN Author ON Wrote.AuthorID = Author.AuthorID \n SELECT ISBN, DueDate, Username, Borrowing.UserID FROM Borrowing JOIN Users ON Borrowing.UserID = Users.UserID", function(err, rowCount) {
        if (err) {
          console.log(err);
        } else {
          console.log(rowCount + ' rows');
          // and we close the connection
          connection.close()
        }
      });

      getGeneral.on('row', function(columns) {
        let tempArray = []
        columns.forEach(function(column) {
        //   console.log(column.value);
          tempArray.push(column.value)
        });
        console.log(tempArray)

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
        tempArray = []
        console.log(books)
    });


    connection.execSql(getGeneral);
    res.send(message);
});

console.log(books)
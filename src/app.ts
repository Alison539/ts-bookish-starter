import express from 'express';
import 'dotenv/config';
import {AllBooks} from './book2'

const passport = require('passport');
require('./passport')
require('./auth');



import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { json } from 'stream/consumers';

//INITAL CONNECTION
var Request = require('tedious').Request;
var Connection = require('tedious').Connection;
var jwt = require('jsonwebtoken')

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
app.use('/books', passport.authenticate('jwt', {session: false}), bookRoutes);
app.use('/login', bookRoutes);
//app.use('/auth', auth);


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


    // TO CHANGE
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

app.get('/login', (req, res) => {
  //let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  checkCredentials("Johnnie4","Beach12",res);
})

function checkCredentials(username,password,res){
  let checkAuthenticate = new Request("SELECT Passwords FROM Logins WHERE Usernames = '" + username + "' AND Passwords = '" + password + "'",  function(err, rowCount,rows) {
    if (err) {
      return res.status(400).json({
        message: 'Something is not right',
        user   : false
    });
    } else {
      connection.close()
      if(rowCount === 0){
        return res.status(400).json({
          message: "Incorrect username/password",
          user   : false
        });
      }
      else{
        const token = jwt.sign(username, 'super secret');
        return res.json({username, token});
        res.send("Correct username and password")
      }
      // and we close the connection
      
    }
  });
  connection.execSql(checkAuthenticate)
}
export function confirmCredentials(username,password){
  let checkAuthenticate = new Request("SELECT Passwords FROM Logins WHERE Usernames = " + username + "AND Passwords = " + password,  function(err, rowCount,rows) {
    if (err) {
      console.log( err)
      return false;
    } else {
      // and we close the connection
      connection.close()
      if(rowCount === 0){
       return false;
      }
      else{
        return true;
      }
      return false;
      
    }
  });
  connection.execSql(checkAuthenticate)
  //return true;
}


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



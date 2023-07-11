import express from 'express';
import 'dotenv/config';
import {AllBooks} from './book2'

const passport = require('passport');
require('./passport')
require('./auth');
var jwt = require('jsonwebtoken')
const port = process.env['PORT'] || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));

import { Sequelize, DataTypes } from 'sequelize';


import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { json } from 'stream/consumers';
import { get } from 'http';
import { timeStamp } from 'console';

//INITIAL CONNECTION
// Passing parameters separately (other dialects)
const sequelize = new Sequelize('bookish', 'bookishUser', 'bookishPassword!14', {
    host: 'localhost',
    dialect: 'mssql'
});


//testing the connection
async function testConnection(){
 try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();

//Logins model
const Logins = sequelize.define('Logins', {
  // Model attributes are defined here
  Usernames: {
    type: DataTypes.STRING,
  },
  Passwords: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true,
  timestamps: false
});
Logins.removeAttribute('id');
console.log(Logins === sequelize.models.Logins);


//Book model
const Book = sequelize.define('Book', {
  // Model attributes are defined here
  Title: DataTypes.STRING,
  ISBN: DataTypes.STRING,
  numberOfCopies: DataTypes.INTEGER

}, {
  freezeTableName: true,
  timestamps: false
});
Book.removeAttribute('id');
console.log(Book === sequelize.models.Book);


//Author model
const Author = sequelize.define('Author', {
  // Model attributes are defined here
  AuthorID: DataTypes.STRING,
  AuthorName: DataTypes.STRING,
}, {
  freezeTableName: true,
  timestamps: false
});
Author.removeAttribute('id');
console.log(Author === sequelize.models.Author);


//Wrote model
const Wrote = sequelize.define('Wrote', {
  // Model attributes are defined here
  AuthorID: DataTypes.STRING,
  ISBN: DataTypes.STRING,
 }, {
  freezeTableName: true,
  timestamps: false
});
Wrote.removeAttribute('id');
console.log(Wrote === sequelize.models.Wrote);


//Creating dependencies
//Author.Wrote


(async () => {
  await sequelize.sync();
  async function gettingInfo(){
    const users = await Logins.findAll();
    console.log(users.every(user => user instanceof Logins)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
  }
  gettingInfo();
  
})();




app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
app.use('/login', bookRoutes);
app.use('./addBook', bookRoutes);
//app.use('/auth', auth);


//configuration for login


app.get('/login', (req, res) => {
  //let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  checkCredentials("Johnnie4","Beach12",res);
})


async function checkCredentials(username,password,res){
  const login = await Logins.findAll({
    where:{
      Usernames: username
    }
  });
  if (login.length === 0){
    return res.status(400).json({
      message: "Incorrect username/password",
      user   : false
    });
  }
  else{
    const token = jwt.sign({username: username}, 'super secret');
    return res.json({username, token});
  }
}



//BOOKS ENDPOINT TO RETURN ALL BOOKS
app.get('/books', passport.authenticate('jwt', {session: false}), 
  async function (req, res) {
    const bookDetails = await Book.findAll(
      {
        attributes:['ISBN', 'Title', 'numberOfCopies']
      }
    );
    res.send(JSON.stringify(bookDetails,null,2));

     
        // var books = new AllBooks();
 
        //   //temp array stores the contents of a row (a record from the returned query)
        //   let tempArray = []
        //   columns.forEach(function(column) {
        //     tempArray.push(column.value)
        //   });
      
        //   let numberItems = tempArray.length
        //   if (numberItems == 3){
        //       //it is the general (ISBN Title numberofCopies)
        //       books.newBook(tempArray)
        //   }
        //   else if (numberItems == 2){
        //       //it is an author
        //       books.setAuthors(tempArray)
        //   }
        //   else if (numberItems == 4){
        //     //its about an unavailable book
        //       books.setUnavailable(tempArray)
      
        //   }   
        
      });
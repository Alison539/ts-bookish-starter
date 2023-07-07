// import express from 'express';
// import 'dotenv/config';
// import {AllBooks} from './book2'

// import healthcheckRoutes from './controllers/healthcheckController';
// import bookRoutes from './controllers/bookController';

// const port = process.env['PORT'] || 3000;

// var books = new AllBooks();
// var authors = {}
// var dueDates = {}


// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.listen(port, () => {
//     return console.log(`Express is listening at http://localhost:${port}`);
// });

// /**
//  * Primary app routes.
//  */
// app.use('/healthcheck', healthcheckRoutes);
// app.use('/books', bookRoutes);

// //INITAL CONNECTION
// var Request = require('tedious').Request;
// var Connection = require('tedious').Connection;

// //configuration for login
// var config = {
//   server: "localhost", 
//   options: {
//     database: 'bookish',
//     port: 1433,
//     trustServerCertificate: true
//   },
//   authentication: {
//     type: "default",
//     options: {  
//       userName: "bookishUser",
//       password: "bookishPassword!14",
//     }
//   }
// };

// var connection = new Connection(config);
// connection.on('connect', function(err) {
//     if(err) {
//       console.log('Error: ', err)
//     }
//     // If no error, then good to go...
    
//   });
// connection.connect();

// //BOOKS ENDPOINT TO RETURN ALL BOOKS
// app.get('/books', (req, res) => {
//     let message = []
    

//     let getGeneral = new Request("SELECT ISBN, Title, numberOfCopies FROM Book", function(err, rowCount) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(rowCount + ' rows');
//           // and we close the connection
//           connection.close()
//         }
//       });

//       getGeneral.on('row', function(columns) {
//         let tempArray = []
//         columns.forEach(function(column) {
//         //   console.log(column.value);
//           tempArray.push(column.value)
//         });
//         console.log(tempArray)
//         let isbn = books.newBook(tempArray)
//         isbns.push(isbn);
//         tempArray = []
//         console.log(books)
//     });
//     connection.execSql(getGeneral);

//     for (let index = 0; index < isbns.length; index++) {
//         const element = array[index];
        
//     }

//     res.send(message);
// });

// //CREATING SQL QUERIES
// function getAuthorsQuery(isbn){
//     let getAuthors = new Request("SELECT AuthorName FROM Author JOIN Wrote ON Wrote.AuthorID = Author.AuthorID WHERE Wrote.ISBN = " + isbn, function(err, rowCount) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(rowCount + ' rows');
//           // and we close the connection
//           connection.close()
//         }
//       });
//       getAuthors.on('row', function(columns) {
//         let tempArray = []
//         columns.forEach(function(column) {
//         //   console.log(column.value);
//           tempArray.push(column.value)
//         });
//         console.log(tempArray)
//         books.setAuthors(tempArray)
//         tempArray = []
        
//     });

// }

// function getUnavailablesQuery(isbn) {
//     let getUnavailables = new Request("SELECT AuthorName FROM Author JOIN Wrote ON Wrote.AuthorID = Author.AuthorID WHERE Wrote.ISBN = " + isbn , function(err, rowCount) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(rowCount + ' rows');
//           // and we close the connection
//           connection.close()
//         }
//       });
//       getUnavailables.on('row', function(columns) {
//         let tempArray = []
//         columns.forEach(function(column) {
//         //   console.log(column.value);
//           tempArray.push(column.value)
//         });
//         console.log(tempArray)
//         books.setUnavailable(tempArray)
//         tempArray = []
        
//     });
// }
// console.log(books)
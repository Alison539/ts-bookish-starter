class Book {
    ISBN;
    title;
    availableCopies;
    totalCopies;
    unavailable;
    authors;

    constructor(message) {
        //message is going to be an array of all the values fetched from the database
        this.ISBN = message[0]
        this.title = message[1]
        this.availableCopies = message[2]
        this.totalCopies = message[3]
    }

    setAuthors(authors){
        this.authors = authors;
    }
    setUnavailable(unavailable){
        this.unavailable = unavailable;
    }
}

// allBooks

// addBook(tempArray){

// }
// //SQL get general

// //SQL get unavailables
// SELECT dueDate, username 
// FROM Borrowing
// JOIN Users ON Borrowing.UserID = Users.UserID
// WHERE ISBN = 'isbn'

// //SQL get author info
// SELECT AuthorName
// FROM Author
// JOIN Wrote ON Wrote.AuthorID = Author.AuthorID
// WHERE Wrote.ISBN = 'isbn'


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
        this.totalCopies = message[2]
    }

    setAuthors(authors){
        this.authors = authors;
    }
    setUnavailable(unavailable){
        this.unavailable = unavailable;
        this.availableCopies = this.totalCopies - this.unavailable.length
    }
}

<<<<<<< HEAD
class AllBooks {
    books;

    newBook(generalInfo){
        let bookToAdd = new Book(generalInfo);
        this.books.push(bookToAdd);
        return(generalInfo[0]);
    }
=======
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
>>>>>>> 08edd5c2d9ac18761cc63ea993fbff9ec20f75e6

    setAuthors(authorInfo){
        let bookToChange = this.books[this.books.length - 1];
        bookToChange.setAuthors(authorInfo);
    }
    setUnavailable(unavailableInfo){
        let bookToChange = this.books[this.books.length - 1];
        bookToChange.setAuthors(unavailableInfo);
    }
}
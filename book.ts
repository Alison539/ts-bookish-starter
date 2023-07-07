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

    changeAuthors(authors){
        this.authors = authors;
    }
    changeUnavailable(unavailable){
        this.unavailable = unavailable;
        this.availableCopies = this.totalCopies - this.unavailable.length
    }
}

class AllBooks {
    books;

    newBook(generalInfo){
        let bookToAdd = new Book(generalInfo);
        this.books.push(bookToAdd);
        return(generalInfo[0]);
    }

    setAuthors(authorInfo){
        let bookToChange = this.books[this.books.length - 1];
        bookToChange.changeAuthors(authorInfo);
    }
    setUnavailable(unavailableInfo){
        let bookToChange = this.books[this.books.length - 1];
        bookToChange.changeUnavailable(unavailableInfo);
    }
}
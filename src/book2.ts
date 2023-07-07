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
        this.availableCopies = this.totalCopies
        // this.authors = [];
        // this.unavailable = [];
        this.authors = "";
        this.unavailable = "";
    }

    changeAuthors(author){
       // this.authors.push(author)
       this.authors += author
    }
    changeUnavailable(unavailable){
        //this.unavailable.push(unavailable);
        this.unavailable += unavailable
        //updating the number of available books
        this.availableCopies -= 1
    }
}

export class AllBooks {
    books;

    constructor(){
        this.books = {};
    }

    newBook(generalInfo){
        let bookToAdd = new Book(generalInfo);
        let isbn = generalInfo[0];
        this.books[isbn] = bookToAdd;
    }

    setAuthors(authorInfo){
        let isbn = authorInfo[0]
        let author = authorInfo[1]
        let bookToChange = this.books[isbn];
        bookToChange.changeAuthors(author);
    }

    setUnavailable(unavailableInfo){
        let isbn = unavailableInfo[0]
        let dueDate = unavailableInfo[1]
        let userName = unavailableInfo[2]
        let bookToChange = this.books[isbn];
        bookToChange.changeUnavailable([dueDate,userName]);
    }
}
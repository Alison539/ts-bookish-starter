CREATE TABLE Book (
    Title varchar(255),
    ISBN varchar(255),
    numberOfCopies int,
    PRIMARY KEY(ISBN)
);


CREATE TABLE Author (
     AuthorID varchar(255),
     AuthorName varchar(255),
     PRIMARY KEY(AuthorID)
);

CREATE TABLE Wrote (
    AuthorID varchar(255),
    ISBN varchar(255),
    PRIMARY KEY (AuthorID, ISBN),
    FOREIGN KEY (ISBN) REFERENCES Book(ISBN),
    FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID)
);

CREATE TABLE Users (
    UserID int,
    Username varchar(255),
    PRIMARY KEY (UserID)
);

CREATE TABLE Borrowing (
    ID int,
    ISBN varchar(255), 
    UserID int,
    DueDate date,
    PRIMARY KEY (ID),
    FOREIGN KEY (ISBN) REFERENCES Book(ISBN),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

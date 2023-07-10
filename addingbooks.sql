INSERT INTO Author (AuthorID, AuthorName)
VALUES ('A1231', 'Tara Ka');
INSERT INTO Author (AuthorID, AuthorName)
VALUES ('A1232', 'Alison Da');

INSERT INTO Book (Title, ISBN, numberOfCopies)
VALUES ('Databases with Tara', '0103652000', 6);
INSERT INTO Book (Title, ISBN, numberOfCopies)
VALUES ('Databases with Alison', '0103652001', 6);

INSERT INTO Wrote(AuthorID, ISBN)
VALUES ('A1231','0103652000');
INSERT INTO Wrote(AuthorID, ISBN)
VALUES ('A1232','0103652001');

INSERT INTO Users(UserID, Username)
VALUES (1,'Johnnie Snough');
INSERT INTO Borrowing(ID, ISBN, UserID, DueDate)
VALUES (1, '0103652001', 1, '2023-07-08');

INSERT INTO Logins(Usernames, Passwords)
VALUES ('Fluffy23', 'Bunny64');
INSERT INTO Logins(Usernames, Passwords)
VALUES ('Johnnie4', 'Beach12')
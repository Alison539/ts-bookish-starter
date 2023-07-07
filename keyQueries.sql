--SQL get general
SELECT ISBN, Title, numberOfCopies FROM Book

\n SELECT ISBN, AuthorName FROM Wrote 
JOIN Wrote ON Wrote.AuthorID = Author.AuthorID 



\n SELECT ISBN, DueDate, Username, Users.UserID FROM Borrowing JOIN Users ON Borrowing.UserID = Users.UserID




--SQL get unavailables
SELECT dueDate, username 
FROM Borrowing
JOIN Users ON Borrowing.UserID = Users.UserID
WHERE ISBN = 'isbn'

--SQL get author info
SELECT AuthorName
FROM Author
JOIN Wrote ON Wrote.AuthorID = Author.AuthorID
WHERE Wrote.ISBN = 'isbn'
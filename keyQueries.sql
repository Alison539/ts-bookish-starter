--SQL get general
SELECT ISBN, Title, numberOfCopies FROM Book

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

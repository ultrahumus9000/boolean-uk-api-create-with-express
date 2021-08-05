const db = require("../../utils/database");
const { buildBooksDatabase } = require("../../utils/mockData");

function Book() {
  function createTable() {
    const sql = `
      DROP TABLE IF EXISTS pets;
      CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL,
        publicationDate DATE           NOT NULL
      );
    `;

    db.query(sql)
      .then((result) => console.log("[DB] Book table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const books = buildBooksDatabase();

    books.forEach((book) => {
      db.query(createBook, Object.values(book)).catch(console.error);
    });
  }

  function createOneBook(newBook, callback) {
    const { title, type, author, topic, publicationDate } = newBook;
    const createOneBook = `
    INSERT INTO books (title, type, author, topic, publicationDate)
    VALUES
      ($1, $2, $3, $4, $5)
      RETURNING * ;
    `;
    db.query(createOneBook, [title, type, author, topic, publicationDate])
      .then((result) => {
        console.log(result.rows);
        callback(result.rows);
      })
      .catch((error) => console.error(error));
  }

  function findOneBook(bookId, callback) {
    const findBook = `SELECT * FROM books WHERE id = ($1);`;
    db.query(findBook, [bookId]).then((result) => callback(result.rows[0]));
  }

  function deleteOneBook(bookId, callback) {
    const deleteBook = ` DELETE FROM books WHERE id = ($1);`;
    db.query(deleteBook, [bookId]).then(() => callback());
  }

  function findAllBooks(callback) {
    const findAllSQL = `SELECT * FROM books;`;
    db.query(findAllSQL).then((result) => {
      callback(result.rows);
    });
  }

  function searchBooks(search, callback) {
    const searchSQL = `SELECT * FROM books WHERE title LIKE $1 OR type = $1 OR author LIKE $1 OR topic =$1;`;
    db.query(searchSQL, [`%${search}%`]).then((result) =>
      callback(result.rows)
    );
  }

  function updateBook(bookId, updateContent, callback) {
    console.log("updateContent", updateContent);
    const { title, type, author, topic, publicationDate } = updateContent;
    const updateSQL = `UPDATE books SET title=$2,type=$3,author=$4,topic=$5,publicationDate=$6 WHERE id = $1 RETURNING *;`;
    db.query(updateSQL, [bookId, title, type, author, topic, publicationDate])
      .then((result) => callback(result.rows[0]))
      .catch(console.error);
  }

  createTable();
  mockData();
  return {
    createOneBook,
    findOneBook,
    findAllBooks,
    searchBooks,
    deleteOneBook,
    updateBook,
  };
}

module.exports = Book;

// api could be built by us but we might not be the one who build the front end therefore we must have handling error code
// can put error in callback function by giving 2 paramters

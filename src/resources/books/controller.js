// No need to import the Book model just the db

const book = require("./model");

const {
  createOneBook,
  findOneBook,
  findAllBooks,
  searchBooks,
  deleteOneBook,
  updateBook,
} = book();

function getAllBooksDB(req, res) {
  let searchRequest = req.query.search;
  if (searchRequest) {
    searchBooks(searchRequest, (searchInfo) => {
      res.json(searchInfo);
    });
  } else {
    findAllBooks((allBooks) => {
      res.json({ books: allBooks });
    });
  }
}

function getOneBooksDB(req, res) {
  let bookId = Number(req.params.id);
  findOneBook(bookId, (book) => {
    res.json({ book });
  });
}

function postOneBooksDB(req, res) {
  const newBook = req.body;
  createOneBook(newBook, (book) => {
    res.json(book);
  });
}

function updateOneBooksDB(req, res) {
  let bookId = Number(req.params.id);
  findOneBook(bookId, (book) => {
    const updatedBook = { ...book, ...req.body };
    updatedBook.publicationDate = updatedBook.publicationdate;
    delete updatedBook.publicationdate;
    console.log("updatedBook", updatedBook);
    updateBook(bookId, updatedBook, (updatedBookInfo) => {
      res.json(updatedBookInfo);
    });
  });
}

function deleteOneBookDB(req, res) {
  let bookId = Number(req.params.id);
  deleteOneBook(bookId, () => {
    res.json(`book infomation is deleted`);
  });
}

module.exports = {
  getAllBooksDB,
  getOneBooksDB,
  postOneBooksDB,
  updateOneBooksDB,
  deleteOneBookDB,
};

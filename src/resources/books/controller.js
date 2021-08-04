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

function getOneBooksDB() {}
function postOneBooksDB() {}
function updateOneBooksDB() {}

module.exports = {
  getAllBooksDB,
  getOneBooksDB,
  postOneBooksDB,
  updateOneBooksDB,
};

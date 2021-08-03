const express = require("express");
const book = require("./model");

const { createOneBook, findOneBook, findAllBooks, searchBooks, deleteOneBook } =
  book();

const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
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
});

bookRouter.get("/:id", (req, res) => {
  let bookId = Number(req.params.id);
  findOneBook(bookId, (book) => {
    res.json({ book });
  });
});

bookRouter.post("/", (req, res) => {
  const newBook = req.body;
  createOneBook(newBook, (book) => {
    res.json(book);
  });
});

bookRouter.delete("/:id", (req, res) => {
  let bookId = Number(req.params.id);
  deleteOneBook(bookId, () => {
    res.json(`book infomation is deleted`);
  });
});

module.exports = bookRouter;

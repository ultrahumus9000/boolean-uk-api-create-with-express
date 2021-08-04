const express = require("express");
const bookRouter = express.Router();

const {
  getAllBooksDB,
  getOneBooksDB,
  postOneBooksDB,
  updateOneBooksDB,
} = require("./controller");

bookRouter.get("/", getAllBooksDB);

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

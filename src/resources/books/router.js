const express = require("express");
const bookRouter = express.Router();

const {
  getAllBooksDB,
  getOneBooksDB,
  postOneBooksDB,
  updateOneBooksDB,
  deleteOneBookDB,
} = require("./controller");

bookRouter.get("/", getAllBooksDB);

bookRouter.get("/:id", getOneBooksDB);

bookRouter.post("/", postOneBooksDB);

bookRouter.delete("/:id", deleteOneBookDB);

bookRouter.patch("/:id", updateOneBooksDB);

module.exports = bookRouter;

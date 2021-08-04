const { json } = require("body-parser");
const express = require("express");
const petRouter = express.Router();
const Pet = require("../pets/model");

const {
  createOnePet,
  findOnePet,
  deletePet,
  findAllPets,
  searchPets,
  updateOnePet,
} = Pet();

petRouter.get("/", (req, res) => {
  findAllPets((allPets) => {
    res.json(allPets);
  });
});

petRouter.get("/search", (req, res) => {
  let search = req.query.search;
  let searchData = Number(search);
  if (isNaN(searchData)) {
    searchPets(search, (result) => {
      res.json(result);
    });
  } else {
    searchPets(searchData, (result) => {
      res.json(result);
    }).catch((error) => res.json(error));
  }
});

petRouter.get("/:id", (req, res) => {
  findOnePet(Number(req.params.id), (onePet) => {
    res.json(onePet);
  });
});

petRouter.post("/", (req, res) =>
  createOnePet(req.body).then((result) => res.json({ result }))
);

petRouter.delete("/:id", (req, res) => {
  deletePet(Number(req.params.id)).then(() => {
    res.json("deleted");
  });
});

petRouter.patch("/:id", (req, res) => {
  let updateId = Number(req.params.id);
  updateOnePet(updateId, res.body).then(() => {
    findOnePet(updateId, (onePet) => {
      res.json(onePet);
    });
  });
});

module.exports = petRouter;

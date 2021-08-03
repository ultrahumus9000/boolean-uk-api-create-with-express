const express = require("express");
const petRouter = express.Router();

petRouter.get("/", (req, res) => {});

petRouter.get("/:id", (req, res) => {});

petRouter.post("/", (req, res) => {});

petRouter.delete("/:id", (req, res) => {});

module.exports = petRouter;

const db = require("../../utils/database");
const { buildAnimalDatabase } = require("../../utils/mockData");

function Pet() {
  function createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `;

    db.query(sql)
      .then((result) => console.log("[DB] Pet table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createPet = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5);
    `;

    const pets = buildAnimalDatabase();

    pets.forEach((pet) => {
      db.query(createPet, Object.values(pet));
    });
  }

  async function createOnePet(newPet) {
    const newPetSQL = `INSERT INTO pets
    (name, age, type, breed, microchip)
  VALUES
    ($1, $2, $3, $4, $5)
     RETURNING *;`;
    const result = await db.query(newPetSQL, Object.keys(newPet));
    return result.rows;
  }
  function findOnePet(petId, callback) {
    const petSQL = `SELECT * FROM pets WHERE id =($1)`;
    db.query(petSQL, [petId]).then((result) => {
      callback(result);
    });
  }

  function deletePet(petId) {
    const petSQL = `DELETE FROM pets WHERE id =($1)`;
    db.query(petSQL, [petId]);
  }

  function findAllPets(callback) {
    const allPetsSQL = `SELECT * FROM pets;`;
    db.query(allPetsSQL)
      .then((result) => {
        callback(result.rows);
      })
      .catch((error) => console.error(error));
  }

  function searchPets(search, callback) {
    const searchSQL = `SELECT * FROM pets WHERE name LIKE $1;`;
    return db
      .query(searchSQL, [`%${search}%`])
      .then((result) => {
        callback(result.rows);
      })
      .catch((error) => console.error("error", error));
  }

  async function updateOnePet(updateId, updateContent) {
    const updateSQL = `UPDATE pets SET name = $1 WHERE id = $2 RETURNING *;`;
    const result = await db.query(updateSQL, [updateContent.name, updateId]);

    try {
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  createTable();
  // mockData();
  return {
    createOnePet,
    findOnePet,
    deletePet,
    findAllPets,
    searchPets,
    updateOnePet,
  };
}

module.exports = Pet;

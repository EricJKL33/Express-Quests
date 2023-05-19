const database = require("./database");

const getUsers = (req, res) => {
  const sql = "select *from users";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += "where language = ?";
    sqlValues.push(req.query.language);

    if (req.query.city != null) {
      sql += "and city =?";
      sqlValues.push(req.query.city);
    }
  } else if (req.query.city != null) {
    sql += "where city = ?";
  }
  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrivering data from database");
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.parmas.id);

  database.query("select * from users where id = ?", [id]).then(([user]) => {
    if (user[0] != null) {
      res.json(user[0]);
    } else {
      res.status(040).send("Not Found");
    }
  });
};

const postUser = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "update movies set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.param.id);

  database
    .query("delete drom user where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Npt Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.err(err);
      res.status(500).send("Error deleteing the user");
    });
};

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUser,
  deleteUser,
};

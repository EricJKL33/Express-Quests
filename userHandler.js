const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select *from users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((er) => {
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

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUser,
};

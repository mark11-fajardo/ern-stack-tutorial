const express = require("express");
const cors = require("cors");
const db = require("./db/connection");
const path = require("path");

const app = express();

const whiteListDomain = ["http://localhost:5000", "http://localhost:3000"];

// Middleware
app.use(cors({ origin: whiteListDomain }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware Static Build Folder
app.use(express.static(path.join(__dirname, "../../frontend/build")));

/* Route for Client */
app.get("*", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

const PORT = process.env.PORT || 3001;

const { getUsers, createUser, updateUser, deleteUser } = db;

app.post("/users/list", (req, res) => {
  const users = getUsers();
  res.send({ records: users });
});

app.post("/users", (req, res) => {
  const { name, age } = req.body;
  const result = createUser({ name, age });

  if (result) {
    res.status(200).send({ success: result, message: "Successfully created!" });
  } else {
    res.status(500).send({ success: result, message: "Create Failed!" });
  }
});

app.put("/users", (req, res) => {
  const { updateId, updateName, updateAge } = req.body;
  const result = updateUser({ updateId, updateName, updateAge });
  const message = result ? "Successfully updated!" : "Update failed";

  if (result) {
    res.status(200).send({ success: result, message });
  } else {
    res.status(500).send({ success: result, message });
  }
});

app.delete("/users", (req, res) => {
  const deleteId = req.query.deleteId;
  const result = deleteUser(deleteId);
  const message = result ? "Successfully deleted!" : "Delete failed";

  if (result) {
    res.status(200).send({ success: result, message });
  } else {
    res.status(500).send({ success: result, message });
  }
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

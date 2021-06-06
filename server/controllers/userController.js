const con = require("../utils/database");

// CREATE
exports.insertUser = async (req, res) => {
  let currentUser = req.body;

  let user = await con.execute(`INSERT INTO age(name,mail,phone,age) VALUES ('${currentUser.name}', '${currentUser.mail}', '${currentUser.phone}', ${currentUser.age});`);
  user = user[0];
  res.send(user);
};

// READ
exports.getUsersFromDb = async (req, res) => {
  let printByOBJ = req.body;
  let sortStatus = printByOBJ.sortBy;

  let whichOrder = req.body.sortBy === "AtoZ" ? "ASC" : "DESC";
  let whichColumn = sortStatus === "AtoZ" || sortStatus === "ZtoA" ? "name" : sortStatus === "created" ? "createdTime" : "updateTime";

  let users = await con.execute(`SELECT * FROM age WHERE isDeleted = 0 AND ${req.body.typeToFilterBy} LIKE '%${req.body.searchBy}%' ORDER BY ${whichColumn} ${whichOrder}  `);
  //   users = users[0];
  res.send(users[0]);
};

// READ (all deleted users)
exports.getDeletedUsersFromDb = async (req, res) => {
  let users = await con.execute(`SELECT * FROM age WHERE isDeleted = 1`);
  //   users = users[0];
  res.send(users[0]);
};

// UPDATE (edit user)
exports.updateUsersFromDb = async (req, res) => {
  let editedUser = req.body;

  let users = await con.execute(`UPDATE age SET name='${editedUser.name}', mail='${editedUser.mail}', phone='${editedUser.phone}', age='${editedUser.age}'  WHERE id=${editedUser.id}`);
  res.send(users[0]);
};

// UPDATE (delete only from user view)
exports.updateDeleteUsers = async (req, res) => {
  let userId = req.body;

  let users = await con.execute(`UPDATE age SET isDeleted=1 WHERE id=${userId.id}`);
  res.send(users[0]);
};

// DELETE from database
exports.deletePermanentlyUserFromDb = async (req, res) => {
  let userId = req.body;

  let users = await con.execute(`DELETE FROM age WHERE id=${userId.id}`);
  res.send(users[0]);
};

// UPDATE (restore user)
exports.restoreUser = async (req, res) => {
  let userId = req.body;

  let users = await con.execute(`UPDATE age SET isDeleted=0  WHERE id=${userId.id}`);
  res.send(users[0]);
};

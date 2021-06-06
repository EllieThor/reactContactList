const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/insertUser", userController.insertUser);
router.post("/getUsersFromDb", userController.getUsersFromDb);
router.post("/getDeletedUsersFromDb", userController.getDeletedUsersFromDb);
router.post("/updateUsersFromDb", userController.updateUsersFromDb);
router.post("/updateDeleteUsers", userController.updateDeleteUsers);
router.post("/deletePermanentlyUserFromDb", userController.deletePermanentlyUserFromDb);
router.post("/restoreUser", userController.restoreUser);

module.exports = router;

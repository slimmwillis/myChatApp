const express = require("express")
const { register, login, getAllUsers, getUser } = require("../Controllers/userController")
const router = express.Router()

router.post("/register", register)

router.post("/login", login)

router.get("/getAllUsers", getAllUsers)

router.get("/getUser/:id", getUser)

router.delete("/deleteUser/:id")

router.post('/updateUser/:id')


module.exports = router;

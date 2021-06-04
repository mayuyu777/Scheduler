const express = require("express");
const router  = express.Router();
const accountController = require("../controller/accountController");
const noteController = require("../controller/noteController");


router.get("/",accountController.checkauth);
router.get("/login",accountController.showlogin);
router.get("/register",accountController.showregister);
router.post("/signin",accountController.signin);
router.post("/create_account",accountController.createAccount);
router.post("/addEvent",noteController.addEvent);
router.get("/home",noteController.home);





module.exports = router;
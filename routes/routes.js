const express = require("express");
const router  = express.Router();
const accountController = require("../controller/accountController");
const noteController = require("../controller/noteController");


router.get("/",accountController.checkauth,accountController.home);
router.get("/login",accountController.showlogin);
router.get("/register",accountController.showregister);
router.post("/signin",accountController.signin);
router.post("/create_account",accountController.createAccount);
router.post("/addEvent",noteController.addEvent);
router.post("/updateEvent",noteController.updateEvent);
router.post("/deleteEvent",noteController.deleteEvent);
router.post("/updateAccount",accountController.updateAccount);
router.get("/home/:date",accountController.checkauth,noteController.home);
router.get("/logout",accountController.logout);
router.get("/profile",accountController.checkauth,accountController.profile);
router.get("/home",accountController.checkauth,noteController.home);





module.exports = router;
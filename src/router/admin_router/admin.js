const express = require("express");
require("dotenv").config();
const { adminSignupValidator } = require("../../model/admin_model/adminValidation")
const router = express.Router();
const {
  add_admin,
} = require("../../controller/admin_controller/admin-register");
const {
  getAdminDetails,
  updateAdmin,
  deleteAdmin,
} = require("../../controller/admin_controller/admin-details");
const { sign_in } = require("../../controller/admin_controller/sign-in");
const auth = require("../../middleware/auth_token");
const {
  approve_user,
  reject_user,
} = require("../../controller/admin_controller/user-approval");
const { authorizeAdmin } = require("../../middleware/authorizeAdmin");

router.post("/register", adminSignupValidator, authorizeAdmin, add_admin);
router.get("/details", getAdminDetails);
router.put("/update-admin", auth, authorizeAdmin, updateAdmin);
router.delete("/delete-admin", auth, authorizeAdmin, deleteAdmin);
router.post("/sign-in", auth, sign_in);
router.patch("/approve-user", auth, authorizeAdmin, approve_user);
router.patch("/reject-user", auth, authorizeAdmin, reject_user);

module.exports = router;

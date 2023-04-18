const express = require("express");
const { userSignupValidator } = require("../../model/user_model/userValidation")
const router = express.Router();
const {
  register,
  sign_up,
} = require("../../controller/user_controller/user-register");
const { sign_in } = require("../../controller/user_controller/user-signin");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateKYC,
} = require("../../controller/user_controller/users");
const auth = require("../../middleware/auth_token")
const { listDareByFriends, previousDatePendingDare } = require("../../controller/user_controller/dare")
const { sendmail } = require('../../middleware/taskUpdateJob')
const { sending_main } = require("../../controller/user_controller/mail")
const { add_friend, add_dare, updateCompletedStatus, deleteDare, updateDare } = require("../../controller/user_controller/add_dare")

router.post("/register", userSignupValidator, register);
router.post("/sign-up", auth, sign_up);
router.post("/sign-in", auth, sign_in);
router.get("/get-users", getUsers);
router.get("/get-user-by-id", auth, getUserById);
router.put("/update-user", auth, updateUser);
router.delete("/delete-user", auth, deleteUser);
router.patch("/update-kyc", auth, updateKYC);
router.post("/add-friend", auth, add_friend)
router.post("/add-dare", auth, add_dare)
router.patch('/update-dare-status', updateCompletedStatus)
router.delete('/delete-dare', auth, deleteDare)
router.patch('/update-dare', auth, updateDare)
router.get('/list-dare-by-friend', auth, listDareByFriends)
router.get('/previous-date-pending-dare', previousDatePendingDare);
router.get('/send-mail', sendmail)
router.get('/sending-main', sending_main)

module.exports = router;

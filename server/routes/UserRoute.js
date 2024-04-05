const express = require("express");
const router = express.Router();
const { allowTo, protect } = require("../controllers/AuthController");
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  changeUserPassword,
  getUserLoggedIn,
  updateUserLoggedIn,
  updateUserPasswordLoggedIn
} = require("../controllers/UserController");

router.use(protect)

router.get('/getMe', getUserLoggedIn, getUserById)
router.put('/changeMyPassword', updateUserPasswordLoggedIn)
router.put('/updateMe', updateUserLoggedIn)

router.use(allowTo('admin'))
router.put('/changePassword/:id', changeUserPassword)
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById)


module.exports = router;

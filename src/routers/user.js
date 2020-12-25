const express = require('express');
const { authenticate, authorize } = require('../middleware/guard');

const {
    createUser,
    readUsers,
    readUser,
    updateUser,
    deleteUser
} = require('../controllers/user');

const router = express.Router();
// router.use(authenticate);
// router.use(authorize('admin'));

router.route('/')
    .post(authenticate, authorize('admin'), createUser)
    .get(authenticate, authorize('admin'), readUsers);

router.route('/:id')
    .get(authenticate, authorize('admin'), readUser)
    .patch(authenticate, authorize('admin'), updateUser)
    .delete(authenticate, authorize('admin'), deleteUser);

module.exports = router;
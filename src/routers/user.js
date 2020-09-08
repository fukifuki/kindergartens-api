const express = require('express');
const { authenticate } = require('../middleware/guard');

const {
    createUser,
    readUsers,
    readUser,
    updateUser,
    deleteUser
} = require('../controllers/user');


const router = express.Router();

router.route('/')
    .post(authenticate, createUser)
    .get(authenticate, readUsers);

router.route('/:id')
    .get(authenticate, readUser)
    .patch(authenticate, updateUser)
    .delete(authenticate, deleteUser);

module.exports = router;
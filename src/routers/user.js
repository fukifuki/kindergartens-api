const express = require('express');
const {
    createUser,
    readUsers,
    readUser,
    updateUser,
    deleteUser
} = require('../controllers/user');


const router = express.Router();

router.route('/')
    .post(createUser)
    .get(readUsers);

router.route('/:id')
    .get(readUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
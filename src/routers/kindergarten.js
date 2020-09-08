const express = require('express');
const { authenticate } = require('../middleware/guard');

const {
    createKindergarten,
    readKindergartens,
    readKindergarten,
    updateKindergarten,
    deleteKindergarten
} = require('../controllers/kindergarten');


const router = express.Router();

router.route('/')
    .post(authenticate, createKindergarten)
    .get(readKindergartens);

router.route('/:id')
    .get(readKindergarten)
    .patch(authenticate, updateKindergarten)
    .delete(authenticate, deleteKindergarten);

module.exports = router;

const express = require('express');
const {
    createKindergarten,
    readKindergartens,
    readKindergarten,
    updateKindergarten,
    deleteKindergarten
} = require('../controllers/kindergarten');


const router = express.Router();

router.route('/')
    .post(createKindergarten)
    .get(readKindergartens);

router.route('/:id')
    .get(readKindergarten)
    .patch(updateKindergarten)
    .delete(deleteKindergarten);

module.exports = router;

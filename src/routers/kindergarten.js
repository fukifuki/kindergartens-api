const express = require('express');
const { authenticate, authorize } = require('../middleware/guard');

const {
    createKindergarten,
    readKindergartens,
    readKindergarten,
    updateKindergarten,
    deleteKindergarten
} = require('../controllers/kindergarten');


const router = express.Router();

router.route('/')
    .post(authenticate, authorize('publisher'), createKindergarten)
    .get(readKindergartens);

router.route('/:id')
    .get(readKindergarten)
    .patch(authenticate, authorize('publisher'), updateKindergarten)
    .delete(authenticate, authorize('publisher', 'admin'), deleteKindergarten);

module.exports = router;

const Kindergarten = require('../models/kindergarten');

exports.createKindergarten = async (req, res, next) => {
    const kindergarten = new Kindergarten(req.body);

    try {
        await kindergarten.save();
        res
            .status(201)
            .json( { status: 201, message: 'Kindergarten successfully created' });
    } catch (e) {
        res
            .status(400)
            .json({status: 400, message: e.message })
    }
};

exports.readKindergartens = async (req, res, next) => {
    try {
        const kindergartens = await Kindergarten.find({});
        res
            .status(200).send(kindergartens);
    } catch (e) {
        res
            .status(500)
            .send({ status: 500, message: e.message })
    }
};

exports.readKindergarten = async (req, res, next) => {
    try {
        const kindergarten = await Kindergarten.findById(req.params.id);

        if (!kindergarten) {
            return res
                    .status(404)
                    .send({ status: 404, message: 'Not found' });
        }
        res
            .status(200).send(kindergarten);
    }
    catch (e) {
        res
            .status(500)
            .send({ status: 500, message: e.message });
    }
};

exports.updateKindergarten = async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;

    try {
        const kindergarten = await Kindergarten.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        res
            .status(200)
            .send(kindergarten);
    } catch (e) {
        res
            .status(500)
            .send({ status: 500, message: e.message });
    }
};

exports.deleteKindergarten = async (req, res, next) => {
    try {
        const kindergarten = await Kindergarten.findByIdAndDelete(req.params.id);
        if (!kindergarten) return res.status(404).send({ status: 404, message: 'Not found' });
        res
            .status(200)
            .send({ status: 200, message: `Kindergarten ${kindergarten.name} deleted` });
    } catch (e) {
        res
            .status(500)
            .send({ status: 500, message: e.message });
    }
};
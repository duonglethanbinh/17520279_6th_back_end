const express = require('express');
const router = express.Router();
const Places = require('../models/places');

router.get('/', async (req, res) => {
    try {
        const place = await Places.find();
        res.json(place);
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/', async (req, res) => {
    const place = new Places(
        {
            name: req.body.name,
            image: req.body.image
        }
    );
    try {
        const savePlace = await place.save();
        res.json(savePlace);
    } catch (err) {
        res.json({ message: err })
    }
})

router.patch('/:updateid', async (req, res) => {
    try {
        const updatePlace = await Places.updateOne(
            { _id: req.params.updateid },
            {
                $set: {
                    name: req.body.name,
                    image: req.body.image
                }
            }
        );

        res.json(updatePlace);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
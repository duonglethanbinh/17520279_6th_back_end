const express = require('express');
const router = express.Router();
const Reviews = require('../models/reviews');
const Blogs = require('../models/blogs');

router.get('/', async (req, res) => {
    try {
        const reviews = await Reviews.find();
        res.json(reviews);
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/', async (req, res) => {
    const reviews = new Reviews(
        {
            name: req.body.name,
            image: req.body.image,
            place_id: req.body.place_id
        }
    );
    try {
        const saveReviews = await reviews.save();
        res.json(saveReviews);
    } catch (err) {
        res.json({ message: err })
    }
})

router.patch('/:updateid', async (req, res) => {
    try {
        const updateReviews = await Reviews.updateOne(
            { _id: req.params.updateid },
            {
                $set: {
                    name: req.body.name,
                    image: req.body.image,
                    place_id: req.body.place_id
                }
            }
        );

        res.json(updateReviews);
    } catch (err) {
        res.json({ message: err })
    }
});

//reviews/blog
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blogs.find();
        res.json(blogs);
    } catch (err) {
        res.json({ message: err })
    }
})
router.get("/blogs/:placeId", (req, res, next) => {
    const id = req.params.placeId;
    Blogs.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/blogs', async (req, res) => {
    const blogs = new Blogs(
        {
            name: req.body.name,
            title: req.body.title,
            content: req.body.content
        }
    );
    try {
        const saveBlogs = await blogs.save();
        res.json(saveBlogs);
    } catch (err) {
        res.json({ message: err })
    }
})

router.patch('/blogs/:updateid', async (req, res) => {
    try {
        const updateBlogs = await Blogs.updateOne(
            { _id: req.params.updateid },
            {
                $set: {
                    name: req.body.name,
                    title: req.body.title,
                    content: req.body.content
                }
            }
        );

        res.json(updateBlogs);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
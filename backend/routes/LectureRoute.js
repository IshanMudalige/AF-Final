const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Lecture = require('../models/Lecture');
const authenticate = require('../middleware/authenticate');

//----------------- add new lecture ----------------------
router.post('/create', authenticate, (req, res, next) => {

    const slug = req.body.title.replace(/ /g, '-') +'-'+ Date.now();

    const lecture = new Lecture({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        slug: slug,
        description: req.body.description,
        content:req.body.content,
        category: req.body.category,
        createdBy: req.body.createdBy,
        createdAt: new Date().toISOString()
    });

    lecture.save()
        .then(lecture => {
            res.status(201).json({
                message: lecture
            });
        })
        .catch(er => {
            res.status(500).json({
                error: er
            });
        })

});

//----------------- get all lectures -----------------
router.get('/getAll', (req, res, next) => {

    Lecture.find({})
        .select('_id title description content category createdAt')
        .exec()
        .then(lecture => {
            res.status(200).json({
                message: lecture
            });
        })
        .catch(er => {
            res.status(500).json({
                error: er
            });
        })

});

module.exports = router;
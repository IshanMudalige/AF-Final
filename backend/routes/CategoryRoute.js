const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const mongoose = require('mongoose');

//-----------------Get all categories-----------------
router.get('/getAll', (req, res, next) => {

    Category.find({})
        .select('_id name')
        .exec()
        .then(category => {
            res.status(200).json({
                message: category
            });
        })
        .catch(er => {
            res.status(500).json({
                error: er
            });
        })

});


//---------------- create category-----------------------
router.post('/create', (req, res, next) => {

    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        createdAt: new Date().toISOString()
    });

    category.save()
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

module.exports = router;
const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    createdAt: Date,
});

module.exports = mongoose.model('Category', CategorySchema);
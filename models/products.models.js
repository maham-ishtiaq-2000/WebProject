const mongoose = require('mongoose');
const Joi = require('joi');

const products_schema = new mongoose.Schema(
    {
        url: {
            type: String,
            require: true
        },
    },
    {
        timestamps: true,
    }
);

const Products = mongoose.model('Products', products_schema);
module.exports.Products = Products;


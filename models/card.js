const mongoose = require('mongoose');
const Joi = require('joi');

function cards_validation(card) {
    const joi_cards_schema = Joi.object
        ({
            // user_id: Joi.string().required().min(3).max(120),
            name: Joi.string().required(),
            url: Joi.string().required(),
            
            //  description:Joi.string(),
        })
    return result = joi_cards_schema.validate(card);
}

const cards_schema = new mongoose.Schema
    ({
        card_id: {
            type: mongoose.Schema.Types.ObjectId
        },
        name:
        {
            type: String,
            required: true,
        },
        url:
        {
            type: String,
            required: true,
        },
    })

const Card = mongoose.model('Card', cards_schema);
module.exports.Card = Card;
module.exports.cards_validation = cards_validation;


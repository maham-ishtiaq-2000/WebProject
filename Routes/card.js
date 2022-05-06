const express = require('express');
const Joi = require('joi');
const { cards_validation, Card } = require('../models/card')
const router = express.Router();


//-----     signup     ------//
router.post('/signup', async (req, res) => {
    const result = cards_validation(req.body);
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
    let card = await Card.findOne({ email: req.body.email });
   
    try {
        const new_card = new Card
            ({
                name: req.body.name,
                url: req.body.url,
            })
        const card = await new_card.save();
        return res.json
            ({
                success: true,
                message: "Account registered successfully",
            })
    }
    catch (err) {
        return res.json
            ({
                success: false,
                message: err.message,
            })
    }
})
//-----     login      ------//

router.get('/get_all_cards', async (req, res) => {
    try {
        const get_card = await Card.find()
        if (get_card.length == 0)
            return res.json
                ({
                    success: false,
                    error: "Card does not exist",
                })
        if (get_card.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_card,
                })
    }
    catch (err) {
        res.json({
            success: false,
            message: err
        })
    }

})

module.exports = router;

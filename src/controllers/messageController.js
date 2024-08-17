const telegramService = require('../services/telegramService');
const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
    const { bed, region, minPrice, maxPrice } = req.query;

    try {
        
        const result = await telegramService.searchMessagesByKeyword( bed, region, minPrice,maxPrice);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred while searching messages');
    }
});

module.exports = router;

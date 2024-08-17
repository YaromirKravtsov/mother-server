
const client = require('../config/telegramClient');
const chatIds = require('../constants/chatIds')

async function searchMessagesByKeyword(bed, region, minPrice,maxPrice) {
    try {
        let allMessages = []; 
     
        for (const chatId of chatIds) {
            const chat = await client.getEntity(chatId);
            const messages = await client.getMessages(chat, { limit: 100 });
            allMessages = allMessages.concat(messages); 
        }
        console.log(allMessages)


        const foundMessages = allMessages.filter(msg => {
            if (msg.message) {
                const hasBed = msg.message.includes(bed + " bed");
                const hasRegion = msg.message.includes(region);
           
                const numbers = msg.message.match(/\d+/g);
                const inPriceRange = numbers && numbers.some(num => {
                    const priceValue = parseInt(num, 10);
                    return priceValue >= minPrice && priceValue <= maxPrice;
                });
    
                return hasBed && hasRegion && inPriceRange;
            }
            return false;
        });
    

        return {
            count: foundMessages.length,
            messages: foundMessages.map(msg => msg.message)
        };
    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    searchMessagesByKeyword,
};

// src/config/telegramClient.js
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const fs = require('fs');

const apiId = 23254726; 
const apiHash = '28097f75a9abdc60ef6dc9c8720b522c';  
const sessionFilePath = './session.txt';

// Проверяем, существует ли файл сессии
let sessionData;
if (fs.existsSync(sessionFilePath)) {
    sessionData = fs.readFileSync(sessionFilePath, 'utf8'); // Читаем сохранённую сессию
} else {
    sessionData = ''; // Если файл не найден, создаём новую сессию
}

const stringSession = new StringSession(sessionData);
const client = new TelegramClient(stringSession, apiId, apiHash, {});

(async () => {
    console.log('Loading interactive session...');
    await client.start({
        phoneNumber: async () => '+380955378077',
        phoneCode: async () => {
            const input = require('input');
            return await input.text("Code ?");
        },
        onError: (err) => console.log(err),
    });

    console.log('You are now connected.');

    // Сохраняем сессию в файл
    fs.writeFileSync(sessionFilePath, client.session.save(), 'utf8');
})();

module.exports = client;

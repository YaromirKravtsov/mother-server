// src/index.js
const express = require('express');
const messageController = require('./controllers/messageController');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// Определение пути к файлу окружения
const envFile = process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env';

// Загрузка переменных окружения
dotenv.config({ path: path.resolve(process.cwd(), envFile) });


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(messageController);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

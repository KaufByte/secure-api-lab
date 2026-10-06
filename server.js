// Підключаємо фреймворк Express
const express = require('express');
// Створюємо екземпляр додатку
const app = express();
// Визначаємо порт, на якому буде працювати сервер
const PORT = 3000;

// Створюємо простий маршрут для кореневого URL ('/')
// Він буде відповідати на GET-запити
app.get('/', (req, res) => {
  res.send('Hello World! The server is running.');
});

// Запускаємо сервер і змушуємо його "слухати" вказаний порт
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
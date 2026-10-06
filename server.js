// // Підключаємо фреймворк Express
// const express = require('express');
// // Створюємо екземпляр додатку
// const app = express();
// // Визначаємо порт, на якому буде працювати сервер
// const PORT = 3000;

// // Створюємо простий маршрут для кореневого URL ('/')
// // Він буде відповідати на GET-запити
// app.get('/', (req, res) => {
//   res.send('Hello World! The server is running.');
// });

// // Запускаємо сервер і змушуємо його "слухати" вказаний порт
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const { users, documents, employees } = require('./data');

const app = express();
const PORT = 3000;

// 1. Обов'язковий парсер тіла запитів JSON
app.use(express.json());

// 2. Middleware для логування (Етап 4)
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};
app.use(loggingMiddleware);

// 3. Middleware для аутентифікації (Етап 3)
const authMiddleware = (req, res, next) => {
  const login = req.headers['x-login'];
  const password = req.headers['x-password'];

  const user = users.find(u => u.login === login && u.password === password);

  if (!user) {
    return res.status(401).json({
      message: 'Authentication failed. Please provide valid credentials in headers X-Login and X-Password.'
    });
  }

  req.user = user;
  next();
};

// 4. Middleware для авторизації адміністратора (Етап 3)
const adminOnlyMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
  next();
};

// --- МАРШРУТИ ---

// Головна сторінка (Етап 1)
app.get('/', (req, res) => {
  res.send('Hello World! The server is running.');
});

// Отримання документів (потрібна аутентифікація)
app.get('/documents', authMiddleware, (req, res) => {
  res.status(200).json(documents);
});

// Створення документа (Етап 5 з валідацією)
app.post('/documents', authMiddleware, (req, res) => {
  const { title, content } = req.body || {};

  // Валідація: перевірка наявності полів
  if (!title || !content) {
    return res.status(400).json({
      message: 'Bad Request. Fields "title" and "content" are required.'
    });
  }

  const newDocument = {
    id: Date.now(),
    title,
    content
  };

  documents.push(newDocument);
  res.status(201).json(newDocument);
});

// Видалення документа (Етап 5)
app.delete('/documents/:id', authMiddleware, (req, res) => {
  const documentId = parseInt(req.params.id);
  const documentIndex = documents.findIndex(doc => doc.id === documentId);

  if (documentIndex === -1) {
    return res.status(404).json({ message: 'Document not found' });
  }

  documents.splice(documentIndex, 1);
  res.status(204).send();
});

// Отримання співробітників (тільки для адміна)
app.get('/employees', authMiddleware, adminOnlyMiddleware, (req, res) => {
  res.status(200).json(employees);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Дані користувачів (для майбутньої аутентифікації)
const users = [
  {
    login: 'user1',
    password: 'password123',
    role: 'user',
  },
  {
    login: 'admin1',
    password: 'password123',
    role: 'admin',
  },
];

// Список документів
const documents = [
  {
    id: 1,
    title: 'Company Policy v1.0',
    content: 'All employees must adhere to the company policy.',
  },
  {
    id: 2,
    title: 'Onboarding Guide for New Hires',
    content: 'Welcome to our company! Here are the first steps...',
  },
];

// Список співробітників (конфіденційна інформація)
const employees = [
  {
    id: 101,
    name: 'John Doe',
    position: 'Lead Developer',
  },
  {
    id: 102,
    name: 'Jane Smith',
    position: 'Project Manager',
  },
];


// Експортуємо масиви, щоб їх можна було використовувати в інших файлах
module.exports = {
  users,
  documents,
  employees,
};

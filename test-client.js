

const BASE_URL = 'http://localhost:3000';

// Дані для аутентифікації
const userCredentials = {
  'X-Login': 'user1',
  'X-Password': 'password123',
};

const adminCredentials = {
  'X-Login': 'admin1',
  'X-Password': 'password123',
};

// Функція для тестування
const runTests = async () => {
  console.log('--- Running API Tests ---');
  // Сценарій 1: Успішний запит від імені користувача
  console.log('\n[TEST 1] Getting documents as a user...');

  try {
    const response = await fetch(`${BASE_URL}/documents`, {
      method: 'GET',
      headers: userCredentials,
    });

    const data = await response.json();

    console.log('Status:', response.status);
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Сценарій 2: Спроба доступу до адмін-ресурсу від імені користувача
  console.log('\n[TEST 2] Trying to get employees as a user...');

  try {
    const response = await fetch(`${BASE_URL}/employees`, {
      method: 'GET',
      headers: userCredentials,
    });

    const data = await response.json();
    console.log('Status:', response.status); // Очікуємо 403
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Сценарій 3: Успішний запит від імені адміністратора

  console.log('\n[TEST 3] Getting employees as an admin...');

  try {
    const response = await fetch(`${BASE_URL}/employees`, {
      method: 'GET',
      headers: adminCredentials,
    });

    const data = await response.json();
    console.log('Status:', response.status);

    
console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n--- Tests finished ---');
};

runTests();

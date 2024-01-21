import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const LS_KEY = 'feedback-form-state';

//збереження стану форми в локальному сховищі
const saveFormState = throttle(function () {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(LS_KEY, JSON.stringify(formState));
}, 500);

// Відновлення стану форми під час завантаження сторінки
function restoreFormState() {
  const savedState = localStorage.getItem(LS_KEY);
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    emailInput.value = parsedState.email;
    messageInput.value = parsedState.message;
  }
}

// Отримання даних форми та очищення локального сховища при сабміті
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  // Очищення локального сховища
  localStorage.removeItem(LS_KEY);

  // Виведення даних у консоль
  console.log('Form data submitted:', formData);

  // Очищення полів форми
  emailInput.value = '';
  messageInput.value = '';
});

// Відстеження події input для збереження стану форми
form.addEventListener('input', saveFormState);

// Відновлення стану форми під час завантаження сторінки
restoreFormState();

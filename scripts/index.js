const Routes = {
  "/": {
    template: 'templates/index.html',
    title: '',
    description: ''
  },
  "/auth": {
    template: 'templates/auth.html',
    title: '',
    description: ''
  }
}

window.addEventListener('load', function(event) {

  const icon = document.querySelector('.icon-hook');
  
  icon.classList.add('active');
}, false);

const loginForm = document.forms.loginForm;
const inputValue = loginForm.elements.email;
const inputError = loginForm.querySelector(`.${ inputValue.id}-error`);

const showInputError = (element, errorMessage) => {
  element.classList.add('form__input_type_error');
  inputError.textContent = errorMessage;
  inputError.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');
  inputError.classList.remove('form__input-error_active');
  inputError.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (inputElement) => {
  if (inputElement.validity.typeMismatch) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
};

// Вызовем функцию isValid на каждый ввод символа
inputValue.addEventListener('change', () => { isValid(inputValue)}); 

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // isValid(inputValue);
  window.history.pushState({}, '', '/auth');
  // window.location.replace('/templates/auth.html');
  urlLocationHandler(inputValue);
})


const urlLocationHandler = async (inputElement) => {
  let html;
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    showInputError(inputElement, inputElement.validationMessage);
  }
  else {
    // html = await fetch(Routes['/auth'].template).then((response) => response.text());
    location.href=Routes['/auth'].template;
  }

  
  
  console.log(html);
  // const elementCopy = html.cloneNode(true);
  // loginPage.append(html); 
  // document.getElementById('email-input-error').innerHTML = html;
}
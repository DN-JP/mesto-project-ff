export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formEl) => {
    setEventListeners(formEl, validationConfig);
  });
};

const setEventListeners = (formEl, validationConfig) => {
  const inputList = Array.from(formEl.querySelectorAll(validationConfig.inputSelector));
  console.log(inputList);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      isValid(formEl, inputEl)
    });
  });
};

const isValid = (formEl, inputEl, validationConfig) => {
  if (inputEl.validity.patternMismatch) {
    inputEl.setCustomValidity(inputEl.dataset.errorMessage);
  } else {
    inputEl.setCustomValidity('');
  }

  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, validationConfig);
  } else {
    hideInputError(formEl, inputEl, validationConfig);
  }
};

const showInputError = (formEl, inputEl, errorMessage, validationConfig) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(validationConfig.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(validationConfig.errorClass);
};

const hideInputError = (formEl, inputEl, validationConfig) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(validationConfig.inputErrorClass);
  errorEl.classList.remove(validationConfig.errorClass);
  errorEl.textContent = '';
}

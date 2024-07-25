export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formEl) => {
    setEventListeners(formEl, validationConfig);
  });
};

const setEventListeners = (formEl, validationConfig) => {
  const inputList = Array.from(
    formEl.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonEl = formEl.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      isValid(formEl, inputEl, validationConfig);
      toggleButtonState(inputList, buttonEl, validationConfig);
    });
  });
};

const isValid = (formEl, inputEl, validationConfig) => {
  console.log(`${inputEl.name} is checking validity...`)
  if (inputEl.validity.patternMismatch) {
    inputEl.setCustomValidity(inputEl.dataset.errorMessage);
  } else {
    inputEl.setCustomValidity("");
  }

  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, validationConfig);
  } else {
    hideInputError(formEl, inputEl, validationConfig);
  }
};

const showInputError = (formEl, inputEl, validationConfig) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  console.log(inputEl);
  if (errorEl) {
    console.log(`Adding error class to input ${inputEl.id}`);
    inputEl.classList.add(validationConfig.inputErrorClass);
    errorEl.textContent = inputEl.validationMessage;
    errorEl.classList.add(validationConfig.errorClass);
  } else {
    console.log('Element not found!');
  }
};

const hideInputError = (formEl, inputEl, validationConfig) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  if (errorEl) {
    inputEl.classList.remove(validationConfig.inputErrorClass);
    errorEl.classList.remove(validationConfig.errorClass);
    errorEl.textContent = "";
  }
};

const toggleButtonState = (inputList, buttonEl, validationConfig) => {
  const hasInvalidInput = inputList.some((inputEl) => !inputEl.validity.valid);

  if (hasInvalidInput) {
    buttonEl.classList.add(validationConfig.inactiveButtonClass);
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove(validationConfig.inactiveButtonClass);
    buttonEl.disabled = false;
  }
};

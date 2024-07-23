const inputElements = document.querySelectorAll('.popup__input');

function setEventListeners(form) {
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      console.log(evt.target.validity.valid);
    })
  })
}

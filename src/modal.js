// Переменные 
// Кнопки
const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close');

// Модальные окна
const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const popup = document.querySelector('.popup');

// Функции и слушатели модальных окон
profileButton.addEventListener('click', () => {
  openPopup(profilePopup);
})

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup)
})

closePopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const closestPopup = button.closest('.popup');
    closestPopup.classList.remove('popup_is-opened');
  });
})

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
}

export const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

// Проверка класса

document.addEventListener('click', (event) => {
  console.log(`Target: ${event.target.className}
CurrentTarget: ${event.currentTarget.className}`)
});


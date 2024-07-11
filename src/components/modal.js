// Функция открытия окна

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

// Функции закрытия окна

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc)
}

const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
} 

export const closeByClick = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
}

// Проверка класса

// document.addEventListener('click', (event) => {
//   console.log(`Target: ${event.target.className};
// CurrentTarget: ${event.currentTarget.className}`)
// });


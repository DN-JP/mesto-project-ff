// Функция открытия окна

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

// Функции закрытия окна

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
}

export const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
} 

// Проверка класса

document.addEventListener('click', (event) => {
  console.log(`Target: ${event.target.className};
CurrentTarget: ${event.currentTarget.className}`)
});


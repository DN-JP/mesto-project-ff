// Переменные

let newPlaceForm = document.forms['new-place'];
export const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
export const cardUrlInput = newPlaceForm.querySelector('.popup__input_type_url');

export const cardTemplate = document.querySelector('#card-template').content;
export const addCardPopup = document.querySelector('.popup_type_new-card');
export const placesList = document.querySelector('.places__list');

// Функция создания карточек

export const createCard = (cardData, removeCard, likeHandler, imgClickHandler) => {
  const cardContainer = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const cardImg = cardContainer.querySelector('.card__image');
  const cardTitle = cardContainer.querySelector('.card__title');
  const removeButton = cardContainer.querySelector('.card__delete-button');

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  removeButton.addEventListener('click', () => {
    removeCard(cardContainer)
  });

  placesList.addEventListener('click', likeHandler);

  cardContainer.addEventListener('click', imgClickHandler);
  
  return cardContainer;
}

// Обработка лайка

export const likeHandler = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}
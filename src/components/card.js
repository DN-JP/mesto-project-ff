const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточек

export const createCard = (cardData, removeCard, likeHandler, imgClickHandler) => {
  const cardContainer = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const cardImg = cardContainer.querySelector('.card__image');
  const cardTitle = cardContainer.querySelector('.card__title');
  const removeButton = cardContainer.querySelector('.card__delete-button');
  const cardLikeButton = cardContainer.querySelector('.card__like-button');

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  removeButton.addEventListener('click', () => {
    removeCard(cardContainer)
  });

  cardLikeButton.addEventListener('click', likeHandler);

  cardImg.addEventListener('click', imgClickHandler);
  
  return cardContainer;
}

// Обработка лайка

export const likeHandler = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки

export function removeCard(element) {
  element.remove();
}

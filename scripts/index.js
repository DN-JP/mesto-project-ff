// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
const pageContent = document.querySelector('.places__list');
// const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

function cardControl (card, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  cardElement.querySelector('.card__image').src = initialCards.link;
  cardElement.querySelector('.card__title').textContent = initialCards.name;
  pageContent.append(cardElement);
  return cardElement;
}


// pageContent.append(cardElement);

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

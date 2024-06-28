import './pages/index.css';
import { initialCards } from './cards.js';
import {openModal} from './modal.js';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (cardData, removeCard) {
  const cardContainer = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const cardImg = cardContainer.querySelector('.card__image');
  const cardTitle = cardContainer.querySelector('.card__title');
  const removeButton = cardContainer.querySelector('.card__delete-button');

  cardImg.src = cardData.link;
  cardTitle.textContent = cardData.name;

  removeButton.addEventListener('click', () => {
    removeCard(cardContainer)
  });

  return cardContainer;
}

// @todo: Функция удаления карточки

  function removeCard(element) {
    element.remove();
  }

// @todo: Вывести карточки на страницу

initialCards.forEach((cardData) => {
  const cardContainer = createCard (cardData, removeCard)
  placesList.append(cardContainer);
});

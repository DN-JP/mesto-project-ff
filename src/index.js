import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup, closeByEsc} from './components/modal.js';

// Переменные
const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close');

// Модальные окна
const popups = document.querySelectorAll('.popup');
const popupContent = document.querySelector('.popup__content');
const formElement = document.querySelector('.popup__form');

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
  })
})

closePopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const closestPopup = button.closest('.popup');
    closestPopup.classList.remove('popup_is-opened');
  });
})

// Профиль
const profilePopup = document.querySelector('.popup_type_edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

nameInput.value = profileTitle.textContent;
jobInput.value = profileJob.textContent;

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

profilePopup.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  closePopup(profilePopup);
});

profileButton.addEventListener('click', () => {
  openPopup(profilePopup);
})

// Новая карточка

let newPlaceForm = document.forms['new-place'];
const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = newPlaceForm.querySelector('.popup__input_type_url');
const cardSubmitButton = newPlaceForm.querySelector('.popup__button');
const addCardPopup = document.querySelector('.popup_type_new-card');

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  let placeName = cardNameInput.value;
  let imgLink = cardUrlInput.value;
  const cardData = 
    {
      name: placeName,
      link: imgLink
    };
  const cardContainer = createCard (cardData, removeCard);
  placesList.append(cardContainer);
}

// newPlaceForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const fd = new FormData(newPlaceForm);
//   const fdObj = Object.fromEntries(fd);
//   console.log(fdObj.link);
//   fdObj.name
// });

addCardPopup.addEventListener('submit', (evt) => {
  handleCardFormSubmit(evt);
  closePopup(addCardPopup);
  clearCardForm(addCardPopup);
})

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
})

const clearCardForm = () => {
  cardNameInput.value = "";
  cardUrlInput.value = "";
}


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


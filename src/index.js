import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup, closeByEsc} from './components/modal.js';

// Элементы
const placesList = document.querySelector('.places__list');
const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close');

const popups = document.querySelectorAll('.popup');
const formElement = document.querySelector('.popup__form');
const imgPopup = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');

const profilePopup = document.querySelector('.popup_type_edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Модальные окна


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

// Создание и удаление карточек

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
  const cardContainer = createCard (cardData, removeCard, likeHandler, imgClickHandler);
  placesList.prepend(cardContainer);
}

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

function removeCard(element) {
  element.remove();
}

function createCard (cardData, removeCard, likeHandler, imgClickHandler) {
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

const likeHandler = (evt) => {
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    }
}

// Увеличение изображений

const imgClickHandler = (elem) => {
  popupImg.alt = elem.target.alt;
  popupImg.src = elem.target.src;
  popupImgCaption.textContent = elem.target.alt;
  if (elem.target.classList.contains('card__image')) {
    openPopup(imgPopup);
  }
}

// Вывод дефолтных карточек

initialCards.forEach((cardData) => {
  const cardContainer = createCard (cardData, removeCard, likeHandler, imgClickHandler);
  placesList.append(cardContainer);
});


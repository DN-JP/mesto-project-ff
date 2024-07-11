import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup, closeByClick} from './components/modal.js';
import { createCard, likeHandler, removeCard} from './components/card.js';

// Элементы

const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
const editProfileForm = document.forms['edit-profile'];
const imgPopup = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');

const profilePopup = document.querySelector('.popup_type_edit');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const newPlaceForm = document.forms['new-place'];
const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = newPlaceForm.querySelector('.popup__input_type_url');

export const cardTemplate = document.querySelector('#card-template').content;
const addCardPopup = document.querySelector('.popup_type_new-card');
export const placesList = document.querySelector('.places__list');

// Анимация и клик по оверлею или кнопке закрытия окна

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  closeByClick(popup);
})

// Обработка профиля

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

editProfileForm.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  closePopup(profilePopup);
});

profileButton.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
})

// Обработка и добавление новой карточки

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const placeName = cardNameInput.value;
  const imgLink = cardUrlInput.value;
  const cardData = 
    {
      name: placeName,
      link: imgLink
    };
  const cardContainer = createCard (cardData, removeCard, likeHandler, imgClickHandler);
  addCardToList(cardContainer);
}

const addCardToList = (el) => {
  placesList.prepend(el);
}

addCardPopup.addEventListener('submit', (evt) => {
  handleCardFormSubmit(evt);
  closePopup(addCardPopup);
  newPlaceForm.reset();
})

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
})

// Увеличение изображений

const imgClickHandler = (elem) => {
    popupImg.alt = elem.target.alt;
    popupImg.src = elem.target.src;
    popupImgCaption.textContent = elem.target.alt;
    openPopup(imgPopup);
}

// Вывод дефолтных карточек

initialCards.forEach((cardData) => {
  const cardContainer = createCard (cardData, removeCard, likeHandler, imgClickHandler);
  placesList.append(cardContainer);
});


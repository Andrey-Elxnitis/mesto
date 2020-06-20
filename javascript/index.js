import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';

const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия popup редактирования профиля
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия popup редактирования карточек
const closeButtonProfile = document.querySelector('.popup__close-button_profile'); //кнопка закрытия попапа профиля
const closeButtonCard = document.querySelector('.popup__close-button_card'); //кнопка закрытия попапа карточки
const closeButtonPhoto = document.querySelector('.popup__close-button_photo'); //кнопка закрытия попапа фото
const popupButtonSaveProfile = document.querySelector('.popup__button'); //кнопка сохранения данных в попапах
const popupButtonSaveCard = document.querySelector('.popup__button_card');
const popups = document.querySelector(".popups"); //общая секция popup для отслеживания клика
const popup = document.querySelector(".popup_type_profile"); //popup
const popupCard = document.querySelector(".popup_type_card"); //popup_card
export const popupPhoto = document.querySelector(".popup_type_photo"); //popup_photo
export const popupImage = document.querySelector(".popup__card-image"); //поле для фото popup-photo
export const popupNamePhoto = document.querySelector(".popup__card-name"); //поле названия фото popup-photo
const form = document.querySelector(".popup__container_profile"); //форма профиля
const formCard = document.querySelector(".popup__container_card"); //форма карточек
const elements = document.querySelector(".elements"); //контейнер для карточек
export const elementTemplate = document.querySelector("#element-template").content; //находим заготовку
const profileName = document.querySelector(".profile__title"); //имя профиля
const profileText = document.querySelector(".profile__subtitle"); //текст профиля
const popupName = document.querySelector(".popup__input_name"); //поле имени профиля в popup
const popupText = document.querySelector(".popup__input_text"); //поле текст профиля в popup
const popupCardLink = document.querySelector(".popup__input_link"); //находим поле ссылки в popup__card
const popupCardTitle = document.querySelector(".popup__input_title"); //находим поле названия в popup__card

export const objSelector = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_active'
};

//включение валидации
let formProfile = document.querySelector('.popup__container_ptofile');
formProfile = new FormValidator(objSelector, form);
formProfile.enableValidation();

let formCardPopup = document.querySelector('.popup__container_card');
formCardPopup = new FormValidator(objSelector, formCard);
formCardPopup.enableValidation();


//функция сбрасывания полей попапа места при повторном открытии
function discartingFieldsPopupcard () {
  popupCardLink.value = '';
  popupCardTitle.value = '';
}

//функция закрытия popup клавишей Escape
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_active').classList.remove('popup_active'); //ещем класс, если он есть, то удаляем его
  }
}

//функция открытия popup  
export function open(elem) {
    elem.classList.add("popup_active");

    if (popup.classList.contains('popup_active')) {
      //удаление ошибок при повторном открытии формы профиля
      formProfile.hideInputError(popup, popupName);
      formProfile.hideInputError(popup, popupText);
    }

    else if (popupCard.classList.contains('popup_active')) {
      //удаление ошибок при повторном открытии формы места
      formCardPopup.hideInputError(popupCard, popupCardTitle);
      formCardPopup.hideInputError(popupCard, popupCardLink);
    }

    document.addEventListener('keydown', closePopupEsc);
}

//функции поставновки кнопки отправить в попапе в правильное положение при открытии
function switchButton () {
  if (popup.classList.contains('popup_active')) {
    popupButtonSaveProfile.classList.remove(objSelector.inactiveButtonClass);
    popupButtonSaveProfile.disabled = false;
  }

   else if (popupCard.classList.contains('popup_active')) {
    popupButtonSaveCard.classList.add(objSelector.inactiveButtonClass);
    popupButtonSaveCard.disabled = true;
  }
}

//функция закрытия попапа
function close(elem) {
  elem.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupEsc);
}

//функция закрытия popup если кликаем на оверлей
popups.addEventListener('mousedown', function (evt) {
  if (evt.target.closest('.popups')) {
  evt.target.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupEsc);
  evt.stopPropagation();
  }
});

//функция добавления карточки в DOM
function addCardSite (elements, card) {
  elements.prepend(card);
}

//добавляем карточки из массива на сайт
const addCard = () => {
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '#element-template');
    const cardElement = card.generateCard();
    //добавляем в DOM
    addCardSite(elements, cardElement);
  });
}

//функция добавления новой карточки пользователем
const createCard = () => {
  const card = new Card(popupCardTitle.value, popupCardLink.value, '#element-template');
  const cardElement = card.generateCard();
  //добавляем в DOM
  addCardSite(elements, cardElement);
}

//отправка формы добавления фото-карточки
function handleCardFormSubmit (e) {
  e.preventDefault();
  createCard();
  close(popupCard);
}

//функция подставноки значений профиля в форму 
 function editFormProfile() {
  open(popup);
    popupName.value = profileName.textContent;
    popupText.value = profileText.textContent;
}

//функция добавления данных имени и о себе в профиль из popup
function updateProfile () {
  profileName.textContent = popupName.value;
  profileText.textContent = popupText.value;
}

//функция отправки формы редактирования профиля
 function handleProfileFormSubmit (e) {
   e.preventDefault();
   updateProfile();
   close(popup);
 }

editButton.addEventListener("click", () => {editFormProfile(); switchButton()});
addButton.addEventListener("click", () => {open(popupCard); discartingFieldsPopupcard(); switchButton()});
closeButtonProfile.addEventListener('click', () => {close(popup)});
closeButtonCard.addEventListener('click', () => {close(popupCard)});
closeButtonPhoto.addEventListener('click', () => {close(popupPhoto)});
form.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handleCardFormSubmit);

addCard();
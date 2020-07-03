import './index.css';

import { Card } from '../components/Card.js';
import { initialCards } from '../utils/constans.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { 
  popupPhoto, editButton, addButton, popupButtonSaveProfile, popupButtonSaveCard, popup,
  popupCard, form, formCard, elements, objSelector, inputListProfile, inputListCard } from '../utils/constans.js';

const popupImage = document.querySelector(".popup__card-image"); //поле для фото popup-photo
const popupNamePhoto = document.querySelector(".popup__card-name"); //поле названия фото popup-photo
const profileName = document.querySelector(".profile__title"); //имя профиля
const profileText = document.querySelector(".profile__subtitle"); //текст профиля
const popupName = document.querySelector(".popup__input_name"); //поле имени профиля в popup
const popupText = document.querySelector(".popup__input_text"); //поле текст профиля в popup
const popupCardLink = document.querySelector(".popup__input_link"); //находим поле ссылки в popup__card
const popupCardTitle = document.querySelector(".popup__input_title"); //находим поле названия в popup__card

const userFormProfile = {
  name: profileName,
  text: profileText
}

//экземпляр класса для попапа профиля
const userInfoProfile = new UserInfo(userFormProfile);

//экземпляр класса для попапа профиля
const profileForm = new PopupWithForm(popup, {
  //отправка формы профиля
  submitForm: (item) => {
    userInfoProfile.setUserInfo(item);
    profileForm.close();
  }
});

//открываем попап профиля и подставляем данные
function openProfileForm() {
  const profile = userInfoProfile.getUserInfo();
  popupName.value = profile.name;
  popupText.value = profile.text;
  profileForm.open();
}

//добавляю слушатели форме профиля
profileForm.setEventListeners();

//экземпляр класса для попапа фото
const popupPhotoCard = new PopupWithImage(popupPhoto, popupImage, popupNamePhoto);

//добавляем карточки на сайт из массива
const cardSheet = new Section({
  items: initialCards, renderer: (item) => {
      const card = new Card('#element-template', {
          initialCards: item, handleCardClick: () => {
              popupPhotoCard.open(item);
          }
      });
      const cardElement = card.generateCard();
      cardSheet.addItem(cardElement);
  }
}, elements);

cardSheet.renderItems(initialCards);

//добавление новой карточки на сайт пользователем
const cardForm = new PopupWithForm(popupCard, {
  submitForm: (item) => {
    const card = new Card('#element-template', {
      initialCards: item, handleCardClick: () => {
        popupPhotoCard.open(item);
      }
    });

    const cardElement = card.generateCard();
    cardSheet.addItem(cardElement);
    cardForm.close();
  }
});

//добавляю слушатели попапу фото
popupPhotoCard.setEventListeners();

//открываем попап добавления карточки
const openCardForm = () => {
  cardForm.open();
}

//добавляю слушатели на попап карточки
cardForm.setEventListeners();

//включение валидации для формы профиля
const formProfile = new FormValidator(objSelector, form);
formProfile.enableValidation();
//включение валидации для формы карточек
const formCardPopup = new FormValidator(objSelector, formCard);
formCardPopup.enableValidation();



//функция сбрасывания полей попапа места при повторном открытии
function discartingFieldsPopupcard () {
  popupCardLink.value = '';
  popupCardTitle.value = '';
}

editButton.addEventListener('click', () => {openProfileForm(); formProfile.toggleButtonState(inputListProfile, popupButtonSaveProfile); formProfile.hideInputError(popup, popupName); formProfile.hideInputError(popup, popupText);});
addButton.addEventListener("click", () => {openCardForm(); discartingFieldsPopupcard(); formCardPopup.toggleButtonState(inputListCard, popupButtonSaveCard)});
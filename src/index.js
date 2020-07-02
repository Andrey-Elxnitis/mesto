import './pages/index.css'

import { Card } from './components/Card.js';
import { initialCards } from './components/initialCards.js';
import { FormValidator } from './components/FormValidator.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';
import { Section } from './components/Section.js';
import { 
  popupPhoto, editButton, addButton, popupButtonSaveProfile, popupButtonSaveCard, popup,
  popupCard, form, formCard, elements, profileName, profileText, popupName, popupText,
  popupCardLink, popupCardTitle, objSelector } from './utils/constans.js';


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
  profileForm.setEventListeners();
}

//экземпляр класса для попапа фото
const popupPhotoCard = new PopupWithImage(popupPhoto);

//добавляем карточки на сайт из массива
const cardSheet = new Section({
  items: initialCards, renderer: (item) => {
      const card = new Card('#element-template', {
          initialCards: item, handleCardClick: () => {
              popupPhotoCard.open(item);
              popupPhotoCard.setEventListeners();
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
        popupPhotoCard.setEventListeners();
      }
    });

    const cardElement = card.generateCard();
    cardSheet.addItem(cardElement);
    cardForm.close();
  }
});

//открываем попап добавления карточки
const openCardForm = () => {
  cardForm.open();
  cardForm.setEventListeners();
}

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

//функция удаления ошибок при повторном открытии формы карточки
function deleteErrorCard() {
  formCardPopup.hideInputError(popupCard, popupCardTitle);
  formCardPopup.hideInputError(popupCard, popupCardLink);
}

//функция удаления ошибок при повторном открытии формы профиля
function deleteErrorProfile() {
  formProfile.hideInputError(popup, popupName);
  formProfile.hideInputError(popup, popupText);
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


editButton.addEventListener('click', () => {openProfileForm(); switchButton(); deleteErrorProfile()});
addButton.addEventListener("click", () => {openCardForm(); discartingFieldsPopupcard(); switchButton(); deleteErrorCard()});
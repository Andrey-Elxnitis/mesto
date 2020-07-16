//import './index.css';

import { Card } from '../components/Card.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import { 
  popupPhoto, editButton, addButton, popupButtonSaveProfile, popupButtonSaveCard, popup, popupDelete,
  popupCard, form, formCard, elements, objSelector, inputListProfile, inputListCard,
  popupAvatar, editButtonAvatar, formAvatar } from '../utils/constans.js';

const popupImage = document.querySelector(".popup__card-image"); //поле для фото popup-photo
const popupNamePhoto = document.querySelector(".popup__card-name"); //поле названия фото popup-photo
const profileName = document.querySelector(".profile__title"); //имя профиля
const profileText = document.querySelector(".profile__subtitle"); //текст профиля
const profileAvatar = document.querySelector('.profile__avatar'); //аватар профиля
const popupName = document.querySelector(".popup__input_name"); //поле имени профиля в popup
const popupText = document.querySelector(".popup__input_text"); //поле текст профиля в popup
const popupCardLink = document.querySelector(".popup__input_link"); //находим поле ссылки в popup__card
const popupCardTitle = document.querySelector(".popup__input_title"); //находим поле названия в popup__card

const userFormProfile = {
  name: profileName,
  text: profileText,
  avatar: profileAvatar
}

//экземпляр класса Api
export const api = new Api({ 
  apiUrl: 'https://mesto.nomoreparties.co/v1/cohort-13', 
  headers: {
    authorization: 'e66cf1b3-dadb-44df-be8a-bb3ba2569396',
     'Content-Type': 'application/json'
  } 
});

//экземпляр класса для попапа профиля
const userInfoProfile = new UserInfo(userFormProfile);

//загружаем информацию о пользователе с сервера
api.getUserInfo()
.then((data) => {
  userInfoProfile.setUserInfo(data);
})
.catch((err) => {
  console.log(err);
})

//отправляем новую инфу пользователя на сервер
const profileForm = new PopupWithForm(popup, {
  submitForm: () => {
    profileForm.sendingLoading(true);
    const inputValues = profileForm.getInputValues();
    api.sendUserInfo(inputValues)
    .then((data) => {
      userInfoProfile.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileForm.sendingLoading(false);
    })
    profileForm.close();
  }
})

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

//загружаем карточки на сайт с сервера
const cardSheet = new Section({
  renderer: (cardItem) => {
    const card = new Card(cardItem, api, {
      cardSelector: '#element-template',
      handleCardClick: () => {
        popupPhotoCard.open(cardItem);
      },
      deleteCards: () => {
        const deleteCardPopup = new PopupDeleteCard(
          popupDelete,
          api,
          cardItem
        );
        deleteCardPopup.setEventListeners();
        deleteCardPopup.open();
      }
    });
    api.getUserInfo()
    .then((data) => {
      const cardElement = card.generateCard(data);
      cardSheet.addItem(cardElement);
    })
  }
}, elements);

//отрисовываю карточки
api.getCards()
.then((data) => {
  cardSheet.render(data);
})

//добавление и отправка на сервер новой карточки пользователем
const cardForm = new PopupWithForm(popupCard, {
  submitForm: () => {
    const inputValues = cardForm.getInputValues();
    api.addCard(inputValues)
    .then((data) => {
      const card = new Card(data, api, {
        cardSelector: '#element-template',
        handleCardClick: () => {
          popupPhotoCard.open(data);
        },
        deleteCards: () => {
          const deleteCardPopup = new PopupDeleteCard(
            popupDelete,
            api,
            data
          );
          deleteCardPopup.setEventListeners();
          deleteCardPopup.open();
        }
      });
      api.getUserInfo()
      .then((data) => {
        const cardElement = card.generateCard(data);
        cardSheet.addItem(cardElement);
        cardForm.close();
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
})

//отправка нового аватара на сервер
const popupFormAvatar = new PopupWithForm(popupAvatar, {
  submitForm: () => {
    const inputValues = popupFormAvatar.getInputValues();
    api.sendUserAvatar(inputValues)
    .then((data) => {
      userInfoProfile.setUserAvatar(data);
    })
    .catch((err) => {
      console.log(err);
    })
    popupFormAvatar.close();
  }
})

//вешаю слушатели на попап аватара
popupFormAvatar.setEventListeners();

//открытие попапа закгрузки аватара
editButtonAvatar.addEventListener('click', () => {
  popupFormAvatar.open();
})

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

//включение валидации для формы аватара
const formAvatarPopup = new FormValidator(objSelector, formAvatar);
formAvatarPopup.enableValidation();


//функция сбрасывания полей попапа места при повторном открытии
function discartingFieldsPopupcard () {
  popupCardLink.value = '';
  popupCardTitle.value = '';
}

editButton.addEventListener('click', () => {openProfileForm(); formProfile.toggleButtonState(inputListProfile, popupButtonSaveProfile); formProfile.hideInputError(popup, popupName); formProfile.hideInputError(popup, popupText);});
addButton.addEventListener("click", () => {openCardForm(); discartingFieldsPopupcard(); formCardPopup.toggleButtonState(inputListCard, popupButtonSaveCard)});
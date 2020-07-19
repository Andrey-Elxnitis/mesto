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
  popupAvatar, editButtonAvatar, formAvatar, inputListAvatar, popupButtonAvatar } from '../utils/constans.js';

const popupImage = document.querySelector(".popup__card-image"); //поле для фото popup-photo
const popupNamePhoto = document.querySelector(".popup__card-name"); //поле названия фото popup-photo
const profileName = document.querySelector(".profile__title"); //имя профиля
const profileText = document.querySelector(".profile__subtitle"); //текст профиля
const profileAvatar = document.querySelector('.profile__avatar'); //аватар профиля
const popupAvatarLink = document.querySelector('.popup__input_avatar'); //инпут попапа аватара
const popupName = document.querySelector(".popup__input_name"); //поле имени профиля в popup
const popupText = document.querySelector(".popup__input_text"); //поле текст профиля в popup
const popupCardLink = document.querySelector(".popup__input_link"); //находим поле ссылки в popup__card
const popupCardTitle = document.querySelector(".popup__input_title"); //находим поле названия в popup__card

//массив с данными пользователя
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
      profileForm.close();
    })
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

//добавляю слушатели попапу фото
popupPhotoCard.setEventListeners();

//экземпляр класса попапа удаления карточки
const deleteCardPopup = new PopupDeleteCard(popupDelete);

//вешаю слушатели на попап удаления карточки
deleteCardPopup.setEventListeners();

//отправка нового аватара на сервер
const popupFormAvatar = new PopupWithForm(popupAvatar, {
  submitForm: () => {
    popupFormAvatar.sendingLoading(true);
    const inputValues = popupFormAvatar.getInputValues();
    api.sendUserAvatar(inputValues)
    .then((data) => {
      userInfoProfile.setUserAvatar(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormAvatar.sendingLoading(false);
      popupFormAvatar.close();
    })
  }
})

//вешаю слушатели на попап аватара
popupFormAvatar.setEventListeners();

//включение валидации для формы профиля
const formProfile = new FormValidator(objSelector, form);
formProfile.enableValidation();

//включение валидации для формы карточек
const formCardPopup = new FormValidator(objSelector, formCard);
formCardPopup.enableValidation();

//включение валидации для формы аватара
const formAvatarPopupValidation = new FormValidator(objSelector, formAvatar);
formAvatarPopupValidation.enableValidation();


//функция сбрасывания полей попапа при повторном открытии
function discartingFieldsPopup () {
  //сброс полей попапа аватара
  if (popupAvatar.classList.contains('popup_active')) {
    popupAvatarLink.value = '';
  }
  //сброс полей попапа карточки
  popupCardLink.value = '';
  popupCardTitle.value = '';
}


//получаем данные пользователя и карточек с сервера
Promise.all([api.getUserInfo(), api.getCards()])
.then((data) => {
  //передаю данные в класс UserInfo
  userInfoProfile.setUserInfo(data[0])

  //id пользователя
  const userId = data[0]._id;

  //загружаю карточки на сайт с сервера
  const cardSheet = new Section(data[1], {
    renderer: (data) => {
      const card = new Card(data, userId, {
        cardSelector: '#element-template',
        handleCardClick: () => {
          popupPhotoCard.open(data);
        },
        deleteCards: () => {
          deleteCardPopup.open();
          deleteCardPopup.setHandleSubmit( () => {
            api.deleteCard(data._id)
            .then(() => {
              card.delete();
            })
            .catch((err) => {
              console.log(err)
            })
          })
        },
        handleLike: () => {
          api.addLike(data._id)
          .then((data) => {
            card.likeCounterCard(data.likes);
            card.likeCard();
          })
          .catch((err) => {
            console.log(err);
          })
        },
        handleDeleteLike: () => {
          api.deleteLike(data._id)
          .then((data) => {
            card.likeCounterCard(data.likes);
            card.likeCard();
          })
          .catch((err) => {
            console.log(err);
          })
        }
      });
    const cardElement = card.generateCard(data);
    cardSheet.addItem(cardElement);
  }
}, elements);

//отрисовываю карточки
cardSheet.render()


//добавление и отправка на сервер новой карточки пользователем
const cardForm = new PopupWithForm(popupCard, {
  submitForm: () => {
    cardForm.sendingLoading(true);
    const inputValues = cardForm.getInputValues();
    api.addCard(inputValues)
    .then((data) => {
      const card = new Card(data, userId, {
        cardSelector: '#element-template',
        handleCardClick: () => {
          popupPhotoCard.open(data);
        },
        deleteCards: () => {
          deleteCardPopup.open();
          deleteCardPopup.setHandleSubmit( () => {
            api.deleteCard(data._id)
            .then(() => {
              card.delete();
            })
            .catch((err) => {
              console.log(err)
            })
          })
        },
        handleLike: () => {
          api.addLike(data._id)
          .then((data) => {
            card.likeCounterCard(data.likes);
            card.likeCard();
          })
          .catch((err) => {
            console.log(err);
          })
        },
        handleDeleteLike: () => {
          api.deleteLike(data._id)
          .then((data) => {
            card.likeCounterCard(data.likes);
            card.likeCard();
          })
          .catch((err) => {
            console.log(err);
          })
        }
      });
      const cardElement = card.generateCard(data);
      cardSheet.addItem(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardForm.sendingLoading(false);
      cardForm.close();
    })
  }
})

//добавляю слушатели на попап карточки
cardForm.setEventListeners();

//открываем попап добавления карточки
const openCardForm = () => {
  cardForm.open();
}

//слашатель открытия попапа карточки
addButton.addEventListener("click", () => {openCardForm(); discartingFieldsPopup(); formCardPopup.toggleButtonState(inputListCard, popupButtonSaveCard); formCardPopup.hideInputError(popupCard, popupCardTitle); formCardPopup.hideInputError(popupCard, popupCardLink)});

})
.catch((err) => {
  console.log(err)
});






//слушатели открытия попапов
editButton.addEventListener('click', () => {openProfileForm(); formProfile.toggleButtonState(inputListProfile, popupButtonSaveProfile); formProfile.hideInputError(popup, popupName); formProfile.hideInputError(popup, popupText);});
editButtonAvatar.addEventListener('click', () => {popupFormAvatar.open(); discartingFieldsPopup(); formAvatarPopupValidation.toggleButtonState(inputListAvatar, popupButtonAvatar); formAvatarPopupValidation.hideInputError(popupAvatar, popupAvatarLink)});
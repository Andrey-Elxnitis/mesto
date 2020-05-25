const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия popup редактирования профиля
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия popup редактирования карточек
const popups = document.querySelector(".popups"); //общая секция popup для отслеживания клика
const popup = document.querySelector(".popup_type_profile"); //popup
const popupCard = document.querySelector(".popup_type_card"); //popup_card
const popupPhoto = document.querySelector(".popup_type_photo"); //popup_photo
const popupImage = document.querySelector(".popup__card-image"); //поле для фото popup-photo
const popupNamePhoto = document.querySelector(".popup__card-name"); //поле названия фото popup-photo
const form = document.querySelector(".popup__container"); //форма профиля
const formCard = document.querySelector(".popup__container_card"); //форма карточек
const elements = document.querySelector(".elements"); //контейнер для карточек
const elementTemplate = document.querySelector("#element-template").content; //находим заготовку
let profileName = document.querySelector(".profile__title"); //имя профиля
let profileText = document.querySelector(".profile__subtitle"); //текст профиля
let popupName = document.querySelector(".popup__input_name"); //поле имени профиля в popup
let popupText = document.querySelector(".popup__input_text"); //поле текст профиля в popup
let popupCardLink = document.querySelector(".popup__input_link"); //находим поле ссылки в popup__card
let popupCardTitle = document.querySelector(".popup__input_title"); //находим поле названия в popup__card

//массив карточек 
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//функция открытия/закрытия popup  
function open(elem) {
    elem.classList.toggle("popup_active");
};

//функция закрытия popup одной кнопкой
function closePopup (event) {
    if (event.target.closest('.popup__close-button')){
      event.target.closest('.popup').classList.toggle('popup_active');
    }
  };

//функция добавления карточек из массива
function addCard(link, name) {
    const element = elementTemplate.cloneNode(true); //копируем заготовку
    const likeDelete = element.querySelector(".element__delete"); //кнопка удаления
    const likeButton = element.querySelector(".element__like"); //кнопка лайка

    const elementImage = element.querySelector(".element__image"); //находим поле image
    const elementTitle = element.querySelector(".element__title"); //находим поле title

    elementImage.src = link; //вставляем ссылку из массива
    elementTitle.textContent = name; //вставляем текст из массива

    //функция лайка
    likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
      });

    //функция удаления карточки
    likeDelete.addEventListener('click', function(evt) {
        const elementDelete = evt.target.closest('.element');
        elementDelete.remove();
      });

    //функция открытия popup-photo и подстановки фото с текстом
    elementImage.addEventListener("click", function() {
        popupImage.src = link;
        popupNamePhoto.textContent = name;
        open(popupPhoto);
    });

      return element;
};

//проходим по массиву и вставляем карточки
initialCards.forEach(({link, name}) => {elements.prepend(addCard(link, name))});

//функция добавления новой карточки
function addCardNew(e) {
    e.preventDefault(); //отмена стандартного submit
    const element = addCard(popupCardLink.value, popupCardTitle.value); //вставляем ссылку и название карточки
    elements.prepend(element);

    open(popupCard);
};

//функция подставноки значений профиля в форму 
function editFormProfile() {
    popupName.value = profileName.textContent;
    popupText.value = profileText.textContent;

    open(popup);
};

//функция изменения данных профиля
function profile(e) {
    e.preventDefault(); 
    profileName.textContent = popupName.value;
    profileText.textContent = popupText.value;

    open(popup);
};

editButton.addEventListener("click", editFormProfile);
addButton.addEventListener("click", () => {open(popupCard)});
form.addEventListener("submit", profile);
formCard.addEventListener("submit", addCardNew);
popups.addEventListener("click", closePopup);
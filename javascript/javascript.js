const editButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const sendButton = document.querySelector(".popup__button");
const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__subtitle");
const popupName = document.querySelector(".popup__name");
const popupText = document.querySelector(".popup__text");

//функция открытия popup

function openPopup() { 
    popup.classList.add("popup__active");
}
//функция закрытия popup

function closePopup() {
    popup.classList.remove("popup__active");
}

//функция изменения данных

function profile(e) {
    e.preventDefault();
    let popupName = document.querySelector(".popup__name");
    let popupText = document.querySelector(".popup__text");
    profileName.textContent = popupName.value;
    profileText.textContent = popupText.value;

    closePopup();
}

//функция закрытия popup и сохранения данных кнопкой enter

function closePopupEnter(e) {
    if (e.key === "Enter") {
        profile(e);
    }
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
sendButton.addEventListener("click", profile);
popupName.addEventListener("keypress", closePopupEnter);
popupText.addEventListener("keypress", closePopupEnter);
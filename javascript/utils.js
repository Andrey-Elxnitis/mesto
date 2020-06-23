export const popupPhoto = document.querySelector(".popup_type_photo"); //popup_photo
export const popupImage = document.querySelector(".popup__card-image"); //поле для фото popup-photo
export const popupNamePhoto = document.querySelector(".popup__card-name"); //поле названия фото popup-photo

//функция открытия попапа  
export function open(elem) {
    elem.classList.add("popup_active");
    document.addEventListener('keydown', closePopupEsc);
}

//функция закрытия попапа
export function close(elem) {

    if (!document.querySelector('.popup_active')) {
      return undefined;
    }
  
    elem.classList.remove('popup_active');
    document.removeEventListener('keydown', closePopupEsc);
}

//функция закрытия popup клавишей Escape
export function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      close(document.querySelector('.popup_active'));
    }
}
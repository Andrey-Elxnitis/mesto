import { Popup } from './Popup.js';
import { popupImage, popupNamePhoto } from '../utils/constans.js';

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
    }

    open(initialCards) {
        popupImage.src = initialCards.link;
        popupImage.alt = initialCards.name;
        popupNamePhoto.textContent = initialCards.name;
        super.open();
    }
}
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popup, popupImage, popupNamePhoto) {
        super(popup);
        this._popupImage = popupImage;
        this._popupNamePhoto = popupNamePhoto;
    }

    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupNamePhoto.textContent = data.name;
        super.open();
    }
}
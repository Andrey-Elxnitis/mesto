import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._buttonElement = this._popup.querySelector('.popup__button');
        this._form = this._popup.querySelector('.popup__container_delete');
    }

    setHandleSubmit(foo) {
        this._handleSubmit = foo;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
            this.close();
        })
        super.setEventListeners();
    }
}
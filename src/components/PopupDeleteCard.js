import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector, api, card) {
        super(popupSelector);
        this.form = this._popup.querySelector('.popup__container_delete');
        this.api = api;
        this.card = card;
    }

    //метод удаления карточки после получения подтверждения в попапе
    deleteCards(evt) {
        evt.preventDefault();
        this.api.deleteCard(this.card._id)
        document.getElementById(this.card._id).remove()
        this.close();
    }

    //добавление слушателей
    setEventListeners() {
        this.form.addEventListener('submit', (evt) => {
            this.deleteCards(evt);
        });  
        super.setEventListeners();
    } 
}
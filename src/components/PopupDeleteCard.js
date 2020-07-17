import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._buttonElement = this._popup.querySelector('.popup__button_delete');
    }

    //вешаем на кнопку "Да" слушатель и при клике удаляем карточку
    handleButtonDeleteCard(element, functionDelete) {
     this._buttonElement.addEventListener('click', (evt) => {
          evt.preventDefault();
          functionDelete();
          document.getElementById(element._id).remove();
          this.close();
      });
    }
}
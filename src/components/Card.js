export class Card {
    constructor(cardSelector, { initialCards, handleCardClick }) {
        this._name = initialCards.name;
        this._link = initialCards.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }

    //метод получения для карточки разметки
    _getTemplate() {
        const element = document.querySelector(this._cardSelector)
        .content.querySelector('.element').cloneNode(true); //копируем заготовку
        return element;
    }

    //функция\метод лайка
    _likeCard() {
        this._element.querySelector('.element__like')
        .classList.toggle('element__like_active');
    }

    //функция\метод удаления карточки
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    //метод установки слушателей
    _setEventListener() {
        //установили слушатель на лайк
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard();
        });

        //установили слушатель удаления карточки
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });

        //установили слушатель открытия попапа фото карточки
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    //функция\метод создания карточки
    generateCard() {
        this._element = this._getTemplate(); //записываем разметку
        this._setEventListener(); //добавляем карточкам слушатели

        //подставляем изображение и название карточки
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        //возвращаяем готовую карточку
        return this._element;
    }
}
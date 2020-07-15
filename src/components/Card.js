export class Card {
    constructor(data, api, { cardSelector, handleCardClick }) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._api = api;
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

    //метод отображения количества лайков у карточки
    _showlike() {
        const like = this._element.querySelector('.element__like');
        const likeCounter = this._element.querySelector('.element__like-counter');

        if (!like.classList.contains('element__like_active')) {
            this._api.addLike(this._id)
            .then((data) => {
                like.classList.add('element__like_active');
                likeCounter.textContent = `${data.likes.length}`;
            })
            .cath((err) => {
                console.log(err);
            })
        } else {
            this._api.disLike(this._id)
            .then((data) => {
                like.classList.remove('element__like_active');
                likeCounter.textContent = `${data.likes.length}`;
            })
            .cath((err) => {
                console.log(err);
            })
        }
    }
    //метод установки слушателей
    _setEventListener() {
        //установили слушатель на лайк
        this._element.querySelector('.element__like').addEventListener('click', () => {
           // this._likeCard();
           this._showlike();
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
        this._element.id = this._id;
        this._element.querySelector('.element__like-counter').textContent = `${this._likes.length}`;

        //возвращаяем готовую карточку
        return this._element;
    }
}
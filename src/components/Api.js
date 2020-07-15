export class Api {
    constructor({ apiUrl, headers }) {
        this.apiUrl = apiUrl;
        this.headers = headers;
    }

    //метод отправки запроса
    _sendRequest(path, parameter) {
        return fetch(`${this.apiUrl}${path}`, parameter)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else if (!res.ok) {
                return Promise.reject(res.status);
            }
        })
    }


    //метод запроса карточек с сервера
    getCards() {
        return this._sendRequest(`/cards`, {
            method: 'GET',
            headers: this.headers
        })
    }

    //метод отправки новой карточки на сервер
    addCard(card) {
        return this._sendRequest(`/cards`, {
            method: 'POST',
            body: JSON.stringify({
                name: card.name,
                link: card.link
            }),
            headers: this.headers
        })
    }

    //метод добавления лайка у карточки
    addLike(id) {
        return this._sendRequest(`/cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers
        })
    }

    //метод удаления лайка
    disLike(id) {
        return this._sendRequest(`/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
    }
}
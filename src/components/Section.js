export class Section {
    constructor({ renderer }, containerSelector) {
       // this._getCards = getCards;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    render(api) {
        api.reverse().forEach((item) => {
            this._renderer(item)
        })
    }

    addItem(element) {
        this._containerSelector.append(element);
    }
}
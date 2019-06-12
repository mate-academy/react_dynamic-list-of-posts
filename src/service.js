export default class Service {
    constructor() {
        this.apiBase = 'https://jsonplaceholder.typicode.com/';
    }

    getUsers() {
        return this._getData('users')
            .then(res => {
                return res.reduce((accumulator, currentValue) => {
                    accumulator[currentValue.id] = currentValue;
                    return accumulator;
                }, {});
            });
    }

    async getComments() {
        return await this._getData('comments');
    }

    async getPosts() {
        return await this._getData('posts');
    }

    async _getData(type) {
        return fetch(`${this.apiBase}${type}`)
            .then(res => res.json());
    };
}

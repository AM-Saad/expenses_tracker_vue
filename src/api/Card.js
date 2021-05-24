import { request } from '@/api/request'

export default class Card {

    static async getAll(jwt, url) {
        return await request(jwt, `${url}/cards/`, 'get', {}, true)
    }

    static async save(name, balance, limit, jwt, url) {
        return await request(jwt, `${url}/cards/create`, 'post', JSON.stringify({ name: name, balance: balance, limit: limit }), true)
    }
    static async delete(id, jwt, url) {
        return await request(jwt, `${url}/cards/delete/${id}`, 'delete', {}, true)
    }

    static async getOne(id, jwt, url) {
        return await request(jwt, `${url}/cards/${id}`, 'get', {}, true)
    }
    static async deposit(id, amount, jwt, url) {
        return await request(jwt, `${url}/cards/deposit/${id}`, 'put', JSON.stringify({ amount: amount }), true)
    }
    static async withdraw(id, amount, jwt, url) {
        return await request(jwt, `${url}/cards/withdraw/${id}`, 'put', JSON.stringify({ amount: amount }), true)
    }

}
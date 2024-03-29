import { request } from '@/api/request'

export default class authService {

    static async login(email, password, url) {
        return await request(null, `${url}/login`, 'post', JSON.stringify({ email, password }), true)
    }

    static async signup(data, url) {

        return await request(null, `${url}/signup`, 'post', JSON.stringify({...data}), true)

    }
}
import { request } from '@/api/request'

export default class Expenses {

    static async getAll(jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/`, 'get', {}, true)
    }
    static async getOne(id, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/${id}`, 'get', {}, true)
    }

    static async save(expenses, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills`, 'post', JSON.stringify({ date: expenses.date, billtype: expenses.billtype, category: expenses.category, duo: expenses.duo, amount: expenses.amount,  notes: expenses.notes, approved: expenses.approved, cardId: expenses.card }), true)
    }
    static async delete(expensesId, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/${expensesId}`, 'delete', {}, true)
    }



    static async getCustomTypes(jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/types/all`, 'get', {}, true)
    }

    static async createCustomType(type, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/types`, 'post', JSON.stringify({ type: type }), true)
    }

    static async removeCustomType(type, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/types`, 'delete', JSON.stringify({ type: type }), true)
    }


    static async byDate(from, to, type, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills?from=${from}&&to=${to}&&type=${type}`, 'get', {}, true)
    }

    static async byType(type, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/type/?type=${type}`, 'get', {}, true)
    }

    static async approve(expensesId, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/approve/${expensesId}`, 'put', {}, false)
    }
}
import { request } from '@/api/request'

export default class Expenses {

  
    static async fetchBills(query, jwt, url) {
        return await request(jwt, `${url}${query}`, 'get', {}, true)
    }

    static async fetchBill(id, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/${id}`, 'get', {}, true)
    }

    static async createBill(expenses, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills`, 'post', JSON.stringify({ date: expenses.date, billtype: expenses.billtype, category: expenses.category, duo: expenses.duo, amount: expenses.amount,  notes: expenses.notes, approved: expenses.approved, cardId: expenses.card }), true)
    }
    static async deleteBill(expensesId, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/${expensesId}`, 'delete', {}, true)
    }



    static async fetchCategories(jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/categories`, 'get', {}, true)
    }

    static async createCategory(type, jwt, url) {
        return await request(jwt, `${url}/admin/api/categories`, 'post', JSON.stringify({ type: type }), true)
    }

    static async deleteCategory(type, jwt, url) {
        return await request(jwt, `${url}/admin/api/categories/${type}`, 'delete', {}, true)
    }



    static async byType(type, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/type/?type=${type}`, 'get', {}, true)
    }

    static async approve(expensesId, jwt, url) {
        return await request(jwt, `${url}/admin/api/bills/approve/${expensesId}`, 'put', {}, false)
    }
}
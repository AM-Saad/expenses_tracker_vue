export default class helpers {
    static createObj(data) {
        const expenses = {
            card: data.card,
            billtype: data.billtype,
            category: data.category,
            amount: data.amount,
            approved: data.approved,
            paid: data.paid,
            duo: data.duo,
            date: data.date,
            notes: data.notes,

        }
        return expenses
    }
    static validate(expenses) {

        if (expenses.billtype == null) {
            return { msg: 'Choose Bill Type', state: false }

        }
        if (!expenses.amount < 0 ||
            !expenses.quantity < 0) {
            return { msg: 'Numbers must be positive', state: false }

        }
        if (expenses.scheduleState) {
            if (expenses.duoDate == null) {
                return { msg: 'Choose Duo Date', state: false }
            }
        }

        return { msg: 'done', state: true }


    }



    static validateType(type) {
        if (type === null || type === undefined || type == '') {
            return { msg: 'Add type name', state: false }
        }

        return { msg: 'done', state: true }

    }
}


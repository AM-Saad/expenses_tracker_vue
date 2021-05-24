const findById = (state) => (id) => {
    const expenses = state.allExpenses.find(i => i._id == id)
    return expenses
}
const findByType = (state) => (type) => {
    const expenses = state.allExpenses.filter(i => i.type == type)
    state.filtered = expenses
    return expenses
}
const sortlowest = (state) => (expenses) => {

    let sorted = []
    bubbleSort(expenses)
    function bubbleSort(arr) {
        var noSwaps;
        for (var i = arr.length; i > 0; i--) {
            noSwaps = true
            for (var j = 0; j < i - 1; j++) {
                if (arr[j].total > arr[j + 1].total) {
                    var temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                    noSwaps = false
                }
            }
            if (noSwaps) break;
        }
        return sorted = arr
    }
    state.filtered = sorted
    return sorted
}
const sortheigest = (state) => (expenses) => {
    let sorted = []
    bubbleSort(expenses)
    function bubbleSort(arr) {
        var noSwaps;
        for (var i = arr.length; i > 0; i--) {
            noSwaps = true
            for (var j = 0; j < i - 1; j++) {
                if (arr[j].total < arr[j + 1].total) {
                    var temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                    noSwaps = false
                }
            }
            if (noSwaps) break;
        }
        return sorted = arr
    }
    state.filtered = sorted

    return sorted
}



const groupApprovedExpenses = (state) => (expenses) => {
    let approved = {}
    expenses.forEach(e => {
        if (approved[e.status.approved]) {
            approved[e.status.approved].push(e)
        } else {
            approved[e.status.approved] = []
            approved[e.status.approved].push(e)
        }

    })
    return approved
}
const groupScheduledExpenses = (state) => (expenses) => {

    let scheduled = {}
    expenses.forEach(e => {

        if (scheduled[e.scheduled.state]) {
            scheduled[e.scheduled.state].push(e)
        } else {
            scheduled[e.scheduled.state] = []
            scheduled[e.scheduled.state].push(e)
        }

    })
}

export default {
    findById,
    findByType,
    sortheigest,
    sortlowest,
    groupApprovedExpenses,
    groupScheduledExpenses
};
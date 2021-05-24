const addnew = (state, expenses) => {
  state.allExpenses.push(expenses)
}
const updateExpenses = (state, expenses) => {

  state.allExpenses = expenses;
};
const updateOne = (state, expenses) => {
  console.log(expenses);

  const index = state.allExpenses.findIndex(i => i._id.toString() == expenses._id.toString())

  if (index >= 0) {
    state.allExpenses[index] = expenses
  }
  console.log(state.allExpenses);
  
};
const deleteone = (state, id) => {
  state.allExpenses = state.allExpenses.filter(i => i._id.toString() != id.toString())
};

const updateTypes = (state, types) => {
  state.customTypes = types;
};
const updatesearchdate = (state, date) => {
  state.dateRange = date
};



export default {
  addnew, updateExpenses, updateOne, deleteone, updateTypes, updatesearchdate
};
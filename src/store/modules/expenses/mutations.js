function removeDuplicates(data, key) {
  return [...new Map(data.map(x => [key(x), x])).values()];
}

const addnew = (state, expenses) => {
  state.allExpenses.push(expenses)
}
const setBills = (state, expenses) => {

  let finleitems = removeDuplicates([...state.allExpenses, ...expenses], it => it._id);
  state.allExpenses = finleitems;
};

const updateFilter = (state, data) => {
  state.filters.types.push({ filterType: data.filter.filterType, filterVal: data.filter.filterVal, items: data.items })
}

const resetFilter = (state,) => {
  state.filters = { items: [], types: [] }
}
const removeFilter = (state, data) => {
  let presestItems = [];
  let presestFilters = [];
  for (let type of state.filters.types) {
    if (
      (type.filterVal != data.filterVal && type.filterType != data.filterType) ||
      (type.filterType == data.filterType && type.filterVal !== data.filterVal)
    ) {
      presestFilters.push(type);
      presestItems = [...presestItems, ...type.items];
    }
  }
  state.filters.types = presestFilters;
  let finleitems = removeDuplicates(presestItems, it => it._id);
  state.filters.items = finleitems;
  state.allExpenses = finleitems
}
const updateOne = (state, expenses) => {
  const index = state.allExpenses.findIndex(i => i._id.toString() == expenses._id.toString())
  if (index >= 0) {
    state.allExpenses[index] = expenses
  }
};
const deleteone = (state, id) => {
  state.allExpenses = state.allExpenses.filter(i => i._id.toString() != id.toString())
};

const setCategories = (state, types) => {
  state.categories = types;
};
const updatesearchdate = (state, date) => {
  state.dateRange = date
};



export default {
  addnew, setBills, updateOne, deleteone, setCategories, updatesearchdate, updateFilter,removeFilter,resetFilter
};
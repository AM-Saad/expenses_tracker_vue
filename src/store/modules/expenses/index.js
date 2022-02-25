import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  fetching: true,
  categories: [],
  allExpenses: [],
  filters: { items: [], types: [] },
  url: "http://localhost:4000"
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
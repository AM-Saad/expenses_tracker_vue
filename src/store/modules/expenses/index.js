import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  fetching: true,
  customTypes: [],
  allExpenses: [],
  filters: {items:[],types:[]},
  dateRange: {
    start: new Date(new Date().getFullYear(), new Date().getMonth() + 0, 1),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  },
  url: "http://localhost:4000"
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
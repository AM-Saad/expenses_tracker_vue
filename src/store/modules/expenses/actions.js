
import expenses from '@/api/Expenses';
import { Store } from 'vuex';

const checkAuth = (res, dispatch) => {
  if (res.code == 401) {
    return dispatch('logout', null, { root: true });
  }
}


const createBill = async ({ commit, state, rootState, dispatch }, { data }) => {
  const res = await expenses.createBill(data.expenses, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  res.state && commit('addnew', res.json.bills)
  commit('msg', { msg: res.msg, type: res.code == 500 ? 'danger' : res.code === 200 ? 'success' : 'warning' }, { root: true })
  return res.state ? res.json.card : false


};
const fetchBill = async ({ commit, state, rootState, dispatch }, { data }) => {
  state.fetching = true
  const res = await expenses.fetchBill(data.id, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  state.fetching = false
  if (!res.state) {
    commit('msg', { msg: res.msg, type: res.code == 500 ? 'danger' : 'warning' }, { root: true })
  }
  return res.json.bill

};

const fetchBills = async ({ commit, state, rootState, dispatch }, { data }) => {
  state.fetching = true
  const res = await expenses.fetchBills(data.url, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  state.fetching = false
  if (data.update) {
    commit('setBills', res.json.bills)
  }
  if (!res.state) {
    commit('msg', { msg: res.msg, type: res.code == 500 ? 'danger' : 'warning' }, { root: true })
  }
  return res.json.bills
};


const deleteBill = async ({ commit, rootState, dispatch }, { data }) => {
  const res = await expenses.deleteBill(data.expensesId, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  commit('msg', { msg: res.msg, type: res.code == 500 ? 'danger' : res.code === 200 ? 'success' : 'warning' }, { root: true })
  res.state && commit('deleteBill', data.expensesId)
  return res.state ? true : false
};

const fetchCategories = async ({ commit, rootState, dispatch }) => {
  const res = await expenses.fetchCategories(rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  res.state && commit('setCategories', res.json.types)
  if (!res.state) {
    commit('msg', { msg: res.msg, type: res.code == 500 ? 'danger' : 'warning' }, { root: true })
  }
  return res.state && res.json.types
};
const createCategory = async ({ commit, rootState, dispatch }, { data }) => {
  const res = await expenses.createCategory(data.name, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })

};


const approve = async ({ commit, rootState, dispatch }, { data }) => {

  const res = await expenses.approve(data.expensesId, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })
  res.state && commit('updateOne', res.json.bills)
};



const setBills = async ({ commit }, items) => {
  commit('setBills', items)
}
const updatesearchdate = async ({ commit }, { date }) => {
  commit('updatesearchdate', date)
}
const updateFilter = async ({ commit }, { data }) => {
  commit('updateFilter', data)
}
const removeFilter = async ({ commit }, data) => {
  commit('removeFilter', data)
}
const resetFilter = async ({ commit }) => {
  commit('resetFilter')
}

export default {
  fetchBill,
  createBill,
  fetchBills,
  createCategory,
  fetchCategories,
  deleteBill,
  approve,
  updatesearchdate,
  updateFilter,
  removeFilter,
  resetFilter,
  setBills
};
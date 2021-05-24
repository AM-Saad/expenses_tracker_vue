
import expenses from '@/api/Expenses';
import { Store } from 'vuex';

const checkAuth = (res, dispatch) => {
  if (res.code == 401) {
    return dispatch('logout', null, { root: true });
  }
}

const getAll = async ({ commit, state, rootState, dispatch }, { data }) => {
  state.fetching = true
  const res = await expenses.getAll(rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  state.fetching = false
  res.state ? commit('updateExpenses', res.json.bills) : null
};
const createNew = async ({ commit, state, rootState, dispatch }, { data }) => {
  const res = await expenses.save(data.expenses, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })
  res.state && commit('addnew', res.json.bills)
  return res.state ? res.json.card : false
};
const getOne = async ({ commit, state, rootState, dispatch }, { data }) => {
  state.fetching = true
  const res = await expenses.getOne(data.id, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  state.fetching = false
  return res.state && res.json.bills
};

const findByDate = async ({ commit, state, rootState, dispatch }, { data }) => {
  state.fetching = true
  const res = await expenses.byDate(data.from, data.to, data.datetype, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  state.fetching = false
  data.update && commit('updateExpenses', res.json.bills)
  state.filtered = []
  return res.json.bills
};


const deleteOne = async ({ commit, rootState, dispatch }, { data }) => {
  const res = await expenses.delete(data.expensesId, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)

  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })
  res.state && commit('deleteone', data.expensesId)
  return res.state ? true : false
};

const getypes = async ({ commit, rootState, dispatch }) => {
  const res = await expenses.getCustomTypes(rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  !res.state && commit('msg', { msg: res.msg, type: 'warning' }, { root: true })
  res.state && commit('updateTypes', res.json.types)
  return res.state && res.json.types
};
const createType = async ({ commit, rootState, dispatch }, { data }) => {
  const res = await expenses.createCustomType(data.name, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })

};


const approve = async ({ commit, rootState, dispatch }, { data }) => {

  const res = await expenses.approve(data.expensesId, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })
  res.state && commit('updateOne', res.json.bills)
};


const updatesearchdate = async ({ commit }, { date }) => {
  commit('updatesearchdate', date)
}

const checkFilter = ({ rootState }, { filterType, filterVal }) => {
  let exist = false
  for (let item of rootState.filters.types) {
    if (item.filterType === filterType && item.filterVal === filterVal) {
      exist = true
      break
    }
  }
  return exist
}

export default {
  getAll,
  getOne,
  createNew,
  findByDate,
  createType,
  getypes,
  deleteOne,
  approve,
  updatesearchdate,
  checkFilter
};
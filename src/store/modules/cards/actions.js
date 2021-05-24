
import Card from '@/api/Card';
import { Store } from 'vuex';

const checkAuth = (res, dispatch) => {
  if (res.code == 401) {
    return dispatch('logout', null, { root: true });
  }
}

const getAll = async ({ commit, state, rootState, dispatch }) => {
  const res = await Card.getAll(rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  state.fetching = false
  res.state && commit('updateCards', res.json.cards)
  return res.state ? true : false
};
const createNew = async ({ commit, rootState, dispatch }, { data }) => {
  const res = await Card.save(data.name, data.balance, data.limit, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })
  res.state && commit('addnew', res.json.card)
  return res.state ? true : false
};
const getOne = async ({ commit, state, rootState, dispatch }, { data }) => {
  state.fetching = true
  const res = await Card.getOne(data.id, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  // !res.state && commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })
  state.fetching = false
  return res.state && res.json
};


const deleteOne = async ({ commit, rootState, dispatch }, { data }) => {
  const res = await Card.delete(data.id, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)
  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })
  res.state && commit('deleteone', data.id)
  return res.state ? true : false
};

const deposit = async ({ commit, state, rootState, dispatch }, { data }) => {

  state.fetching = true
  const res = await Card.deposit(data.id, data.amount, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)


  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })
  res.state && commit('updateOne', res.json.card)

  state.fetching = false
  return res
}


const withdraw = async ({ commit, state, rootState, dispatch }, { data }) => {
  state.fetching = true
  const res = await Card.withdraw(data.id, data.amount, rootState.jwt, rootState.url)
  checkAuth(res, dispatch)

  commit('msg', { msg: res.msg, type: res.state ? 'success' : 'warning' }, { root: true })
  res.state && commit('updateOne', res.json.card)

  state.fetching = false
  return res
}



export default {
  getAll,
  createNew,
  getOne,
  deleteOne,
  deposit,
  withdraw,
};
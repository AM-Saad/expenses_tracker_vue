import Vue from 'vue';
import Vuex from 'vuex';
import expensesModule from './modules/expenses';
import cardsModule from './modules/cards';
import authService from '@/api/auth';
import { request } from '@/api/request';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    expenses: expensesModule,
    cards: cardsModule,
  },
  state: {
    networkconnections: true,
    isAuth: false,
    jwt: null,
    expiryDate: null,
    user: localStorage.getItem("user"),
    url: "http://localhost:3000",
    notifiy: {msg:null, type:null}
  },
  getters: {},
  mutations: {
    authenticateUser(state, authData) {

      state.jwt = authData.token
      state.user = authData.name
      state.isAuth = true
      const remainingMilliseconds = 60 * 60 * 1000;
      state.sessionExpiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );

      localStorage.setItem('jwt', state.jwt)
      localStorage.setItem('sessionExpiryDate', state.sessionExpiryDate)
      localStorage.setItem('user', state.user)
    },
    checkauthintecated(state) {
      const jwtToken = localStorage.getItem("jwt");
      const expiryDate = localStorage.getItem("sessionExpiryDate");
      const user = localStorage.getItem("user");
      const oneday = 60 * 60 * 24 * 1000
      if (new Date(expiryDate) <= oneday || !jwtToken) {
        state.isAuth = false;
      } else {
        state.jwt = jwtToken
        state.sessionExpiryDate = expiryDate
        state.isAuth = true
        state.user = user
      }
    },
    logout(state) {

      localStorage.removeItem('jwt')
      localStorage.removeItem('sessionExpiryDate')
      state.user = null
      state.jwt = null
      state.expiryDate = null
      state.isAuth = false

    },
    msg(state, notifiy) {
      state.notifiy = notifiy
      setTimeout(function () { state.notifiy.msg = null }, 5000);

    }
  },

  actions: {
    async  checkConnection({ state }) {

      const res = await fetch("http://info.cern.ch/")
      state.networkconnections = !state.networkconnections
    },
    async  login({ context, commit, state }, { data }) {
      const response = await authService.login(data.email, data.password, state.url)
      response.state && commit('authenticateUser', response.json);
      !response.state && commit('msg', { msg: response.msg, type: 'warning' })
      response.state && (state.msg = null)
      return response.state && response


    },
    async  signup({ context, commit, state }, { data }) {
      const response = await authService.signup(data, state.url)
      if (!response.state) return commit('msg', { msg: response.msg, type: 'warning' })
      return response.state && response

    },
    logout({ context, commit, state }) {
      commit('logout')
    },


  },

});

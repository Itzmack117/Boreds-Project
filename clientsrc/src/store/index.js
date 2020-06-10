import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: [],
    comments: []

  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    addBoard(state, data) {
      state.boards.push(data)
    },
    setActiveBoard(state, data) {
      state.activeBoard = data
    },
    addList(state, data) {
      state.lists.push(data)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    createBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },

    async getBoardById({ commit, dispatch }, id) {
      try {
        let res = await api.get('boards/' + id)
        commit("setActiveBoard", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion


    //#region -- LISTS --
    getListsByBoardId({ commit, dispatch }, boardId) {
      api.get('lists/' + boardId)
        .then(res => {
          console.log(res)
          commit('lists', res.data.lists)
        })
    },
    async createList({ commit, dispatch }, newlist) {
      try {
        let res = await api.post('boards/' + newlist.boardId)
        commit('addList', res.data)
      } catch (error) {
        console.error(error)
      }

    }

    //#endregion
  }
})

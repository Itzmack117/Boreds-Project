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
    tasks: {},
    comments: []

  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLists(state, lists) {
      state.lists = lists
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
    deleteBoard(state, id) {
      state.boards = state.boards.filter(b => b.id != id)
    },
    addList(state, data) {
      console.log(state.lists)
      state.lists.push(data)
    },
    deleteList(state, id) {
      state.lists = state.lists.filter(l => l.id != id)
    },
    setTasks(state, data) {
      // NOTE we want to add a property to the dictionary where the key is listID and the value is the array of tasks for that list
      // state.tasks[data.listId] = data.tasks
      Vue.set(state.tasks, data.listId, data.tasks)
    },

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
    async deleteBoard({ commit, dispatch }, id) {
      try {
        let res = await api.delete('boards/' + id)
        commit("deleteBoard", res.data)
        router.push({ name: "boards" });
      } catch (error) {
        console.log(error);
      }
    },
    //#endregion


    //#region -- LISTS --
    async getListsByBoardId({ commit, dispatch }, boardId) {
      try {
        let res = await api.get('boards/' + boardId + "/lists")
        commit('setLists', res.data)
      } catch (error) { console.log(error) };
    },

    async createList({ commit, dispatch }, newlist) {
      try {
        let res = await api.post('lists/', newlist)
        dispatch('getListsByBoardId', newlist.boardId)
      } catch (error) {
        console.error(error)
      }

    },

    async deleteList({ commit, dispatch }, list) {
      try {
        let res = await api.delete('lists/' + list.id)
        commit("deleteList", res.data)
        dispatch('getListsByBoardId', list.boardId)
      } catch (error) {
        console.log(error);
      }
    },

    //#endregion

    //#region -- TASKS --
    async getTasksByListId({ commit, dispatch }, listId) {
      try {
        let res = await api.get('lists/' + listId + "/tasks")
        console.log(res.data)
        commit("setTasks", { listId, tasks: res.data, comments: res.data.comments })
      } catch (error) {
        console.error(error)
      }
    },
    async createTask({ commit, dispatch }, newTask) {
      try {
        let res = await api.post('tasks/', newTask)
        dispatch('getTasksByListId', newTask.listId)
      } catch (error) {
        console.error(error)
      }

    },
    async deleteTask({ commit, dispatch }, task) {
      try {
        let res = await api.delete('tasks/' + task.id)
        commit("setTasks", res.data)
        dispatch('getTasksByListId', task.listId)
      } catch (error) {
        console.log(error);
      }
    },

    async createComment({ commit, dispatch }, comment) {
      try {
        let res = await api.post('tasks/' + comment.taskId + "/comments", comment)
        //commit("setComments", res.data)
        dispatch('getTasksByListId', res.data.listId)
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment({ commit, dispatch }, taskProp) {
      try {
        let res = await api.delete('tasks/' + taskProp.taskId + "/comments/" + taskProp.commentId)
        dispatch('getTasksByListId', res.data.listId)
      } catch (error) { console.log(error) };
    }
  }

},
)

import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-type'

Vue.use(Vuex)

let api = new Vue()

export default new Vuex.store({
    state: {
        //list of available rooms to select from
        rooms: [],
        tasks: []
    },
    getters: {
        rooms: state => state.rooms,
        tasks: state => state.tasks
    },
    actions: {
        loadRooms({ commit, state }, payload) {
            if (!state.rooms.length || payload) return api.$service.config.getRooms().then(resp => commit(types.Load_Rooms, resp.data))
        },
        loadTasks({ commit, state }, payload) {
            if (!state.tasks.length || payload) return api.$service.config.getTasks().then(resp => commit(types.Load_Tasks. resp.data))
        },
    },
    mutations: {

    },
})
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-type';
import { auth } from './auth.module';

Vue.use(Vuex)

let api = new Vue()

export default new Vuex.Store({
    modules: {
        auth
    },
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
        loadTasks({ commit, state }, payload) {
            if (!state.tasks.length || payload) return api.$service.config.getTasks().then(resp => commit(types.LOAD_TASKS, resp.data))
        },
        loadRooms({ commit, state }, payload) {
            if (!state.rooms.length || payload) {
                return api.$service.config.getRooms().then(resp => {
                    commit(types.LOAD_ROOMS, resp.data)
                })
            }
        },
        
    },
    mutations: {
        [types.LOAD_ROOMS](state, rooms) {
            state.rooms = rooms;
        },
        [types.LOAD_TASKS](state, tasks) {
            state.tasks = tasks;
        }
    },
})
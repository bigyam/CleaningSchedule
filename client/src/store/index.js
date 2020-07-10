import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-type'

Vue.use(Vuex)

let api = new Vue()

export default new Vuex.Store({
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
            console.log('here0');
            if (!state.rooms.length || payload) {
                console.log('here============');
                return api.$service.config.getRooms().then(resp => {
                    commit(types.LOAD_ROOMS, resp.data)
                    console.log('state rooms', state.rooms);
                })
            }
        },
        
    },
    mutations: {
        [types.LOAD_ROOMS](state, rooms) {
            console.log('here2========');
            state.rooms = rooms;
        },
        [types.LOAD_TASKS](state, tasks) {
            state.tasks = tasks;
        }
    },
})
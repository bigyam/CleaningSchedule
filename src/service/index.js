import axios from 'axios'
import routes from './routes'
//import authHeader from './auth-header'

axios.defaults.baseURL = 'http://localhost:8082/cleaningschedule'
//axios.defaults.headers = authHeader();

export default{
	config: {
		getRooms() {
			return axios.get(routes.room + '/all');
		},
		getSingleRoom(roomId) {
			return axios.get(routes.room, {params: {roomId}});
		},
		addRoom(data) {
			return axios.post(routes.room, data);
		},
		updateRoom(data) {
			return axios.put(routes.room, data);
		},
		deleteRoom(id) {
			return axios.delete(routes.room, {params:{id}});
		},
		getTasks() {
			return axios.get(routes.task + '/all');
		},
		addTask(data) {
			return axios.post(routes.task, data);
		},
		updateTask(data) {
			return axios.put(routes.task, data);
		},
		deleteTask(id) {
			return axios.delete(routes.task, {params:{id}});
		},
		getScheduleItems() {
			return axios.get(routes.scheduleItem + '/all');
		},
		addScheduleItem(data) {
			return axios.post(routes.scheduleItem, data);
		},
		updateScheduleItem(data) {
			return axios.put(routes.scheduleItem, data);
		},
		deleteScheduleItem(data) {
			return axios.delete(routes.scheduleItem, {data});
		}
	}
}
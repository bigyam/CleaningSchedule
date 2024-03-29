import axios from 'axios'
import routes from './routes'

axios.defaults.baseURL = 'http://142.93.157.84:8082/cleaningschedule'

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
		toggleComplete(data) {
			return axios.put(routes.scheduleItem, data);
		},
		deleteScheduleItem(data) {
			return axios.delete(routes.scheduleItem, {data});
		}
	}
}
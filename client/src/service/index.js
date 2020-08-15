import axios from 'axios'
import routes from './routes'

axios.defaults.baseURL = 'http://localhost:5000'

export default{
	config: {
		getRooms() {
			return axios.get(routes.room);
		},
		getSingleRoom(roomId) {
			return axios.get(routes.singleRoom, {params: {roomId}});
		},
		addRoom(data) {
			return axios.post(routes.room, data);
		},
		updateRoom(data) {
			return axios.put(routes.room, data);
		},
		deleteRoom(roomId) {
			return axios.delete(routes.room, {data:{roomId}});
		},
		getTasks() {
			return axios.get(routes.task);
		},
		addTask(data) {
			return axios.post(routes.task, data);
		},
		updateTask(data) {
			return axios.put(routes.task, data);
		},
		deleteTask(taskId) {
			return axios.delete(routes.task, {data:{taskId}});
		},
		getScheduleItems() {
			return axios.get(routes.scheduleItem);
		},
		addScheduleItem(data) {
			return axios.post(routes.scheduleItem, data);
		},
		updateScheduleItem(data) {
			return axios.put(routes.scheduleItem, data);
		},
		deleteScheduleItem(data) {
			return axios.post(routes.scheduleItem + '/delete', data);
		}
	}
}
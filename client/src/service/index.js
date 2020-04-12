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
		}
	}
}
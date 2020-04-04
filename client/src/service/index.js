import axios from 'axios'
import routes from './routes'

export default{
	config: {
		getRooms() {
			return axios.get(routes.room);
		},
		getSingleRoom(roomId) {
			return axios.get(routes.room, {params: {roomId}});
		}
	}
}
import axios from 'axios';

const API_URL = 'http://142.93.157.84:8082/cleaningschedule/auth/'; //TODO: make this have prod/dev.  for now hardcoded

class AuthService {
    login(user) {
        return axios
        .post(API_URL + 'signin', {
            username: user.username,
            password: user.password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();
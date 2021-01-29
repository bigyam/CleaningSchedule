//import { mapGetters } from 'vuex';

export default function authHeader() {
    //let user = mapGetters(['user']);
    //console.log(user);
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}
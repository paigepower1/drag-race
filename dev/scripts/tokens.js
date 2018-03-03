import axios from 'axios';
export default {
    access_token: '',
    refresh_token: '',
    getToken() {
        return new Promise((resolve,reject) => {
            axios({
                url: 'https://drag-race.herokuapp.com/refresh',
                params: {
                    refresh_token: this.refresh_token
                }
            })
            .then((res) => {
                const { access_token } = res.data;
                resolve(access_token);
            })
        }); 
    }
}
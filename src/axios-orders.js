import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-4714f.firebaseio.com/'
});

export default instance;
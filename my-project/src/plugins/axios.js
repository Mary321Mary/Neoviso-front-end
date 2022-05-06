import axiosApi from 'axios';

const axios = axiosApi.create({
        baseURL: 'http://localhost:1337/api/'
});

//Use the window object to make it available globally.
window.axios = axios;
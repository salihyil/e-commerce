import axios from 'axios';

export const apiCaller = axios.create({
    baseURL: 'http://localhost:7001',
    headers: {
        //'Content-Type': 'application/json',
    },
});


//Interceptor Kullanarak HTTP İstek ve Yanıtlarını Yönetmek
apiCaller.interceptors.request.use(

    function (config) {
        console.log("config:", config.headers);
        console.log(localStorage.getItem('user'));// "jwt-tokeim"

        config.headers['token'] = localStorage.getItem('user')

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default apiCaller;
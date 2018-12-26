import axios from 'axios';

const config = {
    baseUrl: 'api',
    transformRequest: [
        function (data) {
            let ret = '';
            for (const it in data) {
                if (data.hasOwnProperty(it)) {
                    ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
                }
            }
            return ret;
        },
    ],
    transformResponse: [
        function (data) {
            return data;
        },
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    timeout: 10000,
    responseType: 'json',
};
// 响应拦截器
axios.interceptors.response.use(res => res.data);

export function get(url) {
    return axios.get(url, config);
}

export function post(url, data) {
    return axios.post(url, data, config);
}

// axios请求函数的封装

import axios from 'axios';

// 发送axios 的方法的包装
export const Axios = (url, data={}, method='GET') => {
    if(method === 'GET'){
        return axios.get(url, {
            params:data
        });
    } else {
        return axios.post(url,{
            ...data,
        });
    }
}
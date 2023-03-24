import axios from 'axios'
    let service = axios.create({
    // baseURL: 'http://192.168.31.101:3000/',
    // baseURL: 'http://192.168.1.9:3000/',
    // baseURL: 'http://192.168.43.35:3000/',
    baseURL: 'http://192.168.31.148:3000/',
    withCredentials: true,
    timeout: 5000,

  });

  export default service;
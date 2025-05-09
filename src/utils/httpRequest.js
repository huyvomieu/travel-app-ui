import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
});

// set token mỗi khi gửi request
httpRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    },
    (error) => Promise.reject(error),
);

export const get = async (path, options) => {
    const res = await httpRequest.get(path, options);
    return res.data;
};

export const post = async (path, data) => {
    const res = await httpRequest.post(path, data);
    return res;
};

export const put = async (path, options) => {
    const res = await httpRequest.put(path, options);
    return res;
};
export const delet = async (path, options) => {
    const res = await httpRequest.delete(path, options);
    return res;
};

export default httpRequest;

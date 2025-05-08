import axios from 'axios';
const token = localStorage.getItem('token');

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

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

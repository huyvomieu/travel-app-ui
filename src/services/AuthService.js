import * as httpRequest from '../utils/httpRequest';

export const postLogin = async (body) => {
    try {
        const res = await httpRequest.post('auth/login', body);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

import * as httpRequest from '../utils/httpRequest';

export const getCustomer = async (id) => {
    try {
        const res = await httpRequest.get('user', {
            params: { id },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteCustomer = async (ids) => {
    try {
        if (ids.length >= 1) {
            const res = await httpRequest.delet('user', {
                params: { ids },
            });
            return res;
        } else {
            throw new Error('Không có Id');
        }
    } catch (error) {
        console.log(error);
    }
};

export const postPutCustomer = async (body, type) => {
    try {
        if (type === 'PUT') {
            const res = await httpRequest.put('user?username=' + body.username, body);
            return res;
        } else {
            const res = await httpRequest.post('user', body);
            return res;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

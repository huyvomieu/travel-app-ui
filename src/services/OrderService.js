import * as httpRequest from '../utils/httpRequest';

export const getOrder = async (id, type, params) => {
    try {
        if (type?.toUpperCase() === 'DELETE') {
            const res = await httpRequest.delet('order', {
                params: { id },
            });
            return res;
        } else {
            const res = await httpRequest.get('order', {
                params: { id, ...params },
            });
            return res;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getOrderById = async (id, params) => {
    try {
        const res = await httpRequest.get('order/' + id, {
            params: { ...params },
        });
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const postPutorder = async (body, type) => {
    try {
        if (type.toUpperCase() === 'PUT') {
            const res = await httpRequest.put('order?id=' + body.Id, body);
            return res;
        } else {
            const res = await httpRequest.post('order', body);
            return res;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

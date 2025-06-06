import * as httpRequest from '../utils/httpRequest';

export const getDeleteCategory = async (id, type, params) => {
    try {
        if (type?.toUpperCase() === 'DELETE') {
            const res = await httpRequest.delet('category', {
                params: { id },
            });
            return res;
        } else {
            const res = await httpRequest.get('category', {
                params: { id, ...params },
            });
            return res;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const postPutCategory = async (body, type) => {
    try {
        if (type.toUpperCase() === 'PUT') {
            const res = await httpRequest.put('category?id=' + body.Id, body);
            return res;
        } else {
            const res = await httpRequest.post('category', body);
            return res;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

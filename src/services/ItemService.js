import * as httpRequest from '../utils/httpRequest';

export const getDeleteItem = async (id, type) => {
    try {
        if (type?.toUpperCase() === 'DELETE') {
            const res = await httpRequest.delet('Item', {
                params: { id },
            });
            return res;
        } else {
            const res = await httpRequest.get('Item', {
                params: { id },
            });
            return res;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const postPutItem = async (body, type) => {
    try {
        if (type.toUpperCase() === 'PUT') {
            const res = await httpRequest.put('Item?id=' + body.Id, body);
            return res;
        } else {
            const res = await httpRequest.post('Item', body);
            return res;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

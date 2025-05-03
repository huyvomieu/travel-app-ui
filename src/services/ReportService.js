import * as httpRequest from '../utils/httpRequest';

export const getReportSummary = async (d, m, y, params) => {
    try {
        const res = await httpRequest.get('report/summary', {
            params: { d, m, y, ...params },
        });
        return res;
    } catch (error) {
        console.log(error);
        return [];
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

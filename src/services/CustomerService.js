import * as httpRequest from '../utils/httpRequest';

export const getCustomer = async (id, params = {}) => {
    const path = id ? `user/${id}` : 'user';
    return httpRequest.get(path, { params });
};

export const deleteCustomer = async (ids) => {
    const userIds = Array.isArray(ids) ? ids.filter(Boolean) : [ids].filter(Boolean);

    if (!userIds.length) {
        throw new Error('Không có khách hàng nào được chọn');
    }

    return httpRequest.delet('user', {
        params: { ids: userIds.join(',') },
    });
};

export const postPutCustomer = async (body, type) => {
    if (type === 'PUT') {
        return httpRequest.put(`user/${body.username}`, body);
    }

    return httpRequest.post('user', body);
};

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

export const getRevenueByMonth = async (y, m, params) => {
    m = m.toString().padStart(2, '0');
    try {
        const res = await httpRequest.get('report/revenue-by-month', {
            params: { y, m, ...params },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBookingByMonth = async (y, params) => {
    try {
        const res = await httpRequest.get('report/booking-by-month', {
            params: { y, ...params },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

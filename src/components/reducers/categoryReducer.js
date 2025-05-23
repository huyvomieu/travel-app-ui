import { SET_DATA, GET_DATA } from './constants';
export const initState = {
    Id: '',
    ImagePath: '',
    Name: '',
    Description: '',
    status: 1,
};

export const setData = (payload, prop) => {
    return {
        type: SET_DATA,
        payload,
        prop,
    };
};
export const getData = (payload) => {
    return {
        type: GET_DATA,
        payload,
    };
};

function reducer(state, aciton) {
    switch (aciton.type) {
        case SET_DATA:
            return {
                ...state,
                [aciton.prop]: aciton.payload,
            };
        case GET_DATA:
            return aciton.payload;
        default:
            break;
    }
    return state;
}

export default reducer;

import {
    SET_DATA,
    SET_SEARCH_CATEGORY,
    SET_LIST_CATEGORY,
    SET_SEARCH_GUIDE,
    SET_LIST_TOURGUIDE,
    SET_CATEGORY,
    SET_TOURGUIDE,
    GET_DATA,
    SET_ALERT,
} from './constants';

export const initState = {
    data: {
        key: '',
        address: '', //
        bed: '',
        dateTour: '',
        description: '', //
        distance: '30Km', //
        duration: '',
        itemsId: null, //
        pic: '', //
        price: null, //
        score: 4.5, //
        timeTour: null,
        title: '', //
        tourGuideId: '',
        tourGuideName: '', //
        tourGuidePhone: '', //
        tourGuidePic: '', //
        categoryId: '', //
        status: 1,
    },
    listCategory: [],
    searchCategory: '',
    categoryName: '',

    searchTourGuide: '',
    listTourGuide: [],
    tourGuideName: '',

    alert: false,
    alertContent: '',
    alertStyle: 'success',
};
export const setData = (payload, prop) => {
    return {
        type: SET_DATA,
        payload,
        prop,
    };
};

export const setSearchCategory = (payload) => {
    return {
        payload,
        type: SET_SEARCH_CATEGORY,
    };
};

export const setListCategory = (payload) => {
    return {
        payload,
        type: SET_LIST_CATEGORY,
    };
};
export const setCategory = (payload) => {
    return {
        payload,
        type: SET_CATEGORY,
    };
};
export const setSearchTourGuide = (payload) => {
    return {
        payload,
        type: SET_SEARCH_GUIDE,
    };
};

export const setListTourGuide = (payload) => {
    return {
        payload,
        type: SET_LIST_TOURGUIDE,
    };
};
export const setTourGuide = (payload) => {
    return {
        payload,
        type: SET_TOURGUIDE,
    };
};
export const setAlert = (payload) => {
    return {
        payload,
        type: SET_ALERT,
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
                data: {
                    ...state.data,
                    [aciton.prop]: aciton.payload,
                },
            };
        case SET_CATEGORY:
            return {
                ...state,
                data: {
                    ...state.data,
                    categoryId: aciton.payload.Id,
                },
                categoryName: aciton.payload.Name,
            };
        case SET_TOURGUIDE:
            return {
                ...state,
                data: {
                    ...state.data,
                    tourGuideId: aciton.payload.key,
                    tourGuideName: aciton.payload.name,
                    tourGuidePhone: aciton.payload.phone,
                },
            };
        case SET_SEARCH_CATEGORY:
            return {
                ...state,
                searchCategory: aciton.payload,
            };
        case SET_LIST_CATEGORY:
            return {
                ...state,
                listCategory: aciton.payload,
            };
        case SET_SEARCH_GUIDE:
            return {
                ...state,
                searchTourGuide: aciton.payload,
            };
        case SET_LIST_TOURGUIDE:
            return {
                ...state,
                listTourGuide: aciton.payload,
            };
        case GET_DATA:
            const category = state.listCategory.filter((category) => category.Id === aciton.payload.categoryId);

            return {
                ...state,
                data: aciton.payload,
                categoryName: category[0]?.Name,
            };
        case SET_ALERT:
            console.log(aciton.payload);

            return {
                ...state,
                alert: aciton.payload.active,
                alertContent: aciton.payload.content,
                alertStyle: aciton.payload.danger ? 'danger' : 'success',
            };
        default:
            throw new Error('Không lọt case nào trong Item Reducer');
    }
}

export default reducer;

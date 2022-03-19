

export const GET_DATA = 'GET_DATA'
export const SET_FILTER= 'SET_FILTER'
export const SET_CURRENT = 'SET_CURRENT'

export const getData = (data) => {
    return {
        type: GET_DATA,
        payload: data
    }
}

export function getFetch(data) {
    return async (dispatch) => {
        dispatch(getData(data));
    }
}

export const setFilter = (data) => {
    return {
        type: SET_FILTER,
        payload: data
    }
}

export const setCurrent = (id) => {
    return {
        type: SET_CURRENT,
        payload: id
    }
}






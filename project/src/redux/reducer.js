
import { GET_DATA, SET_FILTER ,SET_CURRENT} from "./action";

const initialstate = {
    stores: [],
    filterArray: [],
    currentCity:0,
   

}

export default function reducer(state = initialstate, action) {
    switch (action.type) {

        case GET_DATA: return { ...state, stores: action.payload, filterArray: action.payload }
        case SET_FILTER: return { ...state, filterArray: action.payload }
        
        case SET_CURRENT: return { ...state, currentCity: action.payload }
        default: return state;
    }

}





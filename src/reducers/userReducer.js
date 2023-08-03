import { SET_COVER_PHOTO, SET_USER } from "../actions/actionTypes";


const INITIAL_STATE = {
    user: null,
    coverPhoto: null,
    like: 50,
}
const userReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case SET_USER:
            return ({
                ...state,
                user: action.user
            })
        case SET_COVER_PHOTO:
            return ({
                ...state,
                coverPhoto: action.payload, 
            })
        default:
            return state;
    }
}

export default userReducer;
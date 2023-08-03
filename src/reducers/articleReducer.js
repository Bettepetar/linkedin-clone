import { GET_ARTICLES, SET_LOADING_STATUS } from "../actions/actionTypes";

export const initState = {
    loading: false,
    progress: 0,
    articles: []
};

const articleReducer = (state = initState, action) =>{
    switch (action.type) {
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
                progress: action.progress
            }
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            }
        default:
            return state;
    }
}

export default articleReducer;
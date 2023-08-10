import { SET_ALL_MESSAGES, SET_ALL_USERS, SET_CHAT_LOADING, SET_INCOMING_MSG, SET_OUTGOING_MSG } from "../actions/actionTypes";

const initialState = {
    users: null,
    incomingMsg: [],
    outgoingMsg: [],
    messages: [],
    chatLoading: false,
}

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_USERS:
            return ({
                ...state,
                users: action.users
            })
        case SET_INCOMING_MSG:
            return ({
                ...state,
                incomingMsg: action.payload
            })
        case SET_OUTGOING_MSG:
            return ({
                ...state,
                outgoingMsg: action.payload
            })
        case SET_CHAT_LOADING:
            return ({
                ...state,
                chatLoading: action.status
            })
        case SET_ALL_MESSAGES:
            return ({
                ...state,
                messages: action.payload
            })
            
        default:
            return state;
    }
}
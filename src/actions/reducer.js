import { SET_USER, SET_CHANNEL } from './actiontypes';
import { combineReducers } from "redux";

let defaultState = {
    currentUser: null
}

const userReducer = (state = defaultState, action) => {
    if (action.type === SET_USER) {
        let payload = action.payload;
        state = { ...payload };
        return state;
    }
    return state;
}

let defaultChannelState = {
    currentChannel: null
}

const channelReducer = (state = defaultChannelState, action) => {
    if (action.type === SET_CHANNEL) {
        let payload = action.payload;
        state = { ...payload };
        return state;
    }
    return state;
}

export const combinedReducers = combineReducers({ user: userReducer, channel: channelReducer })
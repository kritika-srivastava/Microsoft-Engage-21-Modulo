import { SET_USER, SET_CHANNEL, SET_FAVOURITE_CHANNEL, REMOVE_FAVOURITE_CHANNEL } from "./actiontypes";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const setChannel = (channel) => {
    return {
        type: SET_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}

export const setFavouriteChannel = (channel) => {
    return {
        type: SET_FAVOURITE_CHANNEL,
        payload: {
            favouriteChannel: channel
        }
    }
}

export const removeFavouriteChannel = (channel) => {
    return {
        type: REMOVE_FAVOURITE_CHANNEL,
        payload: {
            favouriteChannel: channel
        }
    }
}
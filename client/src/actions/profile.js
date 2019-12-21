import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS
} from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get all profiles
export const getProfiles = text => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    try {
        if (text === '' || text === ' ' || text === null) {
            text = '-1';
        }
        const res = await axios.get(`/api/profile/search-profiles/${text}`);
        console.log('test');
        console.log(text);

        dispatch({
            type: GET_PROFILES,
            payload: res.data.profiles
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

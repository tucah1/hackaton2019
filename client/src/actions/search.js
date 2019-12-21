import { SEARCH_USER, SEARCH_ERROR } from './types';

//Set state.search.user
export const setUser = user => async dispatch => {
    try {
        dispatch({
            type: SEARCH_USER,
            payload: user
        });
    } catch (err) {
        dispatch({
            type: SEARCH_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

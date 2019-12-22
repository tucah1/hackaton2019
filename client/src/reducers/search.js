import { SEARCH_USER, SEARCH_ERROR } from '../actions/types';

const initialState = {
    user: null,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SEARCH_USER:
            return {
                ...state,
                user: payload
            };
        case SEARCH_ERROR:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}

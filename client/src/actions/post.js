import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_COMMENT_LIKES
} from './types';

// Get posts
export const getPosts = text => async dispatch => {
    console.log(text);

    if (text === null || text === '' || text === ' ' || text === undefined) {
        text = '-1';
    }
    try {
        const config = {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        };
        const res = await axios.get(
            `/api/questions/search-questions/${text}`,
            config
        );

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Add post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    };

    try {
        console.log(formData);

        const res = await axios.post(
            '/api/questions',
            formData.formData,
            config
        );

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Question Created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/questions/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(
            `/api/questions/answers/${postId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Answer Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/questions/answers/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Add like
export const addLikeQuestion = id => async dispatch => {
    try {
        const res = await axios.put(`/api/questions/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Remove like
export const removeLikeQuestion = id => async dispatch => {
    try {
        const res = await axios.put(`/api/questions/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Add like
export const addLikeAnswer = (idQ, idA) => async dispatch => {
    try {
        const res = await axios.put(
            `/api/questions/answers/like/${idQ}/${idA}`
        );

        dispatch({
            type: UPDATE_COMMENT_LIKES,
            payload: { idQ, idA, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Remove like
export const removeLikeAnswer = (idQ, idA) => async dispatch => {
    try {
        const res = await axios.put(
            `/api/questions/answers/unlike/${idQ}/${idA}`
        );

        dispatch({
            type: UPDATE_COMMENT_LIKES,
            payload: { idQ, idA, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

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
    UPDATE_COMMENT_LIKES,
    USER_LOADED,
    QUESTIONS_ANSWERS
} from './types';

// Get posts
export const getPosts = text => async dispatch => {
    if (text === null || text === '' || text === ' ' || text === undefined) {
        text = '-1';
    } else {
        text = text.trim().replace(/\s/g, '_');
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

// Get questions and answers
export const getQandA = (id, post) => async dispatch => {
    try {
        const config = {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        };
        const res = await axios.get(`/api/questions/search-qa/${id}`, config);

        dispatch({
            type: QUESTIONS_ANSWERS,
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
export const getPost = (id, post) => async dispatch => {
    const config = {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    };

    try {
        const res = await axios.get(`/api/questions/${id}`, config);
        const res2 = await axios.get('/api/profile/me', config);
        dispatch({
            type: GET_POST,
            payload: res.data
        });

        dispatch({
            type: USER_LOADED,
            payload: res2.data
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
// Delete post
export const deletePost = (id, history) => async dispatch => {
    const config = {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    };
    try {
        console.log('test');

        await axios.delete(`/api/questions/${id}`, config);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
        history.push('/questions');
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
    console.log(formData);
    console.log(postId);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
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
    console.log(postId);
    console.log(commentId);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    };
    try {
        await axios.delete(
            `/api/questions/answers/${postId}/${commentId}`,
            config
        );
        console.log(postId);
        console.log(commentId);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.message
            }
        });
    }
};

// Add like
export const addLikeQuestion = id => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    };

    try {
        const res = await axios.put(`/api/questions/like/${id}`, config);

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
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    };
    try {
        const res = await axios.put(`/api/questions/unlike/${id}`, config);

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
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    };
    try {
        const res = await axios.put(
            `/api/questions/answers/like/${idQ}/${idA}`,
            config
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
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    };
    try {
        const res = await axios.put(
            `/api/questions/answers/unlike/${idQ}/${idA}`,
            config
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

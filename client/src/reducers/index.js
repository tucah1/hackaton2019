import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import search from './search';
import post from './post';

export default combineReducers({
    alert,
    auth,
    profile,
    search,
    post
});

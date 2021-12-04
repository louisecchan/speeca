import {combineReducers} from 'redux';
import Todo from './TodoReducer';
import User from './UserReducer';

const rootReducer=combineReducers({
    Todo,
    User
})

export default rootReducer;

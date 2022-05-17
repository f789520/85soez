import { combineReducers } from 'redux';
import filterReducer from './filter.js';
import todosReducer from './todos.js';
import {firestoreReducer} from "redux-firestore"

const todoApp = combineReducers({
    filterReducer,
    todosReducer:todosReducer,
    firestoreReducer:firestoreReducer,//連上了!!!!

});

export default todoApp;
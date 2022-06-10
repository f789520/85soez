import { combineReducers } from 'redux';
 
import {firestoreReducer} from "redux-firestore"

const todoApp = combineReducers({
    
    
    firestoreReducer:firestoreReducer,//連上了!!!!
    

});

export default todoApp;
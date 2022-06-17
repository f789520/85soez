import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducer/combine";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import  fire from './components/fire'
import 'firebase/firestore';
import 'firebase/firestore' 

const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(fire),
    )
    );

export default store;
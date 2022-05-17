import * as types from './ActionTypes';
import db from '../components/fire'
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    serverTimestamp,
} from 'firebase/firestore'

export const addTask = (taskName) => {
    return (dispatch) => {
        addDoc(collection(db, "todosbook"), { taskName, timestamp: serverTimestamp(), isCompleted: false }
        ).then(() => {
            dispatch({
                type: "ADD_TASK", taskName
            });
        }
        )
        // .catch(err => {
        //     dispatch({
        //         type: 'ADD_TASK_ERROR'
        //     }, err);
        // });
        //   dispatch({ type:   "ADD_TASK", taskName });
    }
};


export function deleteTask(id) {
    return (dispatch) => {
        deleteDoc(doc(db, "todosbook", id)
        ).then(() => {
            dispatch({
                type: types.DELETE_TASK, id
            });
        }
        )
    }
}

export function toggleTask(id, isCompleted) {
    return (dispatch) => {
        updateDoc(doc(db, "todosbook", id), { isCompleted }
        ).then(() => {
            dispatch({
                type: types.TOGGLE_TASK, id, isCompleted
            });
        }
        )
    }
}

export function editTask(id, taskName) {
 
    return (dispatch) => {
        updateDoc(doc(db, "todosbook", id), { taskName, timestamp: serverTimestamp() }
        ).then(() => {
            dispatch({
                type: "EDIT_TASK", id, taskName
            });
        }
        )
    }
};



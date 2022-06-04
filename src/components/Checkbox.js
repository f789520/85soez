import React, { useState } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import Favorite from "@material-ui/icons/Favorite";
import IconButton from '@material-ui/core/IconButton';
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore'
import db from '../components/fire'
import {
    GoogleAuthProvider,
    FacebookAuthProvider, getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile
} from "firebase/auth";
import { useAuthValue } from './AuthContext'

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { height } from '@mui/system';


// export function createFav(user) {
//     console.log('user', user)

//     // return addDoc(collection(db, "favs" ), {
//     //     user: user,
//     //     timestamp: serverTimestamp(),
//     //     // website: url
//     // }

//     return setDoc(doc(db, "favs",user,"ids" ), {
//         user: user,
//         timestamp: serverTimestamp(),
//         // website: url
//     }

//     ).then(function (docRef) {
//         console.log("Tutorial created with ID: ", docRef);
//     })
//         .catch(function (error) {
//             console.error("Error adding Tutorial: ", error);
//         });;
// }


export const Checkboxs = React.forwardRef(({ indeterminate, ...rest }, ref) => {

    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    const [fav, setFav] = React.useState(false);
    const auth = getAuth();
    // const user = currentUser.uid;

    const { currentUser } = useAuthValue()


    // console.log('...rest', { rest })
    // console.log('props',)
    // console.log('resolvedRef', { resolvedRef })
   
 



    function handleFav(e) {

        // setFav(!fav)
        console.log('1111111111111111111111111111111111111111111111111', e )
        const user = currentUser.uid;
        if (fav !== true) {
            //save it to firestore
            console.log('auth.user.id', user)
            createFav(user)
            //save ID to localstorage? but this will fail if they come back

        } else {
            console.log('delete me?')
            // console.log(auth.user.id)
            // deleteFav("nordvpn.com", auth.user.id)
            //or delete it from firestore
            //delete it where 
        }

    }

    function createFav(user) {
        console.log('user', user)

        return addDoc(collection(db, "favs", user, "ids"), {
            user: user,
            timestamp: serverTimestamp(),
            // website: url
        }

            // return setDoc(doc(db, "favs", user, "ids"), {
            //     user: user,
            //     timestamp: serverTimestamp(),
            //     // website: url
            // }

        ).then(function (docRef) {
            console.log("Tutorial created with ID: ", docRef);
        })
            .catch(function (error) {
                console.error("Error adding Tutorial: ", error);
            });;
    }


    React.useEffect(() => {

        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])


    return (
        <>
            {/* <p>
                {checked ? 'Checked' : 'Not checked'}
            </p> */}

            <Checkbox  aria-label="fav" onClick={(e)=>  handleFav }    icon={<FavoriteBorder    />}  checkedIcon={<Favorite      />} type='checkbox' ref={resolvedRef} {...rest} />
            {/* <Checkbox    aria-label="fav"  onChange={ handleFav } icon={<FavoriteBorder  />} checkedIcon={<Favorite />} type='checkbox' ref={resolvedRef} {...rest} /> */}

            {/* {!fav &&
                <IconButton style={{ VISIBILITY: "hidden", display: " " }} onClick={() => { handleFav() }} aria-label="delete" color="primary">
                    <FavoriteBorderIcon style={{ VISIBILITY: "hidden" }}  ></FavoriteBorderIcon>
                </IconButton>
            }
            {fav &&
                <IconButton style={{ VISIBILITY: "hidden", display: " " }} onClick={() => { handleFav() }} aria-label="delete" color="primary">

                    <Favorite style={{ VISIBILITY: "hidden" }}   ></Favorite>
                </IconButton>
            } */}

        </>
    )
})
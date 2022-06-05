import React from 'react';
import { collection, addDoc, serverTimestamp, } from 'firebase/firestore'
import db from '../components/fire'
import { getAuth, } from "firebase/auth";
import { useAuthValue } from './AuthContext'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite'; 

export const Checkboxs = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    const [fav, setFav] = React.useState(false);
    const auth = getAuth();
    const { currentUser } = useAuthValue()
    function handleFav(e) {
        const user = currentUser.uid;
        if (fav !== true) {
            createFav(user)
        } else {
            console.log('delete me?')
        }
    }

    function createFav(user) {
        return addDoc(collection(db, "favs", user, "ids"), {
            user: user,
            timestamp: serverTimestamp(),
        }
        ).then(function (docRef) {
            console.log("Tutorial created with ID: ", docRef);
        })
            .catch(function (error) {
                console.error("Error adding Tutorial: ", error);
            }); 
    } 

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate
    ])

    return (
        <>
            {/* <p>
                {checked ? 'Checked' : 'Not checked'}
            </p> */} 
            <Checkbox aria-label="fav" onClick={(e) => handleFav} icon={<FavoriteBorder />} checkedIcon={<Favorite />} type='checkbox' ref={resolvedRef} {...rest} />
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
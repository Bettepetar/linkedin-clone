import { auth, provider, storage } from "../firebaseApp";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GET_ARTICLES, SET_COVER_PHOTO, SET_LOADING_STATUS, SET_USER, SET_ALL_USERS, SET_CHAT_LOADING, SET_INCOMING_MSG, SET_OUTGOING_MSG, SET_ALL_MESSAGES } from "./actionTypes";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db from "../firebaseApp";
import { addDoc, and, collection, onSnapshot, or, orderBy, query, where } from "firebase/firestore";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload
});
export const setCoverPhoto = (payload) =>({
    type: SET_COVER_PHOTO,
    payload: payload,
}); 
export const setAllUsers = (payload) => ({
    type: SET_ALL_USERS,
    users: payload
})
export const setAllMsg = (payload) => ({
    type:  SET_ALL_MESSAGES,
    payload: payload
})

export const setIncomingMSG = (payload) => ({
    type: SET_INCOMING_MSG,
    payload: payload
})
export const setOutgoingMSG = (payload) => ({
    type: SET_OUTGOING_MSG,
    payload: payload
})

export const setChatLoading = (payload) => ({
    type: SET_CHAT_LOADING,
    status: payload
})
export const setloading = (status, progress = 0) =>({
    type: SET_LOADING_STATUS,
    status: status,
    progress: progress
})
export function signInAPI(){
    return ((dispatch) => {
        signInWithPopup(auth, provider)
        .then((payload) => {
            // save to db
            console.log(payload.additionalUserInfo?.isNewUser)
            console.log(payload.additionalUserInfo)
            console.log(payload)
            // const colRef = collection(db, 'users')
            // addDoc(colRef, {
            //     displayName: payload.user.displayName,
            //     photoURL: payload.user.photoURL,
            //     email: payload.user.email,
            //     uid: payload.user.uid,
            //     coverPhoto: '',
            // }).then(() => dispatch(setUser(payload.user)))
            dispatch(setUser(payload.user));
            console.log(payload);
        }).catch(error => alert(error.message));
    })
}
export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload
})

export function getUserAuth(){
    return (dispatch) =>{
        onAuthStateChanged(auth, (user) =>{
            if(user){
               return dispatch(setUser(user))
            }
        })
    }
}

export function signOutAPI(){
    return ((dispatch) => {
        signOut(auth).then(() => {
            dispatch(setUser(null))
        })
    })
}


export function postArticleAPI(payload){
    return ((dispatch) => {

        dispatch(setloading(true))//dispatch for loading status

        if(payload.image !== ""){
            const storageRef = ref(storage, `images/${payload.image.name}`);
            // const upload = ref(storageRef, File);
            const upload = uploadBytesResumable(storageRef, payload.image);
            upload.on('state_changed', 
            (snapshot) => {
                const progress = Math.round(Number((snapshot.bytesTransferred / snapshot.totalBytes) * 100));

                console.log('Upload is ' + progress + '% done');
                dispatch(setloading(true, progress))
                switch (snapshot.state) {
                    case 'pasued':
                        console.log('upload is paused');
                        break;
                    case 'running': 
                        console.log('upload is running')
                        break;
                    default:
                        break;
                }
            }, 
            (error) => { console.log(error.code)
            }, 
            () => {
                getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                    //PROMISE if Img uploaded succesfully
                    console.log('File available at', downloadURL);
                    addDoc(collection(db, 'article'), {
                            author: {
                                description: payload.user.email,
                                title: payload.user.displayName,
                                date: payload.timeStamp,
                                image: payload.user.photoURL
                            },
                            video: payload.video,
                            shareImg:  downloadURL,
                            comments: 0,
                            description: payload.description,
                        })
                        console.log(`added to db`);
                        dispatch(setloading(false))
                });
            }
            );
        }else if(payload.video){
            addDoc(collection(db, 'article'), {
                author: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timeStamp,
                    image: payload.user.photoURL
                },
                video: payload.video,
                shareImg:  '',
                comments: 0,
                description: payload.description,
            })
            dispatch(setloading(false))
        } else if (payload.image === "" && payload.video === ""){
            addDoc(collection(db, 'article'), {
                author: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timeStamp,
                    image: payload.user.photoURL
                },
                video: payload.video,
                shareImg:  '',
                comments: 0,
                description: payload.description,
            })
            dispatch(setloading(false))
        }
    })
}


export const getArticlesAPI = () => {
    return (dispatch) => {
        let payload;

        const colRef = collection(db, 'article');
        const q = query(colRef, orderBy('author.date', 'desc'))

        onSnapshot(q, (snapshot) =>{
            // payload = snapshot.docs.map((doc) =>( doc.data()));
            payload = snapshot.docs.map((doc) =>({ ...doc.data(), id: doc.id }));
            dispatch(getArticles(payload))
        })
    }
}


export const getAllUsersAPI = () => {
    return (dispatch) => {
        let payload;
        const colRef = collection(db, 'users');
        onSnapshot(colRef, (snapshot) => {
            payload = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            dispatch(setAllUsers(payload))
        })
    }
}

export const getIncomingMsgAPI = (user) => {
    return (dispatch) => {
        dispatch(setChatLoading(true))
        let payload;
        const colRef = collection(db, 'messages')
        const q = query(colRef, where('recieverID', '==', user))
        // const q = query(colRef, where('recieverID', '==', user), where('senderID', '==', 'vsvWFvjbZxTL3azErCVGFdCTQvL2'))
        onSnapshot(q, (snapshot) => {
            payload = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            dispatch(setIncomingMSG(payload))
            dispatch(setChatLoading(false))
        })
    }
}

export const getOutgoingMsgAPI = (user) => {
    return (dispatch) => {
        dispatch(setChatLoading(true))
        let payload;
        const colRef = collection(db, 'messages')
        const q = query(colRef, where('senderID', '==', user))
        // const q = query(colRef, where('recieverID', '==', user), where('senderID', '==', 'vsvWFvjbZxTL3azErCVGFdCTQvL2'))
        onSnapshot(q, (snapshot) => {
            payload = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            dispatch(setOutgoingMSG(payload))
            dispatch(setChatLoading(false))
        })
    }
}



export const getAllMsgs = (user) => {
    return (dispatch) => {
        dispatch(setChatLoading(true))
        let payload;
        const colRef = collection(db, 'messages')
        const q = query(colRef, or(where('recieverID', '==', user), where('senderID', '==', user)), orderBy('timeStamp'))
        onSnapshot(q, (snapshot) => {
            payload = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            dispatch(setAllMsg(payload))
            console.log(payload)
            dispatch(setChatLoading(false))
        })
    }
}


export const getChat = (userID) => {
    console.log(userID)
}
export const sendMsgAPI = (payload) => {
    return (dispatch) => {
            dispatch(setChatLoading(true))
        addDoc(collection(db, 'messages'), {
            text: payload.text,
            recieverID: payload.recieverID,
            senderID: payload.senderID,
            timeStamp: payload.timeStamp
        }).then(() => {
            dispatch(setChatLoading(false))
        })
    }
}







// const colRef = collection(db, 'article');
// const q = query(colRef, orderBy('author.date', 'desc'))

// onSnapshot(q, (snapshot) =>{
//     let books = [ ];
//     snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id:doc.id})
//     })
//     console.log(books)
//     console.log(books[0].author.date.toDate())
// })
// onSnapshot(q, (snapshot) => {
//     let books = [ ];
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id:doc.id})
//   })
//   console.log(books)
//   });

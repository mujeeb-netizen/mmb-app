import firebase from "../../firebase/firebase";


export default function DeleteItem(cName, id) {

    const linkRef = firebase.db.collection(cName).doc(id)
    return linkRef
};


import firebase from "../../firebase/firebase";


export default function AddNewItem(cName, data) {

    firebase.db.collection(cName).add(data);
};
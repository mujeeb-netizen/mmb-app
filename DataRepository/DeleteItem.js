import firebase from "../../firebase/firebase";


export default function DeleteItem(cName, id) {

    const linkRef = firebase.db.collection(cName).doc(id);
    linkRef
        .delete()
        .then(() => {
            Alert.alert(`Item deleted.`);
        })
        .catch(err => {
            Alert.alert("Error deleting document:", err);
        });
};
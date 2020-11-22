import firebase from "../../firebase/firebase";


export default function UpdateItem(cName, id,data) {

    const voteRef = firebase.db.collection(cName).doc(id);
    voteRef.get().then(doc => {
        if (doc.exists) {
            var d = new Date();
            voteRef.update(data);
        }
    });
};
import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import RadioForm, { RadioButton, RadioButtonTextInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon, Header, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import firebase from "../firebase/firebase";
import FloatingLabelInput from 'react-native-floating-label-input';
import { add } from 'react-native-reanimated';
export default function SavedKin({ navigation, navigation: { goBack } }) {

    const docid = useSelector(state => state.docid)
    const uid2 = useSelector(state => state.uid)
    const [pname, setPname] = React.useState(null);
    const [rel, setRel] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [town, setTown] = React.useState(null);
    const [postal, setPostal] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [tele, setTele] = React.useState(null);
    const [istele, setIstele] = React.useState(true);
    const [isemail, setIsemail] = React.useState(true);
    const [ispostal, setIspostal] = React.useState(true);
    const [istown, setIstown] = React.useState(true);
    const [isaddress, setIsaddress] = React.useState(true);
    const [isrel, setIsrel] = React.useState(true);
    const [ispname, setIspname] = React.useState(true);
    const [isSign, setLoginload] = React.useState(true);
    var [iskin, setIskin] = React.useState(null);
    const [once, setOnce] = React.useState(true);
    var [kinData, setKinData] = React.useState([]);

    useEffect(() => {
        if (kinData == "") {
            getKinDetails()
            alert(JSON.stringify(kinData))
        }
       
               
        



    })
    async function getKinDetails() {

        await firebase.db.collection('users').where("uid", "==", uid2.replace(/['"]+/g, ''))
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    setKinData(doc.data().NextKin)
                  


                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

   
   

        return (
            <Text> Already Saved</Text>
        );
      
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

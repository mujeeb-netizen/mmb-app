import React, { useEffect } from 'react';
import { StyleSheet, Text, RefreshControl, TouchableOpacity, View, Alert, Platform, ScrollView, KeyboardAvoidingView, Picker, Share } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Divider, TextInput, Caption } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { Icon, Header, Input, ListItem, Card, CardItem, Button as ElementButton, Overlay, PricingCard } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import firebase from "../firebase/firebase";
import LovedOne from './LovedOne';
import { GiftedChat } from 'react-native-gifted-chat'
export default function Chat({ navigation, route, navigation: { goBack } }) {
    const uid2 = useSelector(state => state.uid)
    const fname = useSelector(state => state.fname)
    const lname = useSelector(state => state.lname)
    const { gid } = route.params;
   
    const [messages, setMessages] = React.useState([
         
    ]);

    console.log(messages)
    useEffect(() => {
     getmessages()

    }, []);


    async function getmessages() {
  setMessages([])  
        const doc = firebase.db.collection('group_messages').doc(gid);

        const observer = doc.onSnapshot(docSnapshot => {

             //const data = docSnapshot.map(doc => {
              
            //        return { id: doc.id, ...doc.data() };
                


            //});
            // ...
            if (docSnapshot.data() != "undefined" && typeof docSnapshot.data() != "undefined") {
                console.log(docSnapshot.data().messages)
                 
                setMessages(docSnapshot.data().messages)

            }
           
           
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
        
      
    }
 
    async function sendMessage(message) {
      
 
        const voteRef2 = await firebase.db.collection("group_messages").doc(gid);
        voteRef2.get().then(doc => {
            if (doc.exists) {
                
                const prev = doc.data().messages
                const newMessage = {

                    _id: gid,
                    text: fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ": " + message[0].text,
                    createdAt: new Date().toUTCString(),
                    user: {
                        _id: uid2,
                        name: fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, ''),
                    
                    },


                }
                const message_ = [...prev, newMessage];

                return voteRef2.update({ messages: message_ });
            }
            else {

                
                const newLink = {
                    gid:gid,
                    messages: [{
                        _id: uid2,
                        text: fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ": " + message[0].text,
                        createdAt: new Date().toUTCString(),
                        user: {
                            _id: uid2,
                            name: fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, ''),

                        }

                    }
                    ]

                };
                const user12 = firebase.db.collection("group_messages").doc(gid).set(newLink);
            }
        })



    }
    return (

        <>

            <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                centerComponent={{ text: 'Group Chat', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}

                leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
            />

             
         
        
            <GiftedChat
                messages={messages.reverse()}
                showAvatarForEveryMessage={true}
                onSend={(message) => {
                
                    sendMessage(message)
                }}
                    user={{
                        _id: 1,
                    }}
                />
               
           
        </>


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

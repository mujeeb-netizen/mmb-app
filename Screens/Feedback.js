import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, RefreshControl, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import RadioForm, { RadioButton, RadioButtonTextInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon, Header, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button, Title, Avatar, Divider, Paragraph, Caption } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import firebase from "../firebase/firebase";
import * as Location from 'expo-location';
import { add, set } from 'react-native-reanimated';
export default function Feedback({ navigation, navigation: { goBack } }) {
    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const [sub, setSub] = React.useState(null);
    const [issub, setIssub] = React.useState(true);
    const [msg, setMsg] = React.useState(null);
    const [ismsg, setIsmsg] = React.useState(true);
    const [isSign, setLoginload] = React.useState(true);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
 
        wait(2000).then(() => { setRefreshing(false) });
    }, [refreshing]);
   
   
    const fname = useSelector(state => state.fname)
    const lname = useSelector(state => state.lname)
    const phone = useSelector(state => state.phone)
    const email = useSelector(state => state.email)
    
     
     
    async function savefeedback() {
        if (sub == null || sub.trim() == "") {
            setIssub(false);
            setLoginload(true);
        }
        else if (msg == null || msg.trim() == "") {
            setIsmsg(false);
            setLoginload(true);
        }
        else {
            let obj = {
                fname: fname,
                lname: lname,
                phone: phone,
                email: email,
                subject: sub,
                message:msg
            }
            const user12 = firebase.db.collection("feedback").add(obj);
            alert("Successfully sent.")
            navigation.navigate("Home")
        }
       
    }
   
     
   

        return (
            <>
                <Header
                    backgroundColor="#0095ff"
                    barStyle="light-content"
                    containerStyle={{ elevation: 5 }}
                    
                    leftComponent={<Ionicons name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
                />
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >

                    <Card title="Feedback" >

                       
                        <TextInput
                            isFocused={false}
                            inputStyles={{ marginTop: '1%' }}
                            customLabelStyles={{ alignText: 'right' }}
                            containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                            labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                            label="Subject" value={sub}
                            onChangeText={(text) => { setSub(text); setIssub(true) }}
                            style={{ width: '100%', color: 'black', marginBottom: issub ? '10%' : '0%' }}

                        />


                        <Text style={{ marginBottom: issub ? '0%' : '10%', color: 'red', display: issub ? 'none' : 'flex' }}>Please enter Subject.</Text>

                         <TextInput
                            isFocused={false}
                            inputStyles={{ marginTop: '1%' }}
                            customLabelStyles={{ alignText: 'right' }}
                            containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                            labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                            label="Message" value={msg}
                            onChangeText={(text) => { setMsg(text); setIsmsg(true) }}
                            style={{ width: '100%', color: 'black', marginBottom: ismsg ? '10%' : '0%' }}

                        />


                        <Text style={{ marginBottom: ismsg ? '0%' : '10%', color: 'red', display: ismsg ? 'none' : 'flex' }}>Please enter message.</Text>

                        {
                            !isSign ?
                                <Button mode="clear" loading color="rgb(32, 137, 220)"
                                >.. </Button>
                                :
                                <Button onPress={() => savefeedback()} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} >Save</Button>
                        }



                    </Card>

                </ScrollView>

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

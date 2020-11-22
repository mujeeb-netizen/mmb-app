import React from 'react';
import * as Google from "expo-google-app-auth"
import { AsyncStorage, Platform } from 'react-native';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import RadioForm, { RadioButton, RadioButtonTextInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon, Header, Input, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import FloatingLabelInput from 'react-native-floating-label-input';
import firebase from "../firebase/firebase"; 
import { editUser } from '../store/actions'
import * as GoogleSignIn from 'expo-google-sign-in';
import { set } from 'react-native-reanimated';
import * as Facebook from 'expo-facebook';
import { Bubbles } from 'react-native-loader';
 

export default function Login({ navigation }) {
     
    const dispatch = useDispatch()

    const [ispwd, setIspwd] = React.useState(true);
    const [isemail, setIsemail] = React.useState(true);
   
    const [isSign, setIsSign] = React.useState(true);
   
    const [fname, setFname] = React.useState(null);
   
    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);
   
    
    const [loginload, setLoginload] = React.useState(false);
    var user1;

    useEffect(() => {
       

            setTimeout(() => {

                setLoginload(true)
            }, 2000)

     

    }, []);
    async function LoginMe() {
         

        
        try { 
            await Facebook.initializeAsync('2682893525260582');
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile','email'],
                });
                if (type === 'success') {
                    // Get the user's name using Facebook's Graph API
                    fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                        .then(response => response.json())
                        .then(data => {
                            navigation.navigate("Signup", { name: data.name, email_: data.email, googleSignup: true })
                        })
                        .catch(e => console.log(e))
                } else {
                    // type === 'cancel'
                }
            }
         catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
        }
    

    logout = () => {
        setLoggedinStatus(false);
        setUserData(null);
        setImageLoadStatus(false);
    }

   
     
   

   

   

    async function signinG() {
        try {
            const result = await Google.logInAsync({
                androidStandaloneAppClientId: "872028922620-bk126bk3puqa79k8l1c0ts7c345bc086.apps.googleusercontent.com",
                androidProjectId:'focus-vim-242421',
                scopes: ["profile", "email"]
            })
            if (result.type === "success") {
                navigation.navigate("Signup", { name: result.user.name, email_: result.user.email,googleSignup: true })
                
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }

 
    async function savedate(user1) {
        await AsyncStorage.setItem('userId', JSON.stringify(user1.user.uid));
    }
    async function authenticateUser() {
        setLoginload(false);
      
        let name = fname;
        try {

            if (true) {

                try {
                    if (email == null || email.trim() == "") {
                        setIsemail(false)
                        setLoginload(true);
                    }
                    else if (password == null || password == "") {
                        setIspwd(false)
                        setLoginload(true);
                    }
                    else if (password.length < 6) {
                        alert("Minimum password length: 6")
                        setIspwd(false)
                        setLoginload(true);
                    }
                    else {
                        user1 = await firebase.login(email.trim(), password)

                            .catch(error => {

                                if (error.code == "auth/argument-error") {
                                    Alert.alert("Please enter your credentials")
                                }
                                else if (error.code == "auth/invalid-email") {
                                    Alert.alert("Invalid Email")
                                }
                                else if (error.code == "auth/user-not-found") {
                                    Alert.alert("User Not Found.")
                                } else if (error.code == "auth/wrong-password") {
                                    Alert.alert("Password Incorrect.")
                                }
                                alert(err)
                            })
                        setLoginload(true);
                    }
                } catch (err) {
                   
                    setLoginload(true);
                }


                if (user1 != null) {

                            console.log(user1)
                            let userId;
                            savedate(user1);

                            await firebase.db.collection('users').where("uid", "==", user1.user.uid)
                                .get()
                                .then(function (querySnapshot) {
                                    querySnapshot.forEach(function (doc) {




                                        if (doc.data().googleSignup == true) {


                                            if (typeof doc.data().Security_Question.Question == "undefined") {

                                                AsyncStorage.setItem('IsSQ', JSON.stringify(null));


                                            }
                                            else {


                                                AsyncStorage.setItem('IsSQ', JSON.stringify(doc.data().Security_Question.Question));
                                                AsyncStorage.setItem('IsAns', JSON.stringify(doc.data().Security_Question.Answer));





                                            }
                                            if (typeof doc.data().LovedOne.pname == "undefined") {

                                                AsyncStorage.setItem('IsLO', JSON.stringify(null));


                                            }
                                            else {


                                                AsyncStorage.setItem('IsLO', JSON.stringify(doc.data().LovedOne.pname));
                                                




                                            }
                                            if (typeof doc.data().JoinedGroup.UID == "undefined") {

                                                AsyncStorage.setItem('IsJG', JSON.stringify(null));


                                            }
                                            else {


                                                AsyncStorage.setItem('IsJG', JSON.stringify(doc.data().JoinedGroup.UID ));
                                                




                                            }
                                         
                                            if (typeof doc.data().CreatedGroup.UID == "undefined") {

                                                AsyncStorage.setItem('IsCG', JSON.stringify(null));
                                               

                                            }
                                            else {


                                                AsyncStorage.setItem('IsCG', JSON.stringify(doc.data().CreatedGroup.UID ));
                                                




                                            }

                                            AsyncStorage.setItem('address', JSON.stringify(doc.data().address))

                                            AsyncStorage.setItem('zip', JSON.stringify(doc.data().postal_code))
                                            AsyncStorage.setItem('title', JSON.stringify(doc.data().title))
                                            AsyncStorage.setItem('docid', JSON.stringify(doc.id));
                                            AsyncStorage.setItem('email', JSON.stringify(doc.data().email));

                                            AsyncStorage.setItem('fname', JSON.stringify(doc.data().fname));
                                            AsyncStorage.setItem('customerId', JSON.stringify(doc.data().customerId));
                                            AsyncStorage.setItem('lname', JSON.stringify(doc.data().lname));
                                            AsyncStorage.setItem('town', JSON.stringify(doc.data().town));
                                            AsyncStorage.setItem('masjid', JSON.stringify(doc.data().masjid));
                                            AsyncStorage.setItem('phone', JSON.stringify(doc.data().phone));


                                            if (typeof doc.data().Security_Question.Question == "undefined") {

                                                dispatch(editUser({
                                                    lname: JSON.stringify(doc.data().lname),
                                                    title: JSON.stringify(doc.data().title),
                                                    fname: JSON.stringify(doc.data().fname),
                                                    zip: JSON.stringify(doc.data().postal_code),
                                                    address: JSON.stringify(doc.data().address),
                                                    email: JSON.stringify(doc.data().email),
                                                    town: JSON.stringify(doc.data().town),
                                                    masjid: JSON.stringify(doc.data().masjid),
                                                    phone: JSON.stringify(doc.data().phone),
                                                    customerId: JSON.stringify(doc.data().customerId),
                                                    docid: doc.id,
                                                    uid: user1.user.uid,
                                                    issq: JSON.stringify(null),
                                                    isans: JSON.stringify(null),
                                                    islo: JSON.stringify(null),
                                                    isjg: JSON.stringify(null),
                                                    iscg: JSON.stringify(null)
                                                }))
                                                console.log('seting value');
                                            }
                                            else {

                                                dispatch(editUser({
                                                    lname: JSON.stringify(doc.data().lname),
                                                    fname: JSON.stringify(doc.data().fname),
                                                    title: JSON.stringify(doc.data().title),
                                                    zip: JSON.stringify(doc.data().postal_code),
                                                    address: JSON.stringify(doc.data().address),
                                                    email: JSON.stringify(doc.data().email),
                                                    town: JSON.stringify(doc.data().town),
                                                    masjid: JSON.stringify(doc.data().masjid),
                                                    phone: JSON.stringify(doc.data().phone),
                                                    customerId: JSON.stringify(doc.data().customerId),
                                                    docid: doc.id,
                                                    uid: user1.user.uid,
                                                    issq: JSON.stringify(doc.data().Security_Question.Question),
                                                    isans: JSON.stringify(doc.data().Security_Question.Answer),
                                                    islo: JSON.stringify(typeof doc.data().LovedOne.pname == "undefined" ? null : doc.data().LovedOne.pname),
                                                    isjg: JSON.stringify(typeof doc.data().JoinedGroup.UID == "undefined" ? null : doc.data().JoinedGroup.UID),
                                                    iscg: JSON.stringify(typeof doc.data().CreatedGroup.UID == "undefined" ? null : doc.data().CreatedGroup.UID)
                                                }))
                                                console.log('seting value');
                                            }
                                        }
                                        else {
                                            //for testing purpose i set this to a false condition user1.user.emailVerified === false
                                            if (false) {
                                                Alert.alert(
                                                    'Email Not Verified',
                                                    'Send Verification Link',
                                                    [
                                                        { text: 'Cancel', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                                                        { text: 'Send', onPress: () => { user1.user.sendEmailVerification(); Alert.alert("Email Sent."); setLoginload(true); } },
                                                    ]
                                                );

                                                setLoginload(true);

                                            }
                                            else {

                                                if (typeof doc.data().Security_Question.Question == "undefined") {

                                                    AsyncStorage.setItem('IsSQ', JSON.stringify(null));


                                                }
                                                else {


                                                    AsyncStorage.setItem('IsSQ', JSON.stringify(doc.data().Security_Question.Question));
                                                    AsyncStorage.setItem('IsAns', JSON.stringify(doc.data().Security_Question.Answer));





                                                }
                                                if (typeof doc.data().LovedOne.pname == "undefined") {

                                                    AsyncStorage.setItem('IsLO', JSON.stringify(null));


                                                }
                                                else {


                                                    AsyncStorage.setItem('IsLO', JSON.stringify(doc.data().LovedOne.pname));





                                                }
                                                if (typeof doc.data().JoinedGroup.UID == "undefined") {

                                                    AsyncStorage.setItem('IsJG', JSON.stringify(null));


                                                }
                                                else {


                                                    AsyncStorage.setItem('IsJG', JSON.stringify(doc.data().JoinedGroup.UID));





                                                }
                                                 
                                                if (typeof doc.data().CreatedGroup.UID == "undefined") {

                                                    AsyncStorage.setItem('IsCG', JSON.stringify(null));


                                                }
                                                else {


                                                    AsyncStorage.setItem('IsCG', JSON.stringify(doc.data().CreatedGroup.UID));
                                                }
                                                AsyncStorage.setItem('address', JSON.stringify(doc.data().address))
                                                AsyncStorage.setItem('zip', JSON.stringify(doc.data().postal_code))
                                                AsyncStorage.setItem('title', JSON.stringify(doc.data().title))
                                                AsyncStorage.setItem('docid', JSON.stringify(doc.id));
                                                AsyncStorage.setItem('email', JSON.stringify(doc.data().email));
                                                AsyncStorage.setItem('fname', JSON.stringify(doc.data().fname));
                                                AsyncStorage.setItem('lname', JSON.stringify(doc.data().lname));
                                                AsyncStorage.setItem('town', JSON.stringify(doc.data().town));
                                                AsyncStorage.setItem('customerId', JSON.stringify(doc.data().customerId));
                                                AsyncStorage.setItem('masjid', JSON.stringify(doc.data().masjid));
                                                AsyncStorage.setItem('phone', JSON.stringify(doc.data().phone));
                                                if (typeof doc.data().Security_Question.Question == "undefined") {

                                                    dispatch(editUser({
                                                        lname: JSON.stringify(doc.data().lname),
                                                        title: JSON.stringify(doc.data().title),
                                                        fname: JSON.stringify(doc.data().fname),
                                                        zip: JSON.stringify(doc.data().postal_code),
                                                        address: JSON.stringify(doc.data().address),
                                                        email: JSON.stringify(doc.data().email),
                                                        town: JSON.stringify(doc.data().town),
                                                        masjid: JSON.stringify(doc.data().masjid),
                                                        phone: JSON.stringify(doc.data().phone),
                                                        customerId: JSON.stringify(doc.data().customerId),
                                                        docid: doc.id,
                                                        uid: user1.user.uid,
                                                        issq: JSON.stringify(null),
                                                        isans: JSON.stringify(null),
                                                    islo: JSON.stringify(null),
                                                        isjg: JSON.stringify(null),
                                                        iscg: JSON.stringify(null)
                                                    }))
                                                    console.log('seting value');
                                                }
                                                else {

                                                    dispatch(editUser({
                                                        lname: JSON.stringify(doc.data().lname),
                                                        fname: JSON.stringify(doc.data().fname),
                                                        title: JSON.stringify(doc.data().title),
                                                        zip: JSON.stringify(doc.data().postal_code),
                                                        address: JSON.stringify(doc.data().address),
                                                        email: JSON.stringify(doc.data().email),
                                                        town: JSON.stringify(doc.data().town),
                                                        masjid: JSON.stringify(doc.data().masjid),
                                                        phone: JSON.stringify(doc.data().phone),
                                                        customerId: JSON.stringify(doc.data().customerId),
                                                        docid: doc.id,
                                                        uid: user1.user.uid,
                                                        issq: JSON.stringify(doc.data().Security_Question.Question),
                                                        isans: JSON.stringify(doc.data().Security_Question.Answer),
                                                        islo: JSON.stringify(typeof doc.data().LovedOne.pname == "undefined" ? null : doc.data().LovedOne.pname),
                                                        isjg: JSON.stringify(typeof doc.data().JoinedGroup.UID == "undefined" ? null : doc.data().JoinedGroup.UID),
                                                        iscg: JSON.stringify(typeof doc.data().CreatedGroup.UID == "undefined" ? null : doc.data().CreatedGroup.UID)
                                             }))
                                                    console.log('seting value');
                                                }

                                            }

                                        }
                                    });
                                })
                                .catch(function (error) {
                                    console.log("Error getting documents: ", error);
                                });  
                }
            }


        }
        catch (err) {
 
            setIsSign(true)
            if (err.code == "auth/email-already-in-use") {
                Alert.alert("Email already in use.")
            }
            else if (err.code == "auth/invalid-email") {
                Alert.alert("Invalid Email")
            }
            else {
                alert(err)
            }
            setLoginload(true);
        }

    }
    if (!loginload) { 
        return (

            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}>
                {

                    Platform.OS == "ios" ?
                        <Text> Loading</Text> :
                        <Bubbles size={10} color="rgb(32, 137, 220)" />
                }
            </View>

        );
    }
    else {
        return (


            <>
                <Header
                    backgroundColor="#0095ff"
                    barStyle="light-content"
                    containerStyle={{ elevation: 5 }}
                       centerComponent={{ text: 'Login', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}
                />


                <KeyboardAvoidingView >
                    <ScrollView>


                        <View style={{ padding: '0%', paddingBottom: '0%', alignItems: 'center', marginTop: '10%', }}>


                            <Input
                                placeholder='Email'
                                leftIcon={
                                    <Ionicons name="md-mail" size={27} style={{ marginRight: '3%' }} color="rgb(32, 137, 220)" />
                                }
                                value={email} onChangeText={(text) => { setEmail(text); setIsemail(true) }}

                            />




                            <Text style={{ marginBottom: isemail ? '0%' : '0%', color: 'red', display: isemail ? 'none' : 'flex' }}>Please enter your valid email.</Text>

                            <View style={{ margin: '5%' }}>

                            </View>


                            <Input
                                placeholder='Password'
                                leftIcon={
                                    <Ionicons name="md-lock" size={27} style={{ marginRight: '3%' }} color="rgb(32, 137, 220)" />
                                }
                                onChangeText={(text) => { setPassword(text); setIspwd(true) }}
                                style={{ borderBottomColor: '#fff' }}
                                secureTextEntry={true}

                            />


                            <Text style={{ marginBottom: ispwd ? '0%' : '0%', color: 'red', display: ispwd ? 'none' : 'flex' }}>Please enter valid password.</Text>

                            <View style={{ margin: '5%' }}>

                            </View>




                        </View>
                        {!loginload ?
                            <Button mode="clear" loading color="rgb(32, 137, 220)"
                            >Loading </Button>
                            :
                            <Button onPress={authenticateUser} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '1%' }} buttonStyle={{ width: '90%' }} >CONTINUE</Button>}
                        <Button color="rgb(32, 137, 220)" mode="clear" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} onPress={() => { navigation.navigate("Signup", { name: null, email_: null, googleSignup: false }) }} >Create an account?</Button>

                        <View style={{
                            justifyContent: 'center',
                            flexDirection:  'row',
                            bottom: 0,
                            marginTop: '15%'


                        }}>
                            <View style={{
                                width: wp('100%'), justifyContent: 'center',
                                flexDirection: Platform.OS == "ios" ? "column-reverse" : 'row' }} >
                             
                                <Button onPress={() => (LoginMe())} color="rgb(32, 137, 220)" mode="clear" style={{ alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} >Signup with Facebook</Button>  
                                <Button onPress={signinG} color="rgb(32, 137, 220)" mode="clear" style={{ alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} >Signup with Google</Button>
                            </View>






                        </View>

                        <Divider />
                        <View style={{ marginTop: '10%' }}>
                               <Button color="rgb(32, 137, 220)" mode="clear" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} onPress={() => { navigation.navigate("ForgetPassword") }}>Forgotten Password?</Button>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

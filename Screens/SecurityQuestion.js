import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Platform, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Divider, TextInput } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { Icon, Header, Input, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Ionicons } from '@expo/vector-icons';
 
import firebase from "../firebase/firebase";
 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Community from './Community';
import GroupDashboard from './GroupDashboard';
import Donate from './Donate';
import Updates from './Updates';
import Notification from './Notification';
import News from './News';
import { Bubbles } from 'react-native-loader';
export default function SecurityQuestion({route  , navigation }) {
   
    const { email } = route.params;
    const { password } = route.params;
    const { fname } = route.params;
    const { lname } = route.params;
    const { address } = route.params;
    const { title } = route.params;
    const { town } = route.params;
    const { googleSignup } = route.params;
    const { postal_code } = route.params;
    const { masjid } = route.params;
    const { phone } = route.params;
    const { customerId } = route.params;

    const dispatch = useDispatch()
    //const uid2 = useSelector(state => state.uid)
    //const fname = useSelector(state => state.fname)
    //const lname = useSelector(state => state.lname)
    //const title = useSelector(state => state.title)
    //const address = useSelector(state => state.address)
    //const town = useSelector(state => state.town)
    //const masjid = useSelector(state => state.masjid)
    //const zip = useSelector(state => state.zip)
    //const email = useSelector(state => state.email)
    //const docid = useSelector(state => state.docid)
    //const issq2 = useSelector(state => state.issq)
    //const isans2 = useSelector(state => state.isans)
    //const islo = useSelector(state => state.islo)
    //const iscg = useSelector(state => state.iscg)
    //const isjg = useSelector(state => state.isjg)

    var [mainload, setMainload] = React.useState(false);
    var [ques, setQues] = React.useState(null);
    var [ques2, setQues2] = React.useState(null);
    var [ques3, setQues3] = React.useState(null);
    var [isques, setIsques] = React.useState(true);
    var [isques2, setIsques2] = React.useState(true);
    var [isques3, setIsques3] = React.useState(true);
    var [ans, setAns] = React.useState(null);
    var [ans2, setAns2] = React.useState(null);
    var [ans3, setAns3] = React.useState(null);
    var [isans1, setIsans] = React.useState(true);
    var [isans12, setIsans2] = React.useState(true);
    var [isans13, setIsans3] = React.useState(true);
    var [isa, setIsa] = React.useState(true);

    var [questions, setQuestions] = React.useState([]);

    var [loginload, setIsLoad] = React.useState(true);
    async function getQuestions() {

        await firebase.db.collection("Security_questions").onSnapshot(handleSnapshot_);
    }
    function handleSnapshot_(snapshot) {
        debugger
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setQuestions(links);
    }
    useEffect(() => {
        if (typeof issq2 == "undefined" || issq2 == null || issq2 == "null") {
            if (questions == "") {
                getQuestions()
            }

        }
        setTimeout(() => {

            setMainload(true)
        }, 2000)


    }, []);

    const CreateTabs = createBottomTabNavigator()
    async function authenticateUser() {
        try {
            setIsLoad(false)
            if (email != null || email != "null") {

                if (email) {
                    if (ques == null || ques == "") {
                        Alert.alert("Enter Question.");
                        setIsLoad(true)
                    } else if (ans == null || ans == "") {
                        Alert.alert("Enter Answer.");
                        setIsLoad(true)
                    } else if (ques2 == null || ques2 == "") {
                        Alert.alert("Enter Question.");
                        setIsLoad(true)
                    } else if (ans2 == null || ans2 == "") {
                        Alert.alert("Enter Answer.");
                        setIsLoad(true)
                    } else if (ques3 == null || ques3 == "") {
                        Alert.alert("Enter Question.");
                        setIsLoad(true)
                    } else if (ans3 == null || ans3 == "") {
                        Alert.alert("Enter Answer.");
                        setIsLoad(true)
                    }

                    else {
                      const user1 = await firebase.register(fname, email.trim(), password);
                        const Security_Question = { Question: ques, Answer: ans, Question2: ques2, Answer2: ans2, Question3: ques3, Answer3: ans3 };
                        const newLink = {
                            uid: user1.user.uid,
                            email: email,
                            fname: fname,
                            lname: lname,
                            address: address,
                            title: title,
                            town: town,
                            googleSignup: googleSignup,
                            postal_code: postal_code,
                            phone:phone,
                            masjid: masjid,
                            customerId: customerId,
                            Security_Question: Security_Question,
                            NextKin: [],
                            LovedOne: [],
                            JoinedGroup: [],
                            CreatedGroup: []
                        }
                        const user12 = firebase.db.collection("users").add(newLink);
                        if (googleSignup == false) {
                            user1.user.sendEmailVerification();
                            Alert.alert("Signed Up! Check Your Inbox to Confirm Your Email!")
                        }
                        else {
                            Alert.alert("Signed Up! You can login now!")
                        }
            
                     
                        navigation.navigate("Login")
                        //const voteRef = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
                        //voteRef.get().then(doc => {
                        //    if (doc.exists) {
                        //        const Security_Question = { Question: ques, Answer: ans, Question2: ques2, Answer2: ans2, Question3: ques3, Answer3: ans3 };

                        //        return voteRef.update({ Security_Question: Security_Question });
                        //    }
                        //}).then(function () {
                        //    AsyncStorage.setItem('IsSQ', JSON.stringify(ques));
                        //    AsyncStorage.setItem('IsAns', JSON.stringify(ans));
                        //    AsyncStorage.setItem('address', JSON.stringify(address))

                        //    AsyncStorage.setItem('zip', JSON.stringify(zip))
                        //    AsyncStorage.setItem('title', JSON.stringify(title))
                        //    AsyncStorage.setItem('docid', JSON.stringify(docid));
                        //    AsyncStorage.setItem('email', JSON.stringify(email));

                        //    AsyncStorage.setItem('fname', JSON.stringify(fname));
                        //    AsyncStorage.setItem('lname', JSON.stringify(lname));
                        //    AsyncStorage.setItem('town', JSON.stringify(town));
                        //    AsyncStorage.setItem('masjid', JSON.stringify(masjid));
                        //    AsyncStorage.setItem('uid', JSON.stringify(uid2));
                        //    if (islo == null) {
                        //        AsyncStorage.setItem('IsLO', JSON.stringify(null));
                        //    }
                        //    else {
                        //        AsyncStorage.setItem('IsLO', JSON.stringify(islo));
                        //    }

                        //    if (isjg == null) {
                        //        AsyncStorage.setItem('IsJG', JSON.stringify(null));
                        //    } else {
                        //        AsyncStorage.setItem('IsJG', JSON.stringify(isjg));
                        //    }

                        //    if (iscg == null) {
                        //        AsyncStorage.setItem('IsCG', JSON.stringify(null));
                        //    } else {
                        //        AsyncStorage.setItem('IsCG', JSON.stringify(iscg));
                        //    }
                          

                        //    dispatch(editUser({
                        //        lname: lname,
                        //        title: title,
                        //        fname: fname,
                        //        zip: zip,
                        //        address: address,
                        //        email: email,
                        //        docid: docid,
                        //        uid: uid2,
                        //        issq: JSON.stringify(ques),
                        //        isans: JSON.stringify(ans),
                        //        iscg: JSON.stringify(null),
                        //            isjg: JSON.stringify(null)
                        //    }))


                        //});

                        //setIsLoad(true)
                        //navigation.navigate("Home")
                    }
                }
            }
        }
        catch (err) {
            
            if (err.code == "auth/email-already-in-use") {
                Alert.alert("Email already in use.")
            }
            else if (err.code == "auth/invalid-email") {
                Alert.alert("Invalid Email")
            }
            else {

            }
            setIsLoad(true);
        }

    }
    if (!mainload) {
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
                        <Text> Loading </Text> :
                        <Bubbles size={10} color="rgb(32, 137, 220)" />
                }
            </View>

        );
    }
    else {
        if (typeof issq2 == "undefined" || issq2 == null || issq2 == "null") {
            return (
                <>


                    <Header
                        backgroundColor="#0095ff"
                        barStyle="light-content"
                        containerStyle={{ elevation: 5 }}
                        leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-menu" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
                        centerComponent={{ text: 'Security Question', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}
                    />
                    <ScrollView>
                        <Card title="Security Question" >
                        <View style={{ padding: '5%' }} >
                            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} >


                            <Picker

                                style={{ borderWidth: 1, fontSize: '1', borderColor: '#8797ff', padding: '2%', width: '100%', marginBottom: '2%' }}
                                selectedValue={ques}

                                onValueChange={(itemValue, itemIndex) => { setQues(itemValue); setIsques(true) }}
                            >
                                <Picker.Item label="--Select--" value="" />
                                {
                                    questions.map((links, i) => (


                                        <Picker.Item key={i} label={links.q} value={links.q} />


                                    ))}


                            </Picker>

                            <Text style={{ marginBottom: isques ? '0%' : '10%', color: 'red', display: isques ? 'none' : 'flex' }}>Please enter Question.</Text>


                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} label="Answer" value={ans} onChangeText={(text) => { setAns(text); setIsans(true) }} style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isans1 ? '10%' : '0%' }} />

                            <Picker

                                style={{ borderWidth: 1, fontSize: '1', borderColor: '#8797ff', padding: '2%', width: '100%', marginBottom: '2%' }}
                                selectedValue={ques2}

                                onValueChange={(itemValue, itemIndex) => { setQues2(itemValue); setIsques2(true) }}
                            >
                                <Picker.Item label="--Select--" value="" />
                                {
                                    questions.map((links, i) => (


                                        <Picker.Item key={i} label={links.q} value={links.q} />


                                    ))}

                            </Picker>

                            <Text style={{ marginBottom: isques2 ? '0%' : '10%', color: 'red', display: isques2 ? 'none' : 'flex' }}>Please enter Question.</Text>


                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} label="Answer" value={ans2} onChangeText={(text) => { setAns2(text); setIsans2(true) }} style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isans12 ? '10%' : '0%' }} />

                            <Picker

                                style={{ borderWidth: 1, fontSize: '1', borderColor: '#8797ff', padding: '2%', width: '100%', marginBottom: '2%' }}
                                selectedValue={ques3}

                                onValueChange={(itemValue, itemIndex) => { setQues3(itemValue); setIsques3(true) }}
                            >
                                <Picker.Item label="--Select--" value="" />
                                {
                                    questions.map((links, i) => (



                                        <Picker.Item key={i} label={links.q} value={links.q} />


                                    ))}

                            </Picker>

                            <Text style={{ marginBottom: isques3 ? '0%' : '10%', color: 'red', display: isques3 ? 'none' : 'flex' }}>Please enter Question.</Text>


                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} label="Answer" value={ans3} onChangeText={(text) => { setAns3(text); setIsans3(true) }} style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isans13 ? '10%' : '0%' }} />


                            <Text style={{ marginBottom: isans13 ? '0%' : '10%', color: 'red', display: isans13 ? 'none' : 'flex' }}>Please enter Answer.</Text>



                            {!loginload ?
                                <Button mode="clear" loading color="rgb(32, 137, 220)"
                                >Loading </Button>
                                : 
                                <Button onPress={() => { authenticateUser() }} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} >CONTINUE</Button>}










                            </KeyboardAvoidingView>
                            </View>
                        </Card>
                    </ScrollView>
                </>
            );
        }
       
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        width: 100,
        height: 100
    }
});

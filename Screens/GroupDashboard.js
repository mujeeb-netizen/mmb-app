import React, { useEffect } from 'react';
import { StyleSheet, Text, RefreshControl, TouchableOpacity, View, Alert, Platform, ScrollView, KeyboardAvoidingView, Picker, Share } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Divider, TextInput, Caption } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { Icon, Header, Input, ListItem, Card, CardItem, Button as ElementButton, Overlay, PricingCard } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import firebase from "../firebase/firebase"; 
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
export default function GroupDashboard({ navigation }) {



    const isjg = useSelector(state => state.isjg)
    const iscg = useSelector(state => state.iscg)
    const fname = useSelector(state => state.fname)
    const lname= useSelector(state => state.lname)
    const docid = useSelector(state => state.docid)
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [isDone, setisDone] = React.useState(false);
    const [member, setMember] = React.useState([]);
    const [loved, setLoved] = React.useState([]);
    const [GD, setGD] = React.useState([]);
    const [PM, setPM] = React.useState([]);
    const [visible2, setVisible2] = React.useState(false);
    const [joined, setJoined] = React.useState(null);
    const [visible3, setVisible3] = React.useState(false);
    const [visible4, setVisible4] = React.useState(false);
    const [visible5, setVisible5] = React.useState(false);


     
    var [reason, setReason] = React.useState(null);
    var [reason2, setReason2] = React.useState(null);

    async function savePic() {
        if (reason == null || reason == "") {
            alert("Please Enter Reason")
        }
        else {
            if (pickerRes == null) {
               
                const newLink2 = {
                    reason: reason,
                    docUrl: "null",
                    groupId: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')
                }
                const user12 = firebase.db.collection("fund_request").add(newLink2);

                toggleOverlay5()




                const voteRef2 = await firebase.db.collection("group_messages").doc(isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''));
                voteRef2.get().then(doc => {
                    if (doc.exists) {

                        const prev = doc.data().messages
                        const newMessage = {

                            _id: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''),
                            system: true,
                            text: "Admin" + ": " + "Fund Release Request Recived by " + fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ".",
                            createdAt: new Date().toUTCString(),
                            user: {
                                _id: "",
                                name: "Admin",

                            },


                        }
                        const message_ = [...prev, newMessage];

                        return voteRef2.update({ messages: message_ });
                    }
                    else {


                        const newLink = {
                            _id: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''),
                            system: true,
                            text: "Admin" + ": " + "Fund Release Request Recived by " + fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ".",
                            createdAt: new Date().toUTCString(),
                            user: {
                                _id: "",
                                name: "Admin",

                            },

                        };
                        const user12 = firebase.db.collection("group_messages").doc(isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')).set(newLink);
                    }
                }) 




                alert("Successfully Requested!")
                navigation.navigate('Home')


            }
            else { 

            const a = await fetch(pickerRes.uri)

            FileSystem.readAsStringAsync(pickerRes.uri,
                { encoding: FileSystem.EncodingType.Base64 })
                .then((res) => {
                    let base64Img = `data:` + a.headers.map["content-type"] + `;base64,${res}`
                    let apiUrl = 'https://api.cloudinary.com/v1_1/du3j5iidy/image/upload';

                    let data = {
                        "file": base64Img,
                        "upload_preset": "lg0kpmhq",
                    }


                    fetch(apiUrl, {
                        body: JSON.stringify(data),
                        headers: {
                            'content-type': 'application/json'
                        },
                        method: 'POST',
                    }).then(async r => {
                        let data = await r.json()
                        console.log(data, "hh")

                        const newLink2 = {
                            reason: reason,
                            docUrl: data.url,
                            groupId: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')
                        }
                        const user12 = firebase.db.collection("fund_request").add(newLink2);

                        toggleOverlay5()




                        const voteRef2 = await firebase.db.collection("group_messages").doc(isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''));
                        voteRef2.get().then(doc => {
                            if (doc.exists) {

                                const prev = doc.data().messages
                                const newMessage = {

                                    _id: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''),
                                    system: true,
                                    text: "Admin" + ": " + "Fund Release Request Recived by " + fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ".",
                                    createdAt: new Date().toUTCString(),
                                    user: {
                                        _id: "",
                                        name: "Admin",

                                    },


                                }
                                const message_ = [...prev, newMessage];

                                return voteRef2.update({ messages: message_ });
                            }
                            else {


                                const newLink = {
                                    _id: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''),
                                    system: true,
                                    text: "Admin" + ": " + "Fund Release Request Recived by " + fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ".",
                                    createdAt: new Date().toUTCString(),
                                    user: {
                                        _id: "",
                                        name: "Admin",

                                    },

                                };
                                const user12 = firebase.db.collection("group_messages").doc(isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')).set(newLink);
                            }
                        })




                        alert("Successfully Requested!")
                        navigation.navigate('Home')


                    }).catch(err => console.log(err))



                });



        }
          

        }
        setReason(null)
    }
    async function savePic2() {
        if (reason2 == null || reason2 == "") {
            alert("Please Enter Reason")
        }
        else {
            if (pickerRes2 == null) {
               
                const newLink2 = {
                    reason: reason2,
                    docUrl: "null",
                    groupId: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')
                }
                const user12 = firebase.db.collection("public_claim").add(newLink2);

                toggleOverlay4()




                const voteRef2 = await firebase.db.collection("group_messages").doc(isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''));
                voteRef2.get().then(doc => {
                    if (doc.exists) {

                        const prev = doc.data().messages
                        const newMessage = {

                            _id: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''),
                            system: true,
                            text: "Admin" + ": " + "Public Claim Request Recived by " + fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ".",
                            createdAt: new Date().toUTCString(),
                            user: {
                                _id: "",
                                name: "Admin",

                            },


                        }
                        const message_ = [...prev, newMessage];

                        return voteRef2.update({ messages: message_ });
                    }
                    else {


                        const newLink = {
                            _id: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''),
                            system: true,
                            text: "Admin" + ": " + "Public Claim Request Recived by " + fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ".",
                            createdAt: new Date().toUTCString(),
                            user: {
                                _id: "",
                                name: "Admin",

                            },

                        };
                        const user12 = firebase.db.collection("group_messages").doc(gid).set(newLink);
                      
                    }
                    setReason(null)
                })




                alert("Successfully Requested!")
                navigation.navigate('Home')


            }
            else {

                const a = await fetch(pickerRes.uri)

                FileSystem.readAsStringAsync(pickerRes.uri,
                    { encoding: FileSystem.EncodingType.Base64 })
                    .then((res) => {
                        let base64Img = `data:` + a.headers.map["content-type"] + `;base64,${res}`
                        let apiUrl = 'https://api.cloudinary.com/v1_1/du3j5iidy/image/upload';

                        let data = {
                            "file": base64Img,
                            "upload_preset": "lg0kpmhq",
                        }


                        fetch(apiUrl, {
                            body: JSON.stringify(data),
                            headers: {
                                'content-type': 'application/json'
                            },
                            method: 'POST',
                        }).then(async r => {
                            let data = await r.json()
                            console.log(data, "hh")

                            const newLink2 = {
                                reason: reason2,
                                docUrl: data.url,
                                groupId: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')
                            }
                            const user12 = firebase.db.collection("public_claim").add(newLink2);

                            toggleOverlay4()




                            const voteRef2 = await firebase.db.collection("group_messages").doc(isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''));
                            voteRef2.get().then(doc => {
                                if (doc.exists) {

                                    const prev = doc.data().messages
                                    const newMessage = {

                                        _id: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''),
                                        system: true,
                                        text: "Admin" + ": " + "Fund Release Request Recived by " + fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ".",
                                        createdAt: new Date().toUTCString(),
                                        user: {
                                            _id: "",
                                            name: "Admin",

                                        },


                                    }
                                    const message_ = [...prev, newMessage];

                                    return voteRef2.update({ messages: message_ });
                                }
                                else {


                                    const newLink = {
                                        _id: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''),
                                        system: true,
                                        text: "Admin" + ": " + "Fund Release Request Recived by " + fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '') + ".",
                                        createdAt: new Date().toUTCString(),
                                        user: {
                                            _id: "",
                                            name: "Admin",

                                        },

                                    };
                                    const user12 = firebase.db.collection("group_messages").doc(gid).set(newLink);
                                }
                              
                            })




                            alert("Successfully Requested!")
                            navigation.navigate('Home')


                        }).catch(err => console.log(err))



                    });



            }


        }
        setReason2(null)
    }


    var [image, setImage] = React.useState(null);
      var [pickerRes, setPickerRes] = React.useState(null);
      var [pickerRes2, setPickerRes2] = React.useState(null);
  const  _pickDocument = async () => {

      let result = await DocumentPicker.getDocumentAsync({ base64: true });
      console.log(result)

     

        setPickerRes(result);

    }
    const _pickDocument2 = async () => {

      let result = await DocumentPicker.getDocumentAsync({ base64: true });
      console.log(result)

     

        setPickerRes2(result);

    }
    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getGroupData()
        getStart()
        getPM()
        getGroupDetail(isjg == "null" ? iscg : isjg)
      
        wait(2000).then(() => { setRefreshing(false) });
    }, [refreshing]);

    var members=[]
    var lovedone=[]
    var count=[]
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const toggleOverlay2 = () => {
        setVisible2(!visible2);
    };
    const toggleOverlay3 = () => {
        setVisible3(!visible3 );
    };
    const toggleOverlay4 = () => {
        setVisible4(!visible4 );
    };
    const toggleOverlay5 = () => {
        setVisible5(!visible5 );
    };
    useEffect(() => {
        console.log('here')
        getStart()
        getPM()
        getGroupData()

        getGroupDetail(isjg == "null" ? iscg : isjg)
     

    }, []);
    function publiccl() {

        setVisible4(true)

    }
    function publiccl2() {

        setVisible5(true)

    }
    async function getStart() {  
        const voteRef = await firebase.db.collection('users').doc(docid);

        voteRef.get().then(doc => {
            if (doc.exists) {
                if (doc.data().CreatedGroup.UID) {


                    var myDate = doc.data().CreatedGroup.joined.toDate().toDateString();
                   
                    setJoined(myDate)
                    // alert(doc.data().CreatedGroup.created)
                }
                else {
                    var myDate = doc.data().JoinedGroup.joined.toDate().toDateString();
                  
                    setJoined(myDate)
                  
                    //  alert(doc.data().JoinedGroup.joined)
                }

            }
        })
    }

    async function getGroupData() {
        setMember(null)
        members = []
        lovedone = []
        setLoading(true)
        console.log('in function')


      


        await firebase.db.collection('users').where("CreatedGroup.UID", "==", (isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')))
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {


                    members.push(doc.data().fname + " " + doc.data().lname)
                    setMember(members)
                    
                    if (doc.data().LovedOne.groupId == (isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''))) {
 lovedone.push(doc.data().LovedOne.pname)
                    setLoved(lovedone)
                    }
                   
                    console.log(doc.data().LovedOne.pname )
                 
                    
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        await firebase.db.collection('users').where("JoinedGroup.UID", "==", (isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')))
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc)  {


                    members.push(doc.data().fname + " " + doc.data().lname)
                    setMember(members)
                    
                    if (doc.data().LovedOne.groupId == (isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, ''))) {
 lovedone.push(doc.data().LovedOne.pname)
                    setLoved(lovedone)
                    }
                   
                    console.log(doc.data().LovedOne.pname )
                 
                    
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        console.log(members, "members")
        console.log(lovedone, "locved")
        
        setLoading(false)
    }
    async function getPM() {
         
         
      setPM([])
        count = []

        await firebase.db.collection('payment_made').where("groupId", "==", (isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')))
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    count.push(doc.data().userId)
                   setPM(count)
                 
                    
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        console.log(PM.length)
         
    }

    async function getGroupDetail(id) {
 
        console.log('in function')
        const voteRef = await firebase.db.collection('groups').doc(id.replace(/['"]+/g, ''));
            
                voteRef.get().then(doc => {
                    if (doc.exists) {
                        setGD(doc.data())
                        console.log(doc.data(), "this is grp data")
                    }
                })
        console.log(members, "members")
        console.log(lovedone, "locved")
            }
       
      
    
    function onSharePress() {
        var messae = 'Join My muslim burial group by downloading app from play store and use following Unique ID to join the group:' + ' ' + (iscg == "null" ? isjg.replace(/['"]+/g, '') : iscg.replace(/['"]+/g, ''))
        const shareOptions = {
            title: 'My Muslim Burial',
            message: messae, // Note that according to the documentation at least one of "message" or "url" fields is required
            url: 'mymuslimburial.co.uk',
            subject: 'Join Group'
        };
 Share.share(shareOptions);
    }
  
   
    return (

        <>

            <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                centerComponent={{ text: 'Group Dashboard', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}

                leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-menu" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
            />
           
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Card title="Group Dashoard" >
                    {isjg.replace(/['"]+/g, '') == "MMBGeneralGroup" ?
                        <>
                            <Text style={{ alignSelf: 'center', fontSize: 40, fontWeight: 'bold', color: '#0095ff', marginBottom: '3%' }}>{GD.groupName ? GD.groupName : "Loading"}</Text>
                            <Divider/>
                            <View style={{ borderTopWidth: 1, marginTop: '5%', flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: 19, }}>
                                        Start Date
                                        </Text>

                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 19, }}>
                                        { joined}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: 19, }}>
                                      Payments Made
                                        </Text>

                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 19, }}>
                                        {PM != null ? PM.length : 0}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: 19, }}>
                                       Total Contributed 
                                        </Text>

                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 19, }}>
                                        {GD.collectedAmount}
                                    </Text>
                                </View>
                            </View>
                            <Button onPress={toggleOverlay} backgroundColor="#0095ff" style={{
                                backgroundColor: '#0095ff', marginBottom: '2%', marginTop: '3%'
                            }} mode="contained">
                                Share App 
                            </Button>

                          
                            <View style={{



                                alignItems: 'center'
                            }}>

                                <Button onPress={() => { publiccl() }} backgroundColor="#0095ff" style={{
                                    backgroundColor: '#0095ff', marginBottom: '2%'
                                }} mode="contained">
                                    Public Fund Claim
                        </Button>
                                <Button onPress={() => { publiccl2() }} backgroundColor="#0095ff" style={{
                                    backgroundColor: '#0095ff', marginBottom: '2%'
                                }} mode="contained">
                                    Fund Release Request
                        </Button>




                            </View>
                        </>
                        :
                        <>
                            <Text style={{ alignSelf: 'center', fontSize: 40, fontWeight: 'bold', color: '#0095ff', marginBottom: '3%' }}>{GD.groupName ? GD.groupName : "Loading"}</Text>

                    <Text style={{ alignSelf: 'center', fontSize: 35, fontWeight: 'bold', color: 'black', marginBottom: '1%' }}> {"\u00A3"}{typeof GD.collectedAmount != 'undefined' ? GD.collectedAmount : "Loading"}</Text>
                        
                            {
                        member ?
                        <TouchableOpacity onPress={toggleOverlay2} >
                        <Caption style={{ alignSelf: 'center', fontSize: 20, marginTop: '3%' }}> {loading == false ? (member.length + " " + "Members") : loading}</Caption>
                            </TouchableOpacity >
                            :
                            <Caption style={{ alignSelf: 'center', fontSize: 20, marginTop: '3%' }}>
                                LOADING
                            </Caption>
                    }
                    {
                        loved ?
                        <TouchableOpacity onPress={toggleOverlay3} >
                                <Caption style={{ alignSelf: 'center', fontSize: 20, marginTop: '3%' }}>{loading == false ? (loved.length + " " + "Loved One(s)") : loading}</Caption>
                            </TouchableOpacity>
                            :
                            <Caption style={{ alignSelf: 'center', fontSize: 20, marginTop: '3%' }}>
                                LOADING
                            </Caption>
                    }
                            <Caption style={{ alignSelf: 'center', fontSize: 20, marginTop: '3%' }}>Unique ID: {isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')}</Caption>
                            <Divider />
                            <View style={{ borderTopWidth:1, marginTop: '5%', flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: 19, }}>
                                        Start Date
                                        </Text>

                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 19, }}>
                                        {joined}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: 19, }}>
                                        Payments Made
                                        </Text>

                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 19, }}>
                                        {PM != null || PM != "undefined" || typeof PM != "undefined" ? PM.length : 0}
                                    </Text>
                                </View>
                            </View>

                            <Button onPress={toggleOverlay} backgroundColor="#0095ff" style={{
                        backgroundColor: '#0095ff', marginBottom: '2%', marginTop:'3%'
                    }} mode="contained">
                        Share Unique ID {isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')}
                        </Button>
                            <Divider />
                            <Text>{"\n"}</Text>


                
                   
                    <View style={{

                         

                        alignItems: 'center'
                    }}>

                                <Button onPress={() => { navigation.navigate("Chat", { gid: isjg == "null" ? iscg.replace(/['"]+/g, '') : isjg.replace(/['"]+/g, '')}) }} backgroundColor="#0095ff" style={{
                            backgroundColor:'#0095ff',marginBottom: '2%' }} mode="contained">
                            Chat 
                        </Button>
                       
                         
                         
                        
                       
                            </View>
                            
                    <View style={{

                         

                        alignItems: 'center'
                    }}>

                        <Button onPress={() => {publiccl() }} backgroundColor="#0095ff" style={{
                            backgroundColor:'#0095ff',marginBottom: '2%' }} mode="contained">
                            Public Fund Claim 
                        </Button>
                                <Button onPress={() => { publiccl2() }} backgroundColor="#0095ff" style={{
                            backgroundColor:'#0095ff',marginBottom: '2%' }} mode="contained">
                            Fund Release Request 
                        </Button>
                         
                         
                        
                       
                            </View>
                        </>
                    }
                   
                    <Text>{"\n"}</Text>
















                </Card>
                <Overlay isVisible={visible5} onBackdropPress={toggleOverlay5} overlayStyle={{ height: '100%' }}>
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        padding: '5%'
                    }}>
                        <TextInput onChangeText={(text) => { setReason(text); }} mode='outlined' style={{ marginBottom: '5%' }} placeholder="Reason.." />
                         
                        <TouchableOpacity onPress={_pickDocument} style={styles.button}>
                            <Button  type='outline' onPress={_pickDocument} style={styles.buttonText} title="Pick a photo" />
                            <Text style={{ color: pickerRes == null ? 'black' : 'green', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: '7%' }} >
                                {pickerRes == null ? "Tap to Upload file" : "Tap to Upload file"}
                            </Text>
                        </TouchableOpacity>
                        <Button contentStyle={{ backgroundColor: '#0095ff' }} mode="contained" onPress={() => savePic()}> Send </Button>
                    </View>
                </Overlay>
                <Overlay isVisible={visible4} onBackdropPress={toggleOverlay4} overlayStyle={{ height: '100%' }}>
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        padding: '5%'
                    }}>
                        <TextInput onChangeText={(text) => { setReason2(text); }} mode='outlined' style={{ marginBottom: '5%' }} placeholder="Reason.." />

                        <TouchableOpacity onPress={_pickDocument2} style={styles.button}>
                            <Button type='outline' onPress={_pickDocument2} style={styles.buttonText} title="Pick a photo" />
                            <Text style={{ color: pickerRes2 == null ? 'black' : 'green', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: '7%' }} >
                                {pickerRes2 == null ? "Tap to Upload file" : "Tap to Upload file"}
                            </Text>
                        </TouchableOpacity>
                        <Button contentStyle={{ backgroundColor: '#0095ff' }} mode="contained" onPress={() => savePic2()}> Send </Button>

                    </View>
                </Overlay>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ height: '30%' }}>
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        padding: '5%'
                    }}>
                        <Text style={{ marginBottom:'5%', alignSelf: 'center', fontWeight: 'bold', color: '#0095ff', fontSize: 19 }}>
                            {iscg == "null" ? isjg : iscg}
                        </Text>

                        <Button mode="contained" onPress={onSharePress} contentStyle={{ backgroundColor:'#0095ff' }} labelStyle={{ color: '#fff' }}>
                            Share Unique ID
                        </Button>
                    </View>
                </Overlay>
                <Overlay isVisible={visible2} onBackdropPress={toggleOverlay2} overlayStyle={{ height: '30%' }}>
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        padding: '5%'
                    }}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 19 }} >
                            Members of Group
                                </Text>
                        {
                            member ?
                            member.map((links, i) => (

                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#0095ff', fontSize:19 }}>
                                     {links}
                        </Text>
                                 


                            )) :
                                <>
                                    </>
                        }

                        
                         
                    </View>
                </Overlay>
                <Overlay isVisible={visible3} onBackdropPress={toggleOverlay3} overlayStyle={{ height: '30%' }}>
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        padding: '5%'
                    }}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 19 }} >
                            Loved ones in the Group
                                </Text>
                        {
                            loved ?
                            loved.map((links, i) => (

                                <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#0095ff', fontSize: 19 }}>
                                    {links}
                                </Text>



                            ))
                                :
                                <>
                                    </>
                        }

                    </View>
                </Overlay>
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

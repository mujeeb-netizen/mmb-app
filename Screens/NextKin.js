import React from 'react';
 
import { StyleSheet, RefreshControl, Text, View, ScrollView, Platform, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
 
import { useSelector } from 'react-redux'
 import {   Header , Card,    } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button, Title, Avatar, Divider, Caption } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import firebase from "../firebase/firebase";
import * as Location from 'expo-location';
import Constants from 'expo-constants';
 
export default function NextKin({ navigation, navigation: { goBack } }) {
    const [lat, setLat] = React.useState(null);
    const [lng, setLng] = React.useState(null);
    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        

        getKinDetails()
        wait(2000).then(() => { setRefreshing(false) });
    }, [refreshing]);
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
  
    React.useEffect(() => {
       
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            if (location != null) {


                if (location.coords.accuracy <= 30) {
                    if (once == null) {
                        setLat(location.coords.latitude)
                        setLng(location.coords.longitude)
                        alert(lat + " " + lng)
                        setOnce(true)
                    }

                }
            }

            if (address == null) {

               
                    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.coords.latitude + ',' + location.coords.longitude + '&key=' + "AIzaSyDKNMW4TFscx2F5TsMJFp-_C4LQ3po3ToE")
                    .then((response) => response.json())
                    .then((responseJson) => {

                        if (typeof responseJson == 'undefined') {

                        }
                        else {
                            for (var i = 0; i < responseJson.results.length; i++) {
                                for (var j = 0; j < responseJson.results[0].address_components.length; j++) {
                                    if (responseJson.results[0].address_components[j].types == "postal_code") {
                                        setPostal(responseJson.results[0].address_components[j].long_name)
                                    }
                                    if (responseJson.results[0].address_components[j].types[0] == "locality") {
                                        setTown(responseJson.results[0].address_components[j].long_name)
                                    }
                                }
                            }
                            setAddress(responseJson.results[0].address_components[0].long_name);
                            setTown(responseJson.results[0].address_components[3].long_name)
                        }

                    })
            }
            
        })();


      
 

        if (kinData == "" && once == true) {
                getKinDetails()
            }

        
       

        
    })
    async function getKinDetails() {

        await firebase.db.collection('users').where("uid", "==", uid2.replace(/['"]+/g, ''))
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    if (typeof doc.data().NextKin.address == "undefined") {
                        setKinData([])
                        setOnce(false)

                    } else {
                        setKinData(doc.data().NextKin)
                        setOnce(false)
                    }
                    

                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    async function CheckKin() {

        await firebase.db.collection('users').where("uid", "==", uid2.replace(/['"]+/g, ''))
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    if (typeof doc.data().NextKin.address == "undefined") {

                        setIskin("false")
                    }
                   

                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    async function SaveKin() {

        setLoginload(false);

        try {




            if (pname == null || pname.trim() == "") {
                setIspname(false);
                setLoginload(true);
            }
            else if (rel == null || rel.trim() == "") {
                setIsrel(false)
                setLoginload(true);
            } else if (address == null || address.trim() == "") {
                setIsaddress(false)
                setLoginload(true);
            } else if (town == null || town.trim() == "") {
                setIstown(false)
                setLoginload(true);
            }

            else if (postal == null || postal.trim() == "") {
                setIspostal(false)
                setLoginload(true);
            }
            else if (email == null || email.trim() == "") {
                setIsemail(false)
                setLoginload(true);
            } else if (tele == null || tele.trim() == "") {
                setIstele(false)
                setLoginload(true);
            }





            else {

                const voteRef = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
                voteRef.get().then(doc => {
                    if (doc.exists) {
                        const NextKin = {
                            pname: pname,
                            rel: rel,
                            address: address,
                            town: town,
                            postal_code: postal,
                            email: email,
                            telephone: tele
                        };

                        return voteRef.update({ NextKin: NextKin });
                    }
                }).then(function () {
                    Alert.alert("Successfully Saved")
                    setOnce(true)
                    setIskin(null)
                    navigation.navigate("Home")

                });

                setIsLoad(true)
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
            setLoginload(true);
        }

    }
    if (kinData == "") {


        return (
            <>
            <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                    leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
                centerComponent={{ text: 'Next of Kin', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}
            />
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} >
                  
                        <ScrollView
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                       >


                        <View style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>
                            <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'rgb(32, 137, 220)', marginBottom: '10%' }}>Next of Kin</Text>


                                <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                    labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                    label="Person Name" value={ pname }
                                onChangeText={(text) => { setPname(text); setIspname(true) }}
                                style={{ width: '100%', color: 'black', marginBottom: ispname ? '10%' : '0%' }}

                            />


                         
                                <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Relationship to Person " value={rel}
                                onChangeText={(text) => { setRel(text); setIsrel(true) }}
                                style={{ width: '100%', color: 'black', marginBottom: isrel ? '10%' : '0%' }}

                            />


                                <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Address " value={address}
                                onChangeText={(text) => { setAddress(text); setIsaddress(true) }}
                                style={{ width: '100%', color: 'black', marginBottom: isaddress ? '10%' : '0%' }}

                            />


                          
                                <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Town" value={town}
                                onChangeText={(text) => { setTown(text); setIstown(true) }}
                                style={{ width: '100%', color: 'black', marginBottom: istown ? '10%' : '0%' }}

                            />


                           

                                <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Postal Code" value={postal}
                                onChangeText={(text) => { setPostal(text); setIspostal(true) }}
                                style={{ width: '100%', color: 'black', marginBottom: ispostal ? '10%' : '0%' }}

                            />


                        
                                <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Email" value={email}
                                onChangeText={(text) => { setEmail(text); setIsemail(true) }}
                                style={{ width: '100%', color: 'black', marginBottom: isemail ? '10%' : '0%' }}

                            />


                         
                                <TextInput  
                                    isFocused={false}
                                    keyboardType="number-pad"
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Telephone" value={tele}
                                onChangeText={(text) => { setTele(text); setIstele(true) }}
                                style={{ width: '100%', color: 'black', marginBottom: istele ? '10%' : '0%' }}

                            />


                              {
                                !isSign ?
                                    <Button mode="clear" loading color="rgb(32, 137, 220)"
                                    >.. </Button>
                                    :
                                    <Button color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} onPress={SaveKin} >Save</Button>
                            }

                        </View>
                            </ScrollView>
                        
                </KeyboardAvoidingView>
                </View>
                </>
        );
    }
    else {

        return (
          <>
                <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                    containerStyle={{ elevation: 5 }}
                    centerComponent={{ text: 'Next of Kin', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}

                leftComponent={<Ionicons name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
                         />
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >

                    <Card>
                        <TouchableOpacity onPress={() => { navigation.navigate("EditKin", { _pname: kinData.pname, _rel: kinData.rel, _email: kinData.email, _town: kinData.town, _address: kinData.address, _postal: kinData.postal_code, _telephone: kinData.telephone }) }} style={{ alignSelf: 'flex-end' }}>
                            <Ionicons name="ios-create" color="#0095ff" size={28} />

                        </TouchableOpacity>


                    <Text style={{ fontSize: 20, marginBottom: '3%' }}>Name: </Text>
                    <Divider />
                    <View style={{

                        flexDirection: 'row',

                        textAlign: 'center'
                    }}>
                        <Text>
                            <Ionicons name="md-contact" color="rgb(32, 137, 220)" size={28} />
                        </Text>
                        <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{kinData.pname}</Caption>
                    </View>
                    <Text>{"\n"}</Text>
                    <Text style={{ fontSize: 20, marginBottom: '3%' }}>Relationship with person: </Text>
                    <Divider />
                    <View style={{

                        flexDirection: 'row',

                        textAlign: 'center'
                    }}>
                        <Text>
                            <Ionicons name="md-contact" color="rgb(32, 137, 220)" size={28} />
                        </Text>
                        <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{kinData.rel}</Caption>
                    </View>
                    
                   
                    <Text>{"\n"}</Text>
                    <Text style={{ fontSize: 20, marginBottom: '3%' }}>Email: </Text>
                    <Divider />
                    <View style={{

                        flexDirection: 'row',

                        textAlign: 'center'
                    }}>
                        <Text>
                            <Ionicons name="md-mail" color="rgb(32, 137, 220)" size={28} />
                        </Text>
                        <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{kinData.email}</Caption>
                    </View>
                   
                    <Text>{"\n"}</Text>
                    <Text style={{ fontSize: 20, marginBottom: '3%' }}>Town: </Text>
                    <Divider />
                    <View style={{

                        flexDirection: 'row',

                        textAlign: 'center'
                    }}>
                        <Text>
                            <Ionicons name="md-square-outline" color="rgb(32, 137, 220)" size={28} />
                        </Text>
                        <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{kinData.town}</Caption>
                    </View>
                   
                   
                    <Text>{"\n"}</Text>
                    <Text style={{ fontSize: 20, marginBottom: '3%' }}>Address: </Text>
                    <Divider />
                    <View style={{

                        flexDirection: 'row',

                        textAlign: 'center'
                    }}>
                        <Text>
                            <Ionicons name="md-home" color="rgb(32, 137, 220)" size={28} />
                        </Text>
                        <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{kinData.address}</Caption>
                    </View>
                    <Text>{"\n"}</Text>
                    <Text style={{ fontSize: 20, marginBottom: '3%' }}>Postal Code: </Text>
                    <Divider />
                    <View style={{

                        flexDirection: 'row',

                        textAlign: 'center'
                    }}>
                        <Text>
                            <Ionicons name="md-clipboard" color="rgb(32, 137, 220)" size={28} />
                        </Text>
                        <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{kinData.postal_code}</Caption>
                    </View>
                    <Text>{"\n"}</Text>

                    <Text style={{ fontSize: 20, marginBottom: '3%' }}>Phone: </Text>
                    <Divider />
                    <View style={{

                        flexDirection: 'row',

                        textAlign: 'center'
                    }}>
                        <Text>
                            <Ionicons name="md-call" color="rgb(32, 137, 220)" size={28} />
                        </Text>
                        <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{kinData.telephone}</Caption>
                    </View>
                    <Text>{"\n"}</Text>
                   
                   
                    
                   
                   
                









                </Card>

            </ScrollView>
           
                </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
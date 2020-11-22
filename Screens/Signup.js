import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform ,KeyboardAvoidingView, Alert } from 'react-native';
import {  Header,Input } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, TextInput, Caption } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal'
import * as Location from 'expo-location';
import FloatingLabelInput from 'react-native-floating-label-input';
import { CountryCode, Country } from '../assets/types'
export default function Signup({ navigation, navigation: { goBack }, route }) {
   const a = { "cca2": "GB", "currency": ["GBP"], "callingCode": ["44"], "region": "Europe", "subregion": "Northern Europe", "flag": "flag-gb", "name": "United Kingdom" }

    const [countryCode, setCountryCode] = useState('GB')
    const [country, setCountry] = useState(a)
    const [addressComp, setAddressComp] = useState(null)
  
    const [withCountryNameButton, setWithCountryNameButton] = useState(
        false,
    )
     const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [withCallingCode, setWithCallingCode] = useState(true)
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        console.log(JSON.stringify(country))
    }
    const { name } = route.params;
    const { email_ } = route.params;
    var { googleSignup } = route.params;
    const [isname, setIsname] = React.useState(true);
    const [islname, setIslname] = React.useState(true);
    const [lat, setLat] = React.useState(null);
    const [lng, setLng] = React.useState(null);

    const [ispwd, setIspwd] = React.useState(true);
    const [isemail, setIsemail] = React.useState(true);
   
    const [isSign, setIsSign] = React.useState(true);
 
    const [title, setTitle] = React.useState(null);
    const [istitle, setIstitle] = React.useState(true);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);

    const [address, setAddress] = React.useState(null);
    const [isaddress, setIsaddress] = React.useState(true);
    const [town, setTown] = React.useState(null);
    const [istown, setIstown] = React.useState(true);
    const [postal, setPostal] = React.useState(null);
    const [ispostal, setIspostal] = React.useState(true);
    const [masjid, setMasjid] = React.useState(null);
    const [ismasjid, setIsmasjid] = React.useState(true);
    const [phone, setPhone] = React.useState(null);
    const [isphone, setIsphone] = React.useState(true);

    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);
  
    const [loginload, setLoginload] = React.useState(true);
    const [once, setOnce] = React.useState(null);
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
 
                            setAddress(responseJson.results[0].address_components[0].long_name + " " + responseJson.results[0].address_components[1].long_name);
                            setTown(responseJson.results[0].address_components[3].long_name)
                        }

                    })

            }
        })();




    })
    
    async function CreateUser() {
        setLoginload(false); 
        let name = fname;
        


            if (title == null || title.trim() == "") {
                setIstitle(false);
                setLoginload(true);
            }
           else if (fname == null || fname.trim() == "") {
                setIsname(false);
                setLoginload(true);
            }
            else if (lname == null || lname.trim() == "") {
                setIslname(false)
                setLoginload(true);
            } else if (email == null || email.trim() == "") {
                setIsemail(false)
                setLoginload(true);
            } else if (password == null || password.trim() == "") {
                setIspwd(false)
                setLoginload(true);
            }
            else if (password.length < 6) {
                alert("Minimum password length: 6")
                setIspwd(false)
                setLoginload(true);
            }
            else if (address == null || address.trim() == "") {
                setIsaddress(false)
                setLoginload(true);
            }
            else if (town == null || town.trim() == "") {
                setIstown(false)
                setLoginload(true);
            } else if (postal == null || postal.trim() == "") {
                setIspostal(false)
                setLoginload(true);
            } else if (masjid == null || masjid.trim() == "") {
                setIsmasjid(false)
                setLoginload(true);
            }





            else {

              setIsSign(false)
                //const user1 = await firebase.register(name, email.trim(), password);
                //const newLink = {
                //    uid: user1.user.uid,
                //    email: email,
                //    fname: fname,
                //    lname: lname,
                //    address: address,
                //    title: title,
                //    town: town,
                //    googleSignup:false,
                //    postal_code: postal,
                //    masjid: masjid, 
                //    Security_Question: [],
                //    NextKin: [],
                //    LovedOne: [],
                //    JoinedGroup: [],
                //    CreatedGroup: []
                //};
                //const user12 = firebase.db.collection("users").add(newLink);
             //   user1.user.sendEmailVerification();
                //  Alert.alert("Signed Up! Check Your Inbox to Confirm Your Email!")
                 
                  
                setLoginload(true);
                

               

                navigation.navigate("SecurityQuestion", {
               
                    email: email,
                    password: password,
                    fname: fname,
                    lname: lname,
                    address: address,
                    title: title,
                    town: town,
                    googleSignup: false,
                    postal_code: postal,
                    phone: country == null ? "" : country.callingCode +""+phone,
                    masjid: masjid,
                    customerId:""

                });
                setIsSign(true)
            }
        }

   


    
    async function CreateUserGoogleSignUp() {
        setLoginload(false); 
       
        try {




         
            if (password == null || password.trim() == "") {
                setIspwd(false)
                setLoginload(true);
            }
            else if (password.length < 6) {
                alert("Minimum password length: 6")
                setIspwd(false)
                setLoginload(true);
            }
            else if (address == null || address.trim() == "") {
                setIsaddress(false)
                setLoginload(true);
            }
            else if (town == null || town.trim() == "") {
                setIstown(false)
                setLoginload(true);
            } else if (postal == null || postal.trim() == "") {
                setIspostal(false)
                setLoginload(true);
            } else if (masjid == null || masjid.trim() == "") {
                setIsmasjid(false)
                setLoginload(true);
            }





            else {

                setIsSign(false)
                navigation.navigate("SecurityQuestion", {
                   
                    email: email,
                    password: password,
                    fname: fname,
                    lname: lname,
                    address: address,
                    title: title,
                    town: town,
                    googleSignup: true,
                    postal_code: postal,
                    phone: phone,
                    masjid: masjid,
                    customerId: ""
                });
                setIsSign(true)
            }
        }

        catch (err) {
           alert(err)
            setIsSign(true)
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



    return (
        <>
        <Header
                backgroundColor="#0095ff"
            barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
            centerComponent={{ text: 'Signup', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}
        />

        <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
                <ScrollView>


                        <View style={{ padding: '7%', paddingBottom:'0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>
                        <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'rgb(32, 137, 220)', marginBottom: '10%' }}>Create an Account</Text>


                           
                            <TextInput
                                isFocused={true}
                                
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right'}}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Title" value={title}
                                onChangeText={(text) => { setTitle(text); setIstitle(true) }}
                                style={{ backgroundColor: '#fff', width: '100%', color: 'black', marginBottom: istitle ? '10%' : '0%' }}
                                value={title}
                            />


                        <Text style={{ marginBottom: istitle ? '0%' : '10%', color: 'red', display: istitle ? 'none' : 'flex' }}>Please enter your first name.</Text>

                            <TextInput
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="First Name"
                                value={googleSignup == false ? fname:name.split(" ")[0] }
                                isFocused={googleSignup == false ? false:true  }
                                onChangeText={(text) => { setFname(text); setIsname(true) }}
                                style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isname ? '10%' : '0%' }}
                            />


                        <Text style={{ marginBottom: isname ? '0%' : '10%', color: 'red', display: isname ? 'none' : 'flex' }}>Please enter your first name.</Text>

                            <TextInput
                                isFocused={googleSignup == false ? false: true }
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} label="Last Name" value={googleSignup == false ? lname:name.split(" ")[1]} onChangeText={(text) => { setLname(text); setIslname(true) }} style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: islname ? '10%' : '0%' }} />
                           

                        <Text style={{ marginBottom: islname ? '0%' : '10%', color: 'red', display: islname ? 'none' : 'flex' }}>Please enter your last name.</Text>

                             
                            <TextInput
                                isFocused={googleSignup == false ? false : true}
                                disabled={googleSignup == false ? false : true}
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={googleSignup == false ? email:email_} label="Email" textContentType="emailAddress" onChangeText={(text) => { setEmail(text); setIsemail(true) }}
                                style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: isemail ? '10%' : '0%' }} />

                        <Text style={{ marginBottom: isemail ? '0%' : '10%', color: 'red', display: isemail ? 'none' : 'flex' }}>Please enter your valid email.</Text>
                                
                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={password} label="Password" secureTextEntry={ true} onChangeText={(text) => { setPassword(text); setIspwd(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: ispwd ? '10%' : '0%' }} />

                        <Text style={{ marginBottom: ispwd ? '0%' : '10%', color: 'red', display: ispwd ? 'none' : 'flex' }}>Please enter valid password.</Text>

                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={address} label="Address" onChangeText={(text) => { setAddress(text); setIsaddress(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: isaddress ? '10%' : '0%' }} />

                        <Text style={{ marginBottom: isaddress ? '0%' : '10%', color: 'red', display: isaddress ? 'none' : 'flex' }}>Please enter valid Address.</Text>
                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={town} label="Town" onChangeText={(text) => { setTown(text); setIstown(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: istown ? '10%' : '0%' }} />

                        <Text style={{ marginBottom: istown ? '0%' : '10%', color: 'red', display: istown ? 'none' : 'flex' }}>Please enter Town.</Text>
                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={postal} label="Postal Code" onChangeText={(text) => { setPostal(text); setIspostal(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: ispostal ? '10%' : '0%' }} />

                        <Text style={{ marginBottom: ispostal ? '0%' : '10%', color: 'red', display: ispostal ? 'none' : 'flex' }}>Please enter valid Postal code.</Text>
                            <View style={{
                                justifyContent: 'center',
                                flexDirection: 'row'}}>
                                  <CountryPicker
                                {...{
                                    countryCode,
                                    withFilter,
                                    withFlag,
                                    withCountryNameButton,
                                    withAlphaFilter,
                                    withCallingCode,
                                    withEmoji,
                                    onSelect,
                                }}
                                
                            />

                                <Text style={{ marginTop:'2%' }}>Press on the flag to select country</Text>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                marginBottom:'5%'
                            }}>
                                 
                                <Input
                                    leftIcon={<Text style={{ position: 'absolute', paddingRight: '5%', fontSize: 18 }}> {country == null ? "" : "+" + country.callingCode}</Text>}
                                    labelStyle={{ fontWeight: 'normal', fontSize: 14 }}
                                    style={{ marginBottom: '5%'}}
                                    keyboardType="number-pad"
                                    isFocused={false}
                                    inputStyle={{ marginTop: '0%', paddingLeft: '7%' }}

                                    containerStyle={{ }}
                                    value={phone} label="Phone" onChangeText={(text) => { setPhone(text); setIsphone(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: ispostal ? '10%' : '0%' }} />
                               
                                <Text style={{ marginBottom: ispostal ? '0%' : '10%', color: 'red', display: ispostal ? 'none' : 'flex' }}>Please enter valid Phone Number.</Text>
                            </View>
                            
                           
                                <TextInput 
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                    containerStyles={{ width: '50%', marginBottom: '9%',marginTop:'10%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={masjid} label="Local Nearest Masjid" onChangeText={(text) => { setMasjid(text); setIsmasjid(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: ismasjid ? '10%' : '0%' }} />
                       
                        <Text style={{ marginBottom: ismasjid ? '0%' : '10%', color: 'red', display: ismasjid ? 'none' : 'flex' }}>Please enter Masjid.</Text>

                        
                        

                      
                    </View>
  {!isSign ?
                            <Button mode="clear" loading color="rgb(32, 137, 220)"
                            >.. </Button>
                            :
                            <Button color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} onPress={googleSignup == false ? CreateUser : CreateUserGoogleSignUp  } >Signup</Button>}


                </ScrollView>
            </KeyboardAvoidingView>
        </View>
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
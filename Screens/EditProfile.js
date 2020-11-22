import React from 'react';
import { StyleSheet, AsyncStorage, Text, View, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Header } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import firebase from "../firebase/firebase";
import { editUser } from '../store/actions'
export default function EditProfile({ navigation, navigation: { goBack }}) {
    const dispatch = useDispatch()
    const uid2 = useSelector(state => state.uid)
    const ques = useSelector(state => state.issq)
    const ans = useSelector(state => state.isans)
    const iscg = useSelector(state => state.iscg)
    const isjg = useSelector(state => state.isjg)
    const docid = useSelector(state => state.docid)
    const [isname, setIsname] = React.useState(true);
    const [islname, setIslname] = React.useState(true);
    const [lat, setLat] = React.useState(null);
    const [lng, setLng] = React.useState(null);
    const [ispwd, setIspwd] = React.useState(true);
    const [isemail, setIsemail] = React.useState(true);
    const [isSign, setIsSign] = React.useState(true);
    const [title, setTitle] = React.useState(useSelector(state => state.title).replace(/['"]+/g, ''));
    const [istitle, setIstitle] = React.useState(true);
    const [fname, setFname] = React.useState(useSelector(state => state.fname).replace(/['"]+/g, ''));
    const [lname, setLname] = React.useState(useSelector(state => state.lname).replace(/['"]+/g, ''));
    const [address, setAddress] = React.useState(useSelector(state => state.address).replace(/['"]+/g, ''));
    const [phone, setPhone] = React.useState(useSelector(state => state.phone).replace(/['"]+/g, ''));
    const [isaddress, setIsaddress] = React.useState(true);
    const [town, setTown] = React.useState(useSelector(state => state.town).replace(/['"]+/g, ''));
    const [istown, setIstown] = React.useState(true);
    const [postal, setPostal] = React.useState(useSelector(state => state.zip).replace(/['"]+/g, ''));
    const [ispostal, setIspostal] = React.useState(true);
    const [masjid, setMasjid] = React.useState(useSelector(state => state.masjid).replace(/['"]+/g, ''));
    const [ismasjid, setIsmasjid] = React.useState(true);
    const [isphone, setIsphone] = React.useState(true);

    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(useSelector(state => state.email).replace(/['"]+/g, ''));

    const [loginload, setLoginload] = React.useState(true);
    const [once, setOnce] = React.useState(null);


    async function CreateUser() {
      
        setLoginload(false);
        let name = fname;
        try {



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
                const voteRef = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
                        voteRef.get().then(doc => {
                            if (doc.exists) {
                                
                                return voteRef.update({
                                    title: title,
                                    fname: fname,
                                    lname: lname,
                                    address: address,
                                    town: town,
                                    postal_code: postal,
                                    phone: phone,
                                    masjid: masjid
                                });
                            }
                        }).then(function () {
                            
                            AsyncStorage.setItem('address', JSON.stringify(address))

                            AsyncStorage.setItem('zip', JSON.stringify(postal))
                            AsyncStorage.setItem('title', JSON.stringify(title))
                           
                            

                            AsyncStorage.setItem('phone', JSON.stringify(phone));
                            AsyncStorage.setItem('fname', JSON.stringify(fname));
                            AsyncStorage.setItem('lname', JSON.stringify(lname));
                            AsyncStorage.setItem('town', JSON.stringify(town));
                            AsyncStorage.setItem('masjid', JSON.stringify(masjid));
                             
                            
                             

                            

                             


                            dispatch(editUser({
                                lname: JSON.stringify(lname),
                                    title: JSON.stringify(title),
                                fname: JSON.stringify(fname),
                                zip: JSON.stringify(postal),
                                                address: JSON.stringify(address),
                                email: JSON.stringify(email),
                                phone: JSON.stringify(phone),
                                town: JSON.stringify(town),
                                masjid: JSON.stringify(masjid),
                                                        docid: docid,
                                uid: uid2,
                                issq: ques,
                                isans: ans,
                                iscg: iscg,
                                isjg: isjg
                            }))


                        });
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




             
                setIsSign(true)
                navigation.navigate("Home")
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
                           />

            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
                    <ScrollView>


                        <View style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>
                            <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'rgb(32, 137, 220)', marginBottom: '10%' }}>    Edit Profile</Text>



                            <TextInput
                                
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Title" 
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
                                value={fname}
                                
                                onChangeText={(text) => { setFname(text); setIsname(true) }}
                                style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isname ? '10%' : '0%' }}
                            />


                            <Text style={{ marginBottom: isname ? '0%' : '10%', color: 'red', display: isname ? 'none' : 'flex' }}>Please enter your first name.</Text>

                            <TextInput
                               
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} label="Last Name" value={ lname } onChangeText={(text) => { setLname(text); setIslname(true) }} style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: islname ? '10%' : '0%' }} />


                            <Text style={{ marginBottom: islname ? '0%' : '10%', color: 'red', display: islname ? 'none' : 'flex' }}>Please enter your last name.</Text>


                            <TextInput
                                 
                                disabled={true}
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={ email } label="Email" textContentType="emailAddress" onChangeText={(text) => { setEmail(text); setIsemail(true) }}
                                style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: '10%', marginBottom: isemail ? '10%' : '0%' }} />

                            <Text style={{ marginBottom: isemail ? '0%' : '10%', color: 'red', display: isemail ? 'none' : 'flex' }}>Please enter your valid email.</Text>

                            
                            <TextInput
                               
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={address} label="Address" onChangeText={(text) => { setAddress(text); setIsaddress(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: isaddress ? '10%' : '0%' }} />

                            <Text style={{ marginBottom: isaddress ? '0%' : '10%', color: 'red', display: isaddress ? 'none' : 'flex' }}>Please enter valid Address.</Text>
                            <TextInput
                                
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={town} label="Town" onChangeText={(text) => { setTown(text); setIstown(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: istown ? '10%' : '0%' }} />

                            <Text style={{ marginBottom: istown ? '0%' : '10%', color: 'red', display: istown ? 'none' : 'flex' }}>Please enter Town.</Text>
                            <TextInput
                                
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={postal} label="Postal Code" onChangeText={(text) => { setPostal(text); setIspostal(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: ispostal ? '10%' : '0%' }} />

                            <Text style={{ marginBottom: ispostal ? '0%' : '10%', color: 'red', display: ispostal ? 'none' : 'flex' }}>Please enter valid Postal code.</Text>
 <TextInput
                                
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={phone} label="Phone" onChangeText={(text) => { setPhone(text);}} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: isphone ? '10%' : '0%' }} />

                            <Text style={{ marginBottom: isphone ? '0%' : '10%', color: 'red', display: isphone ? 'none' : 'flex' }}>Please enter valid phone number.</Text>
                            <TextInput
                                 
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }} value={masjid} label="Local Nearest Masjid" onChangeText={(text) => { setMasjid(text); setIsmasjid(true) }} style={{ backgroundColor: '#fff', borderTopWidth: 0, padding: '0%', width: '100%', marginBottom: ismasjid ? '10%' : '0%' }} />

                            <Text style={{ marginBottom: ismasjid ? '0%' : '10%', color: 'red', display: ismasjid ? 'none' : 'flex' }}>Please enter Masjid.</Text>





                        </View>
                        {!isSign ?
                            <Button mode="clear" loading color="rgb(32, 137, 220)"
                            >.. </Button>
                            :
                            <Button color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} onPress={() => { CreateUser() }} >Save</Button>}


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
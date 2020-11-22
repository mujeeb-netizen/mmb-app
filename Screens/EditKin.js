import React from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import RadioForm, { RadioButton, RadioButtonTextInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon, Header, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button, Title, Avatar, Divider, Caption } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import firebase from "../firebase/firebase";
import * as Location from 'expo-location';
import { add, set } from 'react-native-reanimated';
export default function EditKin({ navigation, navigation: { goBack }, route }) {
    const { _pname } = route.params;
    const { _rel } = route.params;
    const { _email } = route.params;
    const { _town } = route.params;
    const { _address } = route.params;
    const { _postal } = route.params;
    const { _telephone } = route.params;
    
    const docid = useSelector(state => state.docid)
    const uid2 = useSelector(state => state.uid)
    const [pname, setPname] = React.useState(_pname);
    const [rel, setRel] = React.useState(_rel);
    const [address, setAddress] = React.useState(_address);
    const [town, setTown] = React.useState(_town);
    const [postal, setPostal] = React.useState(_postal);
    const [email, setEmail] = React.useState(_email);
    const [tele, setTele] = React.useState(_telephone);
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
    const [lat, setLat] = React.useState(null);
    const [lng, setLng] = React.useState(null);
   
 
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
                    Alert.alert("Successfully Updated!")
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
                        <ScrollView>


                            <View style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>
                                <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'rgb(32, 137, 220)', marginBottom: '10%' }}>Edit</Text>


                                <TextInput
                                    isFocused={false}
                                    inputStyles={{ marginTop: '1%' }}
                                    customLabelStyles={{ alignText: 'right' }}
                                    containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                    labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                    label="Person Name" value={pname}
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



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

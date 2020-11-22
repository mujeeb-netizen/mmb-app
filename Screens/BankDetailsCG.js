import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView,Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Overlay, Header, Card } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Button, ActivityIndicator, TextInput, Caption } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import firebase from "../firebase/firebase";
import { editUser } from '../store/actions'
import { Platform } from 'react-native';
export default function BankDetailsCG({ route, navigation, navigation: { goBack } }) {
    const { groupName } = route.params;
   
    const { id } = route.params;
    const { time } = route.params;
    const { amount } = route.params;

    const dispatch = useDispatch()

    const [isSign, setIsSign] = React.useState(true);
    const [isSign2, setIsLoad] = React.useState(true);
    const [bName, setBname] = React.useState(null);
    const [isbName, setIsbname] = React.useState(true);

    const [AccountNo, setAccountNo] = React.useState(null);
    const [isacc, setIsAcc] = React.useState(true);
    const [bCode, setBcode] = React.useState(null);
    const [isbcode, setIsbcode] = React.useState(true);
    const [AHname, setAhname] = React.useState(null);
    const [isah, setIsAH] = React.useState(true);
    const uid2 = useSelector(state => state.uid)
    const fname = useSelector(state => state.fname)
    const lname = useSelector(state => state.lname)
    const title = useSelector(state => state.title)
    const address = useSelector(state => state.address)
    const town = useSelector(state => state.town)
    const masjid = useSelector(state => state.masjid)
    const zip = useSelector(state => state.zip)
    const email = useSelector(state => state.email)
    const docid = useSelector(state => state.docid)
    const phone = useSelector(state => state.phone)
    const issq2 = useSelector(state => state.issq)
    const isans2 = useSelector(state => state.isans)
    const islo = useSelector(state => state.islo)
    const isjg = useSelector(state => state.isjg)
    const customerId = useSelector(state => state.customerId)
    async function addtoUser(customerId,groupId) {

        try {
            var today = new Date();
            const voteRef2 = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
            voteRef2.get().then(doc => {
                if (doc.exists) {
                    const CreatedGroup = { UID: groupId, groupName: groupName, joined: today, customerId: customerId };

                    return voteRef2.update({ CreatedGroup: CreatedGroup });
                }
            })
        }
        catch (err) {


            Alert.alert(err);

        }
        finally {
            //const history = createHashHistory();
            //history.go("/login");
        }

    }
    async function updatecustomerId(customerId,groupId) {

        try {

            const voteRef2 = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
            voteRef2.get().then(doc => {
                if (doc.exists) {

                    return voteRef2.update({ customerId: customerId });
                }
            })
           
        }
        catch (err) {


            Alert.alert(err);

        }
        finally {
            //const history = createHashHistory();
            //history.go("/login");
        }

    }
    async function createSubcription_(customerId, BankId, MandateId, SubcriptionId) {

        try {

            const newLink = {
                customerId: customerId,
                BankId: BankId,
                MandateId: MandateId,
                SubcriptionId: SubcriptionId,


            };
            const user12 = firebase.db.collection("Subcriptions").doc(SubcriptionId).set(newLink);

        }
        catch (err) {


            Alert.alert(err);

        }
        finally {
            //const history = createHashHistory();
            //history.go("/login");
        }

    }
    async function JoinGroupbyId() {
 
        try {
            if (bName == null || bName.trim() == "") {
                Alert.alert("Enter group Account no.");

            } else if (AccountNo == null || AccountNo.trim() == "") {
                Alert.alert("Enter group Account no.");

            }
            else if (bCode == null || bCode.trim() == "") {
                Alert.alert("Enter Sort code.");

            }
            else if (AHname == null || AHname.trim() == "") {
                Alert.alert("Enter Account Holder Name.");

            }

            else {
                setIsSign(false)
                        var today = new Date();
                        const voteRef = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
                        voteRef.get().then(doc => {
                            if (doc.exists) {
                               const newLink = {
                                   userId: uid2,
                                   groupId: id, 
                                   collectedAmount: amount,
                                   groupName: groupName,
                                   amount: amount,
                                   time: time

                                };
                                const user12 = firebase.db.collection("groups").doc(id).set(newLink);

                                const CreatedGroup = { UID: id, groupName: groupName, amount: amount, time: time, created: today };

                                return voteRef.update({ CreatedGroup: CreatedGroup });

                            }
                        }).then(function () {
                          

                            if (customerId == "null" || customerId == null || customerId.replace(/['"]+/g, '') == "") {
                             
                                axios.post('https://us-central1-mm-burial.cloudfunctions.net/createCustomer', null, {
                                    params: {
                                        email: email.replace(/['"]+/g, ''),
                                        given_name: fname.replace(/['"]+/g, ''),
                                        family_name: lname.replace(/['"]+/g, ''),
                                        address_line1: address.replace(/['"]+/g, ''),
                                        address_line2: "null",
                                        city: "city",
                                        postal_code: zip.replace(/['"]+/g, ''),
                                        country_code: "GB",
                                        UserId: uid2.replace(/['"]+/g, '')
                                    }
                                })
                                    .then(function (response) {
                                        if (response.data.errors) {

                                            alert(response.data.errors[0].field + " " + response.data.errors[0].message)
                                            setIsSign(true)
                                        }
                                        else {
                                        console.log(response.data.id)
                                        axios.post('https://us-central1-mm-burial.cloudfunctions.net/createBank', null, {
                                            params: {
                                                bankAccountNumber: AccountNo,
                                                branchCode: bCode,
                                                accountHolderName: AHname,
                                                countryCode: "GB",
                                                customerId: response.data.id
                                            }
                                        })
                                            .then(function (response1) {
                                                if (response1.data.errors) {

                                                    alert(response1.data.errors[0].field + " " + response1.data.errors[0].message)
                                                    setIsSign(true)
                                                }
                                                else {
                                                    var id1 = '_' + Math.random().toString(36).substr(2, 9);
                                                    axios.post('https://us-central1-mm-burial.cloudfunctions.net/createMandate', null, {
                                                        params: {

                                                            joiningId: id1,
                                                            customer_bank_account: response1.data.id

                                                        }
                                                    })
                                                        .then(function (response2) {
                                                            console.log(response2.data.id)

                                                            axios.post('https://us-central1-mm-burial.cloudfunctions.net/createSubcription', null, {
                                                                params: {

                                                                    amount: parseInt(amount) * 100,
                                                                    currency: "GBP",
                                                                    name: id,
                                                                    interval_unit: time,
                                                                    day_of_month: null,
                                                                    groupId: id,
                                                                    mandateId: response2.data.id

                                                                }
                                                            })
                                                                .then(function (response3) {



                                                                    addtoUser(response.data.id, id);
                                                                    updatecustomerId(response.data.id, id);
                                                                    createSubcription_(response.data.id, response1.data.id, response2.data.id, response3.data.id)


                                                                    AsyncStorage.setItem('IsSQ', issq2);
                                                                    AsyncStorage.setItem('IsAns', isans2);
                                                                    AsyncStorage.setItem('address', address)

                                                                    AsyncStorage.setItem('zip', zip)
                                                                    AsyncStorage.setItem('title', title)
                                                                    AsyncStorage.setItem('docid', docid);
                                                                    AsyncStorage.setItem('email', email);

                                                                    AsyncStorage.setItem('fname', fname);
                                                                    AsyncStorage.setItem('lname', lname);
                                                                    AsyncStorage.setItem('town', town);
                                                                    AsyncStorage.setItem('masjid', masjid);
                                                                    AsyncStorage.setItem('uid', uid2);
                                                                    AsyncStorage.setItem('phone', phone);
                                                                    AsyncStorage.setItem('IsLO', islo);
                                                                    AsyncStorage.setItem('IsJG', isjg);
                                                                    AsyncStorage.setItem('IsCG', JSON.stringify(id));
                                                                    AsyncStorage.setItem('customerId', response.data.id);


                                                                    dispatch(editUser({
                                                                        lname: lname,
                                                                        title: title,
                                                                        fname: fname,
                                                                        zip: zip,
                                                                        address: address,
                                                                        email: email,
                                                                        docid: docid,
                                                                        uid: uid2,
                                                                        town: town,
                                                                        issq: issq2,
                                                                        masjid: masjid,
                                                                        isans: isans2,
                                                                        phone: phone,
                                                                        islo: islo,
                                                                        isjg: isjg,
                                                                        iscg: JSON.stringify(id),
                                                                        customerId: response.data.id
                                                                    }))
                                                                    setIsSign(true)
                                                                    alert("Group Joined Successfully")
                                                                    navigation.navigate("Home")









                                                                })
                                                                .catch(function (error) {
                                                                    console.log(error);
                                                                });

                                                        })
                                                        .catch(function (error) {
                                                            console.log(error);
                                                        });
                                                }
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });


                                    }


                                    })
                                    .catch(function (error) {
                                        alert("Invalid Bank Details: Please Check Bank Details");
                                    });

                            }




                               
                        });
            }


        }
        catch (err) {


            Alert.alert(err);

        }
        finally {
          
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
                    <ScrollView
                        style={{

                            margin: Platform.OS == 'ios' ? 30 : 0,
                            padding: Platform.OS == 'ios' ? 0 : 0
                        }}
                    >

                        <Card  >




                            <View style={{ marginRight: '19%', marginTop: '7%', flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>

                                    <Caption style={{ marginTop: '4%', alignSelf: 'flex-end' }}>
                                        Powered by
                                                </Caption>

                                </View>
                                <View style={{ flex: 1 }}>
                                    <Image
                                        style={{
                                            width: '100%',
                                            height: 30,

                                            alignSelf: 'flex-start'

                                        }}
                                        source={require('./../gcl.png')}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: '5%', flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'flex-start' }}>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: 14, }}>
                                        Donation Total
                                        </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 14, }}>
                                        {"\u00A3"}
                                        {amount}/per {time}
                                    </Text>
                                </View>
                            </View>
                        </Card>
                        <Card title="Your Details">
                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ textAlign: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="First Name"

                                style={{ backgroundColor: '#f2f2f2', width: '100%', color: 'black', marginBottom: isbName ? '10%' : '0%' }}
                                value={fname.replace(/['"]+/g, '')}
                                disabled={false}
                            />
                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ textAlign: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Last Name"

                                style={{ backgroundColor: '#f2f2f2', width: '100%', color: 'black', marginBottom: isbName ? '10%' : '0%' }}
                                value={lname.replace(/['"]+/g, '')}
                                disabled={false}
                            />
                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ textAlign: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Email"

                                style={{ backgroundColor: '#f2f2f2', width: '100%', color: 'black', marginBottom: isbName ? '10%' : '0%' }}
                                value={email.replace(/['"]+/g, '')}
                                disabled={false}
                            />
                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ textAlign: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Address"

                                style={{ backgroundColor: '#f2f2f2', width: '100%', color: 'black', marginBottom: isbName ? '10%' : '0%' }}
                                value={address.replace(/['"]+/g, '') + " " + zip.replace(/['"]+/g, '')}
                                disabled={false}
                            />
                        </Card>

                        <Card title="Payment Details" style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>
                             


                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Bank Name"
                                onChangeText={(text) => { setBname(text); setIsbname(true) }}
                                style={{ borderWidth: 1, borderColor: '#cdd4cf' ,backgroundColor: '#fff', width: '100%', color: 'black', marginBottom: isbName ? '10%' : '0%' }}
                                value={bName}
                            />


                            <Text style={{ marginBottom: isbName ? '0%' : '10%', color: 'red', display: isbName ? 'none' : 'flex' }}>Please enter Bank Name.</Text>

                            <TextInput
                                keyboardType='number-pad'
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Bank Account Number"
                                value={AccountNo}
                                isFocused={false}
                                onChangeText={(text) => { setAccountNo(text); setIsAcc(true) }}
                                style={{ borderWidth: 1, borderColor: '#cdd4cf', backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isacc ? '10%' : '0%' }}
                            />

                            <Text style={{ marginBottom: isacc ? '0%' : '10%', color: 'red', display: isacc ? 'none' : 'flex' }}>Please enter Account Number.</Text>
                            <TextInput
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Sort Code"
                                value={bCode}
                                isFocused={false}
                                onChangeText={(text) => { setBcode(text); setIsbcode(true) }}
                                style={{ borderWidth: 1, borderColor: '#cdd4cf', backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isbcode ? '10%' : '0%' }}
                            />

                            <Text style={{ marginBottom: isbcode ? '0%' : '10%', color: 'red', display: isbcode ? 'none' : 'flex' }}>Please enter Sort code.</Text>
                            <TextInput
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Account Holder Name"
                                value={AHname}
                                isFocused={false}
                                onChangeText={(text) => { setAhname(text); setIsAH(true) }}
                                style={{ borderWidth: 1, borderColor: '#cdd4cf',backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isah ? '10%' : '0%' }}
                            />

                            <Text style={{ marginBottom: isah ? '0%' : '10%', color: 'red', display: isah ? 'none' : 'flex' }}>Please enter Account holder name.</Text>



                        {!isSign ?
                            <Button mode="clear" loading color="rgb(32, 137, 220)"
                            >.. </Button>
                            :
                            <Button onPress={() => JoinGroupbyId()} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }}  >Next</Button>}



                        </Card>
                        {
                            isSign == false ?
                            <Text style={{ alignSelf: 'center' }}>Loading</Text> 
                            :
                            <>
                            </>
                        }

                    
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
    <ActivityIndicator style={{ marginTop: '2%' }} animating={!isSign} color="rgb(32, 137, 220)" />
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

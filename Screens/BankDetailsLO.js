import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Overlay, Header,Card } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Button, TextInput, Caption } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import firebase from "../firebase/firebase";
import { editUser } from '../store/actions'
import { Platform } from 'react-native';
export default function BankDetailsLO({ route, navigation, navigation: { goBack } }) {
    const { groupName } = route.params;

    const { groupId } = route.params;
    const { pname } = route.params;
    const { rel } = route.params;
    const { address } = route.params;
    const { town } = route.params;
    const { postal } = route.params;
    const { tele } = route.params;
    const { email } = route.params;
    const { amount } = route.params;
    const { time3 } = route.params;
    const dispatch = useDispatch()
    const uid = useSelector(state => state.uid)
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
    const fname1 = useSelector(state => state.fname)
    const lname1 = useSelector(state => state.lname)
    const title = useSelector(state => state.title)
    const address1 = useSelector(state => state.address)
  
    const masjid = useSelector(state => state.masjid)
    const zip = useSelector(state => state.zip)
    const email1 = useSelector(state => state.email)
    const docid = useSelector(state => state.docid)
    const phone = useSelector(state => state.phone)
    const issq2 = useSelector(state => state.issq)
    const isans2 = useSelector(state => state.isans)
    const islo = useSelector(state => state.islo)
    const isjg = useSelector(state => state.isjg)
    const customerId = useSelector(state => state.customerId)
    async function addtoUser(customerId) {

        try {
            var today = new Date();
            const voteRef2 = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
            voteRef2.get().then(doc => {
                if (doc.exists) {
                    const JoinedGroup = { UID: groupId, groupName: groupName, joined: today, customerId: customerId };

                    return voteRef2.update({ JoinedGroup: JoinedGroup });
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
    async function updateTotal(total) {

        try {

          
            const voteRef3 = await firebase.db.collection("groups").doc(groupId);
            voteRef3.get().then(doc => {
                if (doc.exists) {
                    
                        return voteRef3.update({ collectedAmount: (doc.data().collectedAmount + parseInt(total)) });
 
                    
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
                isLovedOne:true


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
                const voteRef = await firebase.db.collection("groups").doc(groupId);
                voteRef.get().then(doc => {
                    if (doc.exists) {

                        const voteRef2 = firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
                        voteRef2.get().then(doc1 => {
                            if (doc1.exists) {
                                const LovedOne = {
                                    pname: pname,
                                    rel: rel,
                                    address: address,
                                    town: town,
                                    postal_code: postal,
                                    email: email,
                                    telephone: tele,
                                    groupName: groupName,
                                    groupId: groupId
                                };

                                return voteRef2.update({ LovedOne: LovedOne });
                            }
                        }).then(function () {

                         





                            axios.post('https://us-central1-mm-burial.cloudfunctions.net/createCustomer', null, {
                                params: {
                                    email: email,
                                    given_name: pname,
                                    family_name: pname,
                                    address_line1: address,
                                    address_line2: "null",
                                    city: "city",
                                    postal_code: postal,
                                    country_code: "GB",
                                    UserId: uid.replace(/['"]+/g, '')
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
                                                    var id = '_' + Math.random().toString(36).substr(2, 9);
                                                    axios.post('https://us-central1-mm-burial.cloudfunctions.net/createMandate', null, {
                                                        params: {

                                                            joiningId: id,
                                                            customer_bank_account: response1.data.id


                                                        }
                                                    })
                                                        .then(function (response2) {
                                                            console.log(response2.data.id)
                                                            let tot = (parseInt(doc.data().amount) + ((1 / 100) * parseInt(doc.data().amount) + 0.20)) * 100
                                                       
                                                            axios.post('https://us-central1-mm-burial.cloudfunctions.net/createSubcription', null, {
                                                                params: {

                                                                    amount: tot,
                                                                    currency: "GBP",
                                                                    name: groupId,
                                                                    interval_unit: doc.data().time,
                                                                    day_of_month: null,
                                                                    groupId: groupId,
                                                                    mandateId: response2.data.id

                                                                }
                                                            })
                                                                .then(function (response3) {


                                                                    updateTotal(doc.data().amount)
                                                                    createSubcription_(response.data.id, response1.data.id, response2.data.id, response3.data.id)


                                                                    setIsSign(true)

                                                                    Alert.alert("Successfully Saved")

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
                                                //console.log(error);
                                            });
                                      

                                    }

                                })
                                .catch(function (error) {
                                    alert("Invalid Bank Details: Please Check Bank Details");
                                });




                        });

                    }
                    else {

                        alert("Group Not Found!")
                    }
                }) 


                setIsLoad(true)
            }


        }
        catch (err) {


            Alert.alert(err);

        }
        finally {
            //const history = createHashHistory();
            //    //history.go("/login");
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
                            padding:0
                        }}
                    >
                        <Card>


                            <View style={{ marginTop: '5%', flexDirection: 'row', flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: 14, }}>
                                        Donation Total
                                        </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ opacity: 0 }}> : </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-end', fontSize: 14 }}>
                                        {"\u00A3"}
                                        {

                                            amount}

                                    </Text>

                                </View>

                            </View>
                            <View style={{ marginTop: '0%', flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginBottom: '2%' }}>
                                    <Caption style={{ alignSelf: 'flex-start', fontSize: 11 }}>
                                        Transaction Charges
                                        </Caption>


                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ opacity: 0 }}> : </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Caption style={{ fontSize: 11, fontWeight: 'bold', alignSelf: 'flex-end' }}>
                                        {"\u00A3"}
                                        {((1 / 100) * parseInt(amount) + 0.20).toFixed(2)}

                                    </Caption>
                                </View>

                            </View>
                            <View style={{ marginRight: '25%', marginTop: '4%', flexDirection: 'row' }}>
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
                            <View style={{ marginTop: '0%', flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ alignSelf: 'flex-start', fontSize: 14 }}>
                                        Sub Total
                                        </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ opacity: 0 }}> : </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14, alignSelf: 'flex-end' }}>
                                        {"\u00A3"}
                                        {(parseInt(amount) + ((1 / 100) * parseInt(amount) + 0.20)).toFixed(2)}

                                    </Text>
                                </View>

                            </View>
                            <Text style={{ fontSize: 17 }}>
                                <Caption style={{ alignSelf: 'flex-end', fontSize: 11, }}>
                                    
                                            </Caption>

                            </Text>

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
                                value={fname1.replace(/['"]+/g, '')}
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
                                value={lname1.replace(/['"]+/g, '')}
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
                                value={email1.replace(/['"]+/g, '')}
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
                                value={address1.replace(/['"]+/g, '') + " " + zip.replace(/['"]+/g, '')}
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
                                style={{ backgroundColor: '#fff', width: '100%', color: 'black', marginBottom: isbName ? '10%' : '0%' }}
                                value={bName}
                            />


                            <Text style={{ marginBottom: isbName ? '0%' : '10%', color: 'red', display: isbName ? 'none' : 'flex' }}>Please enter Bank Name.</Text>

                            <TextInput
                                keyboardType="number-pad"
                                inputStyles={{ marginTop: '1%' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Bank Account Number"
                                value={AccountNo}
                                isFocused={false}
                                onChangeText={(text) => { setAccountNo(text); setIsAcc(true) }}
                                style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isacc ? '10%' : '0%' }}
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
                                style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isbcode ? '10%' : '0%' }}
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
                                style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isah ? '10%' : '0%' }}
                            />

                            <Text style={{ marginBottom: isah ? '0%' : '10%', color: 'red', display: isah ? 'none' : 'flex' }}>Please enter Account holder name.</Text>






                        </Card>
                        {!isSign ?
                            <Button mode="clear" loading color="rgb(32, 137, 220)"
                            >.. </Button>
                            :
                            <Button onPress={() => JoinGroupbyId()} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }}  >Next</Button>}


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

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Overlay, Header, Card } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Button, TextInput, Caption, Divider, ActivityIndicator, Colors  } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import createNewUser from './gocardlessapi/functions'
import firebase from "../firebase/firebase";
import { editUser } from '../store/actions'
import { VirtualizedList } from 'react-native';
import { Toast } from 'native-base';
import axios from 'axios';
import { CreditCardInput } from "react-native-credit-card-input";
import { set } from 'react-native-reanimated';
export default function Paynow({ route, navigation, navigation: { goBack } }) {
    const { groupName } = route.params;
    const { groupId } = route.params;
    const { isDonate } = route.params;
    const { total } = route.params;
    const { time } = route.params;
    const { isJoinmmb } = route.params;
    const { adminCost } = route.params;
    const { actual } = route.params;
    const { jamount } = route.params;
    const { joinCG } = route.params;
    const { duration } = route.params;
    const { mmbduration } = route.params;
    const dispatch = useDispatch();

    const [isSign, setIsSign] = React.useState(true);
    const [isSign2, setIsLoad] = React.useState(true);
    const [bName, setBname] = React.useState(null);
    const [cardNumber, setCnum] = React.useState(null);
    const [expmonth, setExpMonth] = React.useState(null);
    const [expyear, setExpyear] = React.useState(null);
    const [cvc, setCvc] = React.useState(null);
    const [cardtype, setCardtype] = React.useState(null);
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
    const uid = useSelector(state => state.uid)
    const title = useSelector(state => state.title)
    const address = useSelector(state => state.address)
    const city = useSelector(state => state.city)
    const town = useSelector(state => state.town)
    const masjid = useSelector(state => state.masjid)
    const zip = useSelector(state => state.zip)
    const email = useSelector(state => state.email)
    const phone = useSelector(state => state.phone)
    const docid = useSelector(state => state.docid)
    const issq2 = useSelector(state => state.issq)
    const isans2 = useSelector(state => state.isans)
    const islo = useSelector(state => state.islo)
    const iscg = useSelector(state => state.iscg)
    const customerId = useSelector(state => state.customerId)


    async function _onChange(data) {
       
        if (data.valid == true) {  
        setCnum(data["values"].number)
        setCvc(data["values"].cvc)
        setExpyear(data["values"].expiry.split("/")[1])
        setExpMonth(data["values"].expiry.split("/")[0])
               
        console.log(cvc)
        console.log(expmonth)
        console.log(expyear)
        console.log(cardtype)}

    }
    async function countplus(gid) {

        try {

            const newLink = {
                groupId: gid,
                userId: uid.replace(/['"]+/g, '')


            };
            const user12 = firebase.db.collection("payment_made").add(newLink);

        }
        catch (err) {


            Alert.alert(err);

        }
        finally {
            //const history = createHashHistory();
            //history.go("/login");
        }

    }
    async function payit() {
        setIsSign(false)

        if (adminCost == true) {
            try {

                const voteRef2 = await firebase.db.collection("paymentMethods").doc(uid.replace(/['"]+/g, ''));
                voteRef2.get().then(doc => {
                    if (doc.exists) {

                        let tot = (parseInt(actual) + 2) + ((1 / 100) * parseInt(actual) + 0.20) * 100
                        
                        axios.post('https://us-central1-mm-burial.cloudfunctions.net/getPaymentIntent', null, {
                            params: {

                                amount: tot,
                                currency: "gbp",
                                groupId: "MMBGeneralGroup",
                                customer: doc.data().customer

                            }
                        })
                            .then(function (response4) {
                                console.log(response4)
                                axios.post('https://us-central1-mm-burial.cloudfunctions.net/confirmPaymentIntent', null, {
                                    params: {

                                        paymentIntent: response4.data.id,
                                        paymentMethod: doc.data().pm_id

                                    }
                                })
                                    .then(function (response5) {
                                        
                                        if (response5.status == "200") {
                                            updateDonateAmount(parseInt(actual) + 2)
                                            countplus("MMBGeneralGroup")
                                            alert("Successfully Donated")
                                            navigation.navigate("Home")


                                        }



                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });



                            })
                            .catch(function (error) {
                                console.log(error);
                            });














                    }
                    else {

                        axios.post('https://us-central1-mm-burial.cloudfunctions.net/createPaymentMethod', null, {
                            params: {

                                number: cardNumber,
                                exp_month: expmonth,
                                exp_year: expyear,
                                cvc: cvc,
                                userId: uid

                            }
                        })
                            .then(function (response3) {


                                axios.post('https://us-central1-mm-burial.cloudfunctions.net/createCustomerStripe', null, {
                                    params: {

                                        uid: uid.replace(/['"]+/g, ''),
                                        id: response3.data.id
                                    }
                                })
                                    .then(function (response_cc) {
                                        console.log(response_cc.data.customer)
                                        let tot = (parseInt(actual) + 2) + ((1 / 100) * parseInt(actual) + 0.20) * 100
                                        axios.post('https://us-central1-mm-burial.cloudfunctions.net/getPaymentIntent', null, {
                                            params: {


                                                amount: tot,
                                                currency: "gbp",
                                                groupId: "MmbGeneralGroup",
                                                customer: response_cc.data.customer
                                            }
                                        })
                                            .then(function (response_pi) {
                                                // console.log(response_pi)
                                                try {

                                                    const newLink = {

                                                        pm_id: response3.data.id,
                                                        customer: response_cc.data.customer


                                                    };
                                                    const user12 = firebase.db.collection("paymentMethods").doc(uid.replace(/['"]+/g, '')).set(newLink);

                                                }
                                                catch (err) {


                                                    Alert.alert(err);

                                                }



                                                axios.post('https://us-central1-mm-burial.cloudfunctions.net/confirmPaymentIntent', null, {
                                                    params: {

                                                        paymentIntent: response_pi.data.id,
                                                        paymentMethod: response3.data.id

                                                    }
                                                })
                                                    .then(function (response4) {
                                                        //onsole.log(response4)
                                                        if (response4.status == "200") {
                                                            updateDonateAmount(parseInt(actual) + 2)
                                                            countplus("MMBGeneralGroup")
                                                            alert("Successfully Donated")
                                                            navigation.navigate("Home")


                                                        }



                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    });







                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });





















                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });



                            })
                }
                })
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            try {

                const voteRef2 = await firebase.db.collection("paymentMethods").doc(uid.replace(/['"]+/g, ''));
                voteRef2.get().then(doc => {
                    if (doc.exists) {

                   
                        let tot = parseInt(actual) + ((1 / 100) * parseInt(actual) + 0.20) * 100
                          

                        axios.post('https://us-central1-mm-burial.cloudfunctions.net/getPaymentIntent', null, {
                            params: {
                             
                                amount: tot,
                                currency: "gbp",
                                groupId: "MmbGeneralGroup",
                                customer: doc.data().customer

                            }
                        })
                            .then(function (response4) {
                                console.log(response4)
                                axios.post('https://us-central1-mm-burial.cloudfunctions.net/confirmPaymentIntent', null, {
                                    params: {

                                        paymentIntent: response4.data.id,
                                        paymentMethod: doc.data().pm_id

                                    } 
                                })
                                    .then(function (response5) {
                                        console.log(response5)
                                        if (response5.status == "200") {
                                            updateDonateAmount(actual)
                                            countplus("MMBGeneralGroup")
                                            alert("Successfully Donated")
                                            navigation.navigate("Home")


                                        }



                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });



                            })
                            .catch(function (error) {
                                console.log(error);
                            });










                    }
                    else {

                        axios.post('https://us-central1-mm-burial.cloudfunctions.net/createPaymentMethod', null, {
                            params: {

                                number: cardNumber,
                                exp_month: expmonth,
                                exp_year: expyear,
                                cvc: cvc,
                                userId: uid

                            }
                        })
                            .then(function (response3) {


                                axios.post('https://us-central1-mm-burial.cloudfunctions.net/createCustomerStripe', null, {
                                    params: {

                                         uid: uid.replace(/['"]+/g, ''),
                                        id: response3.data.id
                                    }
                                })
                                    .then(function (response_cc) {
                                        console.log(response_cc.data.customer)
                                        let tot = parseInt(actual) + ((1 / 100) * parseInt(actual) + 0.20) * 100

                                        axios.post('https://us-central1-mm-burial.cloudfunctions.net/getPaymentIntent', null, {
                                            params: {


                                                amount: tot,
                                                currency: "gbp",
                                                groupId: "MmbGeneralGroup",
                                                customer: response_cc.data.customer
                                            }
                                        })
                                            .then(function (response_pi) {
                                               // console.log(response_pi)
                                                try {

                                                    const newLink = {

                                                        pm_id: response3.data.id,
                                                        customer:response_cc.data.customer


                                                    };
                                                    const user12 = firebase.db.collection("paymentMethods").doc(uid.replace(/['"]+/g, '')).set(newLink);

                                                }
                                                catch (err) {


                                                    Alert.alert(err);

                                                }


                                             
                                                        axios.post('https://us-central1-mm-burial.cloudfunctions.net/confirmPaymentIntent', null, {
                                                            params: {

                                                                paymentIntent: response_pi.data.id,
                                                                paymentMethod: response3.data.id

                                                            }
                                                        })
                                                            .then(function (response4) {
//onsole.log(response4)
                                                                if (response4.status == "200") {
                                                                    updateDonateAmount(actual)
                                                                    countplus("MMBGeneralGroup")
                                                                    alert("Successfully Donated")
                                                                    navigation.navigate("Home")


                                                                }



                                                            })
                                                            .catch(function (error) {
                                                                console.log(error);
                                                            });



                                                    



                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });





















                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });



                            })
                    }
                })
            }
            catch (e) {
                console.log(e)
            }

        }

       
    }
 
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
    async function updatecustomerId(customerId) {

        try {

            const voteRef2 = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
            voteRef2.get().then(doc => {
                if (doc.exists) {

                    return voteRef2.update({ customerId: customerId });
                }
            })
            const voteRef3 = await firebase.db.collection("groups").doc(groupId);
            voteRef3.get().then(doc => {
                if (doc.exists) {
                    if (isJoinmmb == true) {
                        return voteRef3.update({ collectedAmount: (doc.data().collectedAmount + parseInt(total)) });

                    }
                    else {
                        return voteRef3.update({ collectedAmount: (doc.data().collectedAmount + parseInt(jamount)) });

                    }
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
    async function updateDonateAmount(amount) {

        try {

          
            const voteRef3 = await firebase.db.collection("groups").doc("MMBGeneralGroup");
            voteRef3.get().then(doc => {
                if (doc.exists) {
                   
                    return voteRef3.update({ collectedAmount: (doc.data().collectedAmount + parseInt(amount)) });

                    
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
        //   getUserList()
        try {
            setIsSign(false)



            if (bName == null || bName.trim() == "") {
                Alert.alert("Enter group Account no.");

            } else if (AccountNo == null || AccountNo.trim() == "") {

                Alert.alert("Enter group Account no.");

            }
            else if (!(AccountNo.length == 8)) {
                Alert.alert("Enter 8 Digit Bank Account Number.");
            }
            else if (bCode == null || bCode.trim() == "") {
                Alert.alert("Enter branch code.");

            }
            else if (!(bCode.length == 6)) {
                Alert.alert("Enter 6 Digit Branch code.");
            }
            else if (AHname == null || AHname.trim() == "") {
                Alert.alert("Enter Account Holder Name.");

            }

            else {
                setIsSign(false)
                if (isJoinmmb == true) {



                    const voteRef = await firebase.db.collection("groups").doc(groupId);
                    voteRef.get().then(doc => {
                        if (doc.exists) {
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
                                        UserId: uid.replace(/['"]+/g, '')
                                    }
                                })
                                    .then(function (response) {
                                        if (response.data.errors) {

                                            alert(response.data.errors[0].field + " " + response.data.errors[0].message)
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

                                                                axios.post('https://us-central1-mm-burial.cloudfunctions.net/createSubcription', null, {
                                                                    params: {

                                                                        amount: parseInt(total) * 100,
                                                                        currency: "GBP",
                                                                        name: groupId,
                                                                        interval_unit: mmbduration,
                                                                        day_of_month: null,
                                                                        groupId: groupId,
                                                                        mandateId: response2.data.id

                                                                    }
                                                                })
                                                                    .then(function (response3) {



                                                                        addtoUser(response.data.id);
                                                                        updatecustomerId(response.data.id);
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
                                                                        AsyncStorage.setItem('phone', phone);
                                                                        AsyncStorage.setItem('uid', uid2);
                                                                        AsyncStorage.setItem('IsLO', islo);
                                                                        AsyncStorage.setItem('IsJG', JSON.stringify(groupId));
                                                                        AsyncStorage.setItem('IsCG', iscg);
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
                                                                            issq: issq2,
                                                                            masjid: masjid,
                                                                            town: town,
                                                                            isans: isans2,
                                                                            phone: phone,
                                                                            islo: islo,
                                                                            isjg: JSON.stringify(groupId),
                                                                            iscg: iscg,
                                                                            customerId: response.data.id
                                                                        }))

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
                                                    //console.log(error);
                                                });



                                        }

                                    })
                                    .catch(function (error) {
                                        alert("Invalid Bank Details: Please Check Bank Details");
                                    });

                            }



                        }
                        else {

                            alert("Group Not Found!")
                        }
                    })


                    setIsLoad(true)

                }
                else if (joinCG == true) {

                    const voteRef = await firebase.db.collection("groups").doc(groupId);
                    voteRef.get().then(doc => {
                        if (doc.exists) {

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
                                        UserId: uid.replace(/['"]+/g, '')
                                    }
                                })
                                    .then(function (response) {
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

                                                            axios.post('https://us-central1-mm-burial.cloudfunctions.net/createSubcription', null, {
                                                                params: {

                                                                    amount: parseInt(jamount) * 100,
                                                                    currency: "GBP",
                                                                    name: groupId,
                                                                    interval_unit: time,
                                                                    day_of_month: null,
                                                                    groupId: groupId,
                                                                    mandateId: response2.data.id

                                                                }
                                                            })
                                                                .then(function (response3) {



                                                                    addtoUser(response.data.id);
                                                                    updatecustomerId(response.data.id);
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
                                                                    AsyncStorage.setItem('phone', phone);
                                                                    AsyncStorage.setItem('uid', uid2);
                                                                    AsyncStorage.setItem('IsLO', islo);
                                                                    AsyncStorage.setItem('IsJG', JSON.stringify(groupId));
                                                                    AsyncStorage.setItem('IsCG', iscg);
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
                                                                        issq: issq2,
                                                                        masjid: masjid,
                                                                        town: town,
                                                                        isans: isans2,
                                                                        phone: phone,
                                                                        islo: islo,
                                                                        isjg: JSON.stringify(groupId),
                                                                        iscg: iscg,
                                                                        customerId: response.data.id
                                                                    }))

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
                                                //console.log(error);
                                            });





                                    })
                                    .catch(function (error) {
                                        alert("Invalid Bank Details: Please Check Bank Details");
                                    });

                            }



                        }
                        else {

                            alert("Group Not Found!")
                        }
                    })


                    setIsLoad(true)






                }
               
                setIsSign(true)


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


    function PayNow() {
        if (bName == null || bName.trim() == "") {
            Alert.alert("Enter group Account no.");

        } else if (AccountNo == null || AccountNo.trim() == "") {
            Alert.alert("Enter group Account no.");

        }
        else if (bCode == null || bCode.trim() == "") {
            Alert.alert("Enter branch code.");

        }
        else if (AHname == null || AHname.trim() == "") {
            Alert.alert("Enter Account Holder Name.");

        }

        else {

            Alert.alert("Thank you for your donation. you have successfully donated!")
            navigation.navigate("Home")
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
                        {isDonate == true ?
                            <>
                                <Card  >
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 14, }}>
                                                Quick Donate
                                        </Text>

                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ alignSelf: 'flex-end', fontSize: 14, }}>
                                                {"\u00A3"}
                                                {adminCost ? parseInt(actual) : actual}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Caption style={{ alignSelf: 'flex-start', fontSize: 14, }}>
                                            {adminCost == true ? "Burial Fund" + ", Sadaqah" : "Burial Fund"}
                                        </Caption>
                                    </View>
                                    {adminCost == true ?
                                        <>

                                            <View style={{ marginTop: '5%', marginBottom: '5%', flexDirection: 'row' }}>
                                                <View style={{ justifyContent: 'flex-start' }}>
                                                    <Text style={{ alignSelf: 'flex-start', fontSize: 14, }}>
                                                        Administration
                                        </Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ alignSelf: 'flex-end', fontSize: 14, }}>
                                                        {"\u00A3"}
                                                2
                                                    </Text>
                                                </View>
                                            </View>

                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                    <Divider />
                                    <View style={{ marginTop: '5%', flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 14, }}>
                                                Transaction Charges
                                            </Text>

                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ alignSelf: 'flex-end', fontSize: 14, }}>
                                                {"\u00A3"}
                                                {((1.4 / 100) * parseInt(total) + 0.20).toFixed(2)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{marginRight:'5%', marginTop: '7%', flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>

                                            <Caption style={{marginTop:'5%',alignSelf:'flex-end'}}>
                                                Powered by
                                                </Caption>
                                            
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Image
                                                style={{
                                                    width: '40%',
                                                    height: 40,
                                                    
                                                    alignSelf: 'flex-start'

                                                }}
                                                source={require('./../stripe.png')}
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
                                                {adminCost ? ((parseInt(total) + 2) + (1.4 / 100) * parseInt(total)).toFixed(2) + 0.20 : (parseInt(total) + (1 / 100) * parseInt(total) + 0.20).toFixed(2)}
                                            </Text>
                                        </View>
                                    </View>
                                </Card>
                               
                            </>
                            :
                            <></>
                        }
                        {isJoinmmb == true ?
                            <>
                                <Card  >
                                    <Text style={{ fontSize: 15, alignSelf: 'center' }}>
                                        {"\u00A3"}
                                        {total}
                                    </Text>
                                    <Text style={{ marginBottom: '5%', fontSize: 15, alignSelf: 'center' }}>
                                        {mmbduration} Joining Amount
                                            </Text>
                                </Card>
                            </>
                            :
                            <></>
                        }
                        {joinCG == true ?

                            <Card>
                                <Text style={{ fontSize: 15, alignSelf: 'center' }}>
                                    {"\u00A3"}
                                    {jamount}
                                </Text
                                >

                                <Text style={{ marginBottom: '5%', fontSize: 15, alignSelf: 'center' }}>
                                    Joining Amount
                                            </Text>
                                <Caption style={{ alignSelf: 'center' }}>
                                    per {time}
                                </Caption>
                            </Card>
                            :
                            <>
                            </>
                        }
                        {
                            duration == "1" ?
                                <>
                                    <View style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>


                                        <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'rgb(32, 137, 220)', marginBottom: '10%' }}>Enter Bank Account Details</Text>



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
                                            label="Branch Code"
                                            value={bCode}
                                            isFocused={false}
                                            onChangeText={(text) => { setBcode(text); setIsbcode(true) }}
                                            style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isbcode ? '10%' : '0%' }}
                                        />

                                        <Text style={{ marginBottom: isbcode ? '0%' : '10%', color: 'red', display: isbcode ? 'none' : 'flex' }}>Please enter branch code.</Text>
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






                                    </View>
                                    {!isSign ?
                                        <Button mode="clear" loading color="rgb(32, 137, 220)"
                                        >.. </Button>
                                        :
                                        <Button onPress={isDonate == true ? () => PayNow() : () => JoinGroupbyId()} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }}  > {isDonate == true ? "Next" : "Join"}</Button>}
                                </>
                                : duration == "0" ?
                                    <>
                                        <Card>

                                            <CreditCardInput onChange={(text) => { _onChange(text) }} />
                                            </Card>
                                            <Button style={{ marginTop: '5%', width: '90%', alignSelf: 'center', backgroundColor: '#0095ff' }} mode="contained" onPress={() => { payit() }}>
                                            Pay Now!
                                        </Button>

                                              </>
                                    :
                                    <>
                                        <View style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>


                                            <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'rgb(32, 137, 220)', marginBottom: '10%' }}>Enter Bank Account Details</Text>



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
                                                label="Branch Code"
                                                value={bCode}
                                                isFocused={false}
                                                onChangeText={(text) => { setBcode(text); setIsbcode(true) }}
                                                style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isbcode ? '10%' : '0%' }}
                                            />

                                            <Text style={{ marginBottom: isbcode ? '0%' : '10%', color: 'red', display: isbcode ? 'none' : 'flex' }}>Please enter branch code.</Text>
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




  {!isSign ?
                                            <Button mode="clear" loading color="rgb(32, 137, 220)"
                                            >.. </Button>
                                            :
                                            <Button onPress={() => { JoinGroupbyId() }} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }}  > {isDonate == true ? "Next" : "Join"}</Button>}

                                        </View>
                                       
                                    </>
                        }
                        <ActivityIndicator style={{ marginTop: '2%' }} animating={!isSign} color="rgb(32, 137, 220)" />
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

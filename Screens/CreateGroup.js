import React, { useEffect } from 'react';
import { StyleSheet, Text, View,Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Overlay, Header, ButtonGroup } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import firebase from "../firebase/firebase"; 
import FloatingLabelInput from 'react-native-floating-label-input';
import { editUser } from '../store/actions'
 

export default function CreateGroup({ navigation, navigation: { goBack } }) {
   
    const dispatch = useDispatch()
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
    const issq2 = useSelector(state => state.issq)
    const isans2 = useSelector(state => state.isans)
    const islo = useSelector(state => state.islo)
    const isjg = useSelector(state => state.isjg)
    const [isSign, setIsSign] = React.useState(true);
    const [groupName, setGname] = React.useState(null);
    const [isgroupName, setIsgroupname] = React.useState(true);
    const [isGid, setIsgid] = React.useState(true);
    const [isamount, setIsamount] = React.useState(true);
    const [txtamount, setTxt] = React.useState(false);
    const [time, setTime] = React.useState(null);
    const [amount, setAmount] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [selectedIndex2, setSelectedIndex2] = React.useState(-1);
    const buttonsWeekly = ['\u00A3' + '3','\u00A3' + '6', '\u00A3' + '9']
    const buttonsMonthly = ['\u00A3' + '10','\u00A3' + '15', '\u00A3' + '20']
    const buttonsYearly = ['\u00A3' + '150','\u00A3' + '200', '\u00A3' + '250']
    const buttons2 = ['Weekly', 'Monthly', 'Annually']
    console.log(uid2 + fname + lname + title + address + town + masjid + zip + email + docid + issq2 + isans2)
    function updateIndexWeekly(selectedIndex) {

        setSelectedIndex(selectedIndex)
        if (selectedIndex == 0 || selectedIndex == '0') {
            setAmount(3)
        } else if (selectedIndex == 1 || selectedIndex == '1') {
            setAmount(6)
        } else if (selectedIndex == 1 || selectedIndex == '2') {
            setAmount(9)
        }
    }
    function updateIndexMonthly(selectedIndex) {

        setSelectedIndex(selectedIndex)
        if (selectedIndex == 0 || selectedIndex == '0') {
            setAmount(10)
        } else if (selectedIndex == 1 || selectedIndex == '1') {
            setAmount(15)
        }else if (selectedIndex == 1 || selectedIndex == '2') {
            setAmount(20)
        }
    }
    function updateIndexYearly(selectedIndex) {

        setSelectedIndex(selectedIndex)
        if (selectedIndex == 0 || selectedIndex == '0') {
            setAmount(150)
        } else if (selectedIndex == 1 || selectedIndex == '1') {
            setAmount(200)
        }else if (selectedIndex == 1 || selectedIndex == '2') {
            setAmount(250)
        }
    }
    function updateIndex2(selectedIndex) {
        setAmount(0)
        setSelectedIndex(-1)
        setSelectedIndex2(selectedIndex)
        if (selectedIndex == 0 || selectedIndex == '0') {
            setTime("weekly")
        } else if (selectedIndex == 1 || selectedIndex == '1') {
            setTime('monthly')
        }
        else if (selectedIndex == 2 || selectedIndex == '2') {
            setTime('yearly')
        }
    }

    async function createGroup() {

        try {
             
         

             
            if (groupName == null || groupName == "") {
                Alert.alert("Enter group name.");

            } else if (amount == null || amount == "") {
                        Alert.alert("Enter Amount.");
                        
            }
            else if (time == null || time == "") {
                        Alert.alert("Enter Time.");
                        
                    }   

                    else {
                var id = '_' + Math.random().toString(36).substr(2, 9);
                navigation.navigate("BankDetailsCG", { id: id, groupName: groupName, amount: amount, time: time })
                //var today = new Date();
                //        const voteRef = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
                //        voteRef.get().then(doc => {
                //            if (doc.exists) {
                //               const newLink = {
                //                   userId: uid2,
                //                    groupId: id,

                //                };
                //                const user12 = firebase.db.collection("groups").doc(id).set(newLink);

                //                const CreatedGroup = { UID: id, groupName: groupName, amount: amount, time: time, created: today };

                //                return voteRef.update({ CreatedGroup: CreatedGroup });
                                
                //            }
                //        }).then(function () {
                //            AsyncStorage.setItem('IsSQ', issq2);
                //            AsyncStorage.setItem('IsAns', isans2);
                //            AsyncStorage.setItem('address', address)

                //            AsyncStorage.setItem('zip', zip)
                //            AsyncStorage.setItem('title', title)
                //            AsyncStorage.setItem('docid', docid);
                //            AsyncStorage.setItem('email', email);

                //            AsyncStorage.setItem('fname', fname);
                //            AsyncStorage.setItem('lname', lname);
                //            AsyncStorage.setItem('town', town);
                //            AsyncStorage.setItem('masjid', masjid);
                //            AsyncStorage.setItem('uid', uid2);
                //            AsyncStorage.setItem('IsLO', islo);
                //            AsyncStorage.setItem('IsJG', isjg);
                //            AsyncStorage.setItem('IsCG', JSON.stringify(id));



                //            dispatch(editUser({
                //                lname: lname,
                //                title: title,
                //                fname: fname,
                //                zip: zip,
                //                address: address,
                //                email: email,
                //                docid: docid,
                //                uid: uid2,
                //                issq: issq2,
                //                isans: isans2,
                //                islo: islo,
                //                isjg: isjg,
                //                iscg: JSON.stringify(id)
                //            }))
                           
                //              alert("Group Created Successfully")
                //navigation.navigate("Home")
                //        });

                
              
                    }
              
             
        }
        catch (err) {
            
          
            Alert.alert(err);

        }
        finally {
            //const history = createHashHistory();
            //history.go("/login");
        }

    }

    function changeamount(amount) {
        if (amount != "") {
            setTxt(true)
            setAmount(amount)
        }
        else {
            setSelectedIndex(-1)
            setAmount(null)
            setTxt(false)
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
                    <ScrollView style={{

                        margin: 27,
                        padding: 0
                    }} 
>


                        <View style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>
                            <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'rgb(32, 137, 220)', marginBottom: '10%' }}>Create Community Group</Text>



                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '3%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="Group Name"
                                onChangeText={(text) => { setGname(text); setIsgroupname(true) }}
                                style={{ backgroundColor:'#fff', width: '100%', color: 'black', marginBottom: isgroupName ? '10%' : '0%' }}
                                value={groupName}
                            />


                            <Text style={{ marginBottom: isgroupName ? '0%' : '10%', color: 'red', display: isgroupName ? 'none' : 'flex' }}>Please enter Group Name.</Text>


                            <ButtonGroup
                                onPress={(text) => { updateIndex2(text) }}
                                selectedIndex={selectedIndex2}
                                buttons={buttons2}
                                containerStyle={{ height: 50 }}

                                style={{ marginBottom: '5%' }}
                            />


                                <Text style={{ fontWeight: 'bold', color: 'rgb(32, 137, 220)' }}>Select Amount</Text>
                        

                            {
                                time == "weekly" ?
                                <ButtonGroup
                                    onPress={(text) => { updateIndexWeekly(text) }}
                                    selectedIndex={selectedIndex}
                                    buttons={buttonsWeekly}
                                    containerStyle={{ height: 50 }}
                                    disabled={txtamount == false ? false : true}
                                    style={{ marginBottom: '5%' }}
                                    />
                                    :
                                    time == "monthly" ?
                                <ButtonGroup
                                    onPress={(text) => { updateIndexMonthly(text) }}
                                    selectedIndex={selectedIndex}
                                    buttons={buttonsMonthly}
                                    containerStyle={{ height: 50 }}
                                    disabled={txtamount == false ? false : true}
                                    style={{ marginBottom: '5%' }}
                                        />
                                        : time == "yearly" ?

                                <ButtonGroup
                                    onPress={(text) => { updateIndexYearly(text) }}
                                    selectedIndex={selectedIndex}
                                    buttons={buttonsYearly}
                                    containerStyle={{ height: 50 }}
                                    disabled={txtamount == false ? false : true}
                                    style={{ marginBottom: '5%' }}
                                            />
                                            :
                                            <>
                                                </>
                                }

                            <TextInput
                                isFocused={false}
                                inputStyles={{ marginTop: '1%' }}
                                customLabelStyles={{ alignText: 'right' }}
                                containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="or choose amount"
                                onChangeText={(text) => { changeamount(text); setIsamount(true) }}
                                style={{ backgroundColor: '#fff', width: '100%', color: 'black', marginBottom: isamount ? '10%' : '0%' }}
                                value={amount}
                                
                                

                            />
                            <Text style={{ marginBottom: isamount ? '0%' : '10%', color: 'red', display: isamount ? 'none' : 'flex' }}>Please enter Group Name.</Text>

                          




                        </View>
                        {!isSign ?
                            <Button mode="clear" loading color="rgb(32, 137, 220)"
                            >.. </Button>
                            :
                            <Button
                                color="rgb(32, 137, 220)"
                                mode="contained"
                                style={{ width: '90%', alignSelf: 'center', marginBottom: '5%', marginTop: '5%' }}
                                buttonStyle={{ width: '90%' }}
                                onPress={createGroup}
                            >
                            Create Group</Button>}


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

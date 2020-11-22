import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Overlay, Header } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import firebase from "../firebase/firebase"; 
import { editUser } from '../store/actions'
export default function JoinGroup({ navigation, navigation: { goBack } }) {
    const dispatch = useDispatch()
 
    const [isSign, setIsSign] = React.useState(true);
    const [isSign2, setIsLoad] = React.useState(true);
    const [groupName, setGname] = React.useState(null);
    const [isgroupName, setIsgname] = React.useState(true);
    const [isGid, setIsgid] = React.useState(true);
    const [groupId, setGid] = React.useState(null);
    const [jamount, setJamount] = React.useState(null);
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
    const iscg = useSelector(state => state.iscg)

    async function getUserList() {
        axios.post('http://localhost:8000/getCustomerList')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    async function addtoUser() {

        try {
            var today = new Date();
            const voteRef2 = await firebase.db.collection("users").doc(docid.replace(/['"]+/g, ''));
            voteRef2.get().then(doc => {
                if (doc.exists) {
                    const JoinedGroup = { UID: groupId, groupName: groupName, joined: today };

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
    async function JoinGroupbyId() {
        //getUserList()
        try {




        if (groupName == null || groupName.trim() == "") {
              Alert.alert("Enter group name.");

           }
           else if (groupId == null || groupId.trim() == "") {
              Alert.alert("Enter group Id.");

          }

       else {
            const voteRef = await firebase.db.collection("groups").doc(groupId);
              voteRef.get().then(doc => {
                   if (doc.exists) {
                      setJamount(doc.data().amount)
        //                addtoUser();

        //                    AsyncStorage.setItem('IsSQ', issq2);
        //                    AsyncStorage.setItem('IsAns', isans2);
        //                    AsyncStorage.setItem('address', address)

        //                    AsyncStorage.setItem('zip', zip)
        //                    AsyncStorage.setItem('title', title)
        //                    AsyncStorage.setItem('docid', docid);
        //                    AsyncStorage.setItem('email', email);

        //                    AsyncStorage.setItem('fname', fname);
        //                    AsyncStorage.setItem('lname', lname);
        //                    AsyncStorage.setItem('town', town);
        //                    AsyncStorage.setItem('masjid', masjid);
        //                    AsyncStorage.setItem('uid', uid2);
        //                    AsyncStorage.setItem('IsLO', islo);
        //                    AsyncStorage.setItem('IsJG', JSON.stringify(groupId));
        //                    AsyncStorage.setItem('IsCG', iscg);



        //                    dispatch(editUser({
        //                        lname: lname,
        //                        title: title,
        //                        fname: fname,
        //                        zip: zip,
        //                        address: address,
        //                        email: email,
        //                        docid: docid,
        //                        uid: uid2,
        //                        issq: issq2,
        //                        isans: isans2,
        //                        islo: islo,
        //                        isjg: JSON.stringify(groupId),
        //                        iscg: iscg
        //                    }))

                       //                    alert("Group Joined Successfully")
                       navigation.navigate("BankDetails", { isJoinmmb:false, joinCG: true, jamount: doc.data().amount, groupName: groupName, groupId: groupId, time: doc.data().time });
                     

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
                    <KeyboardAvoidingView >
                        <ScrollView>


                            <View style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>
                                <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'rgb(32, 137, 220)', marginBottom: '10%' }}>Join Community Group</Text>



                                <TextInput
                                    isFocused={false}
                                    inputStyles={{ marginTop: '1%' }}
                                    customLabelStyles={{ alignText: 'right' }}
                                    containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                    labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                    label="Group Name"
                                    onChangeText={(text) => { setGname(text); setIsgname(true) }}
                                    style={{ backgroundColor:'#fff', width: '100%', color: 'black', marginBottom: isgroupName ? '10%' : '0%' }}
                                    value={groupName}
                                />


                                <Text style={{ marginBottom: isgroupName ? '0%' : '10%', color: 'red', display: isgroupName ? 'none' : 'flex' }}>Please enter Group Name.</Text>

                                <TextInput
                                    inputStyles={{ marginTop: '1%' }}
                                    containerStyles={{ marginBottom: '9%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                    labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                    label="Group Unique Id"
                                    value={groupId}
                                    isFocused={false}
                                    onChangeText={(text) => { setGid(text); setIsgid(true) }}
                                    style={{ backgroundColor: '#fff', padding: '0%', width: '100%', marginBottom: isGid ? '10%' : '0%' }}
                                />

                                <Text style={{ marginBottom: isGid ? '0%' : '10%', color: 'red', display: isGid ? 'none' : 'flex' }}>Please enter Group Id.</Text>

                               




                            </View>
                            {!isSign ?
                                <Button mode="clear" loading color="rgb(32, 137, 220)"
                                >.. </Button>
                                :
                                <Button onPress={JoinGroupbyId} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }}  >Join</Button>}


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

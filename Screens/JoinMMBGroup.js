import React, { useEffect } from 'react';
import { StyleSheet, Text, View, CheckBox,ScrollView, KeyboardAvoidingView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Overlay, Header, ButtonGroup,Card } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Button, Caption, Switch, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
 

export default function JoinMMBGroup({ navigation, navigation: { goBack } }) {

    const [gift, setGift] = React.useState(true);
    const [isSign, setIsSign] = React.useState(true);
    const [groupName, setGname] = React.useState(null);
    const [isgroupName, setIsgroupname] = React.useState(true);
    const [isGid, setIsgid] = React.useState(true);
    const [isamount, setIsamount] = React.useState(true);
    const [txtamount, setTxt] = React.useState(false);
    const [groupId, setGid] = React.useState(null);
    const [amount, setAmount] = React.useState(150);
    const [duration, setDuration] = React.useState("yearly");
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [selectedIndex2, setSelectedIndex2] = React.useState(0);
    const buttons = ['\u00A3' + '12.50 - Monthly', '\u00A3'+'150 - Annually']
    const [adminCost, setAdmincost] = React.useState(false);
    function sadaq() {

        if (adminCost == true) {
            setAdmincost(false)
            setAmount(amount - 2)
        } else {
            setAdmincost(true)
            setAmount(amount + 2) 
        }

    }
    function Join() {
        navigation.navigate("BankDetails", { mmbduration: duration, isJoinmmb: true, isDonate: false, groupName: groupName, groupId: "MMBGeneralGroup", total: amount });

    }

    function updateIndex(selectedIndex) {
        setSelectedIndex(selectedIndex)
        setAdmincost(false)
        if (selectedIndex == 0 || selectedIndex == "0") {
            setAmount(12.50)
            setDuration("monthly")
        } else if (selectedIndex == 1 || selectedIndex == "1") {
            setAmount(150)
            setDuration("yearly")
        }
    }
    function updateIndex2(selectedIndex) {
        
        setSelectedIndex2(selectedIndex)
    }

    function changeamount(amount) {
        if (amount != "") {
            setTxt(true)
        }
        else {

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
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} >
                    <ScrollView style={{

                        margin: 27,
                        padding: 0
                    }} 
>


                        <Card title="Join MMB Group" style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>
 



                           

                            <Text style={{ marginBottom: isgroupName ? '0%' : '10%', color: 'red', display: isgroupName ? 'none' : 'flex' }}>Please enter Group Name.</Text>

                            <Text style={{ }}>Select Amount</Text>
                            
                            <ButtonGroup
                                onPress={(text) => { updateIndex(text) }}
                                selectedIndex={selectedIndex}
                                buttons={buttons}
                                containerStyle={{ height: 50 }}
                                disabled={txtamount == false ? false : true}
                                style={{marginBottom:'5%'}}
                            />
                            
                            <Text style={{ marginBottom: isamount ? '0%' : '10%', color: 'red', display: isamount ? 'none' : 'flex' }}>Please enter Group Name.</Text>

                             

                            <View style={{  padding: '3%', flexDirection: 'row', flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex:1 }}>
                                    <Switch color="#0095ff" style={{}} value={adminCost} onValueChange={sadaq} />
                                    <Text style={{ marginTop:'2%' }}>Administration</Text>
                                </View>
                                    <Caption style={{ marginLeft: '4%', alignSelf: 'flex-end' }}>Sadaqh {"\u00A3"}2 - One Off</Caption>

                            </View>

                            <View style={{ padding: '3%', flexDirection: 'row', flex: 1 }}>
                                <Switch color="#0095ff" value={gift} onValueChange={setGift} />

                                <Text style={{ alignSelf: 'flex-end' }}>Yes, I would like Gift Aid claimed on my donations</Text>

                            </View>
                            


                        </Card>
                        {!isSign ?
                            <Button mode="clear" loading color="rgb(32, 137, 220)"
                            >.. </Button>
                            :
                            <Button onPress={()=>Join() } color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%', marginTop: '5%' }} buttonStyle={{ width: '90%' }}  >Pay now to join</Button>}


                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

        </>


    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: Platform.OS == 'ios' ? "column-reverse" : "row",
        marginBottom: 20,
        alignItems: "center",
         
     padding: '3%',
        marginTop:"5%"

    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, CheckBox } from 'react-native';
import { AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Overlay, Header, ButtonGroup  } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Button, Caption, Switch, Paragraph, Divider, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import FloatingLabelInput from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from 'react-native';
 
 
export default function Donate({ navigation, navigation: { goBack } }) {

    const [visible, setVisible] = React.useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const jsCode = `(function() {
                    var originalPostMessage = window.postMessage;

                    var patchedPostMessage = function(message, targetOrigin, transfer) {
                      originalPostMessage(message, targetOrigin, transfer);
                    };

                    patchedPostMessage.toString = function() {
                      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
                    };

                    window.postMessage = patchedPostMessage;
                  })();`;


    
         
      
    const [publicKey, setPk] = React.useState("pk_test_51Hj2lWKfwlzKbH0QQRaSuS8wD2r1YPEgp3dpCLlBgQBbd4mOvtGEglxm61Rf8evCFELQIlXtRjnQlLvwXn2POwsW004UhLG25m");
 
    const [allowRememberMe, setArm] = React.useState(true);
    const [currency, setCurr] = React.useState("gbp");
    const [description, setDesc] = React.useState(true);
    const [imageUrl, setImgurl] = React.useState(true);
    const [storeName, setStorename] = React.useState(true);
    const [prepopulatedEmail, setPopulated] = React.useState(true);
    const [style, setStyle] = React.useState(true);
   

    const [isSign, setIsSign] = React.useState(true);
    const [adminCost, setAdmincost] = React.useState(false);
    const [gift, setGift] = React.useState(true);
    const [isGid, setIsgid] = React.useState(true);
    const [isamount, setIsamount] = React.useState(true);
    const [fund, setFund] = React.useState('General Burial Fund');
    const [txtamount, setTxt] = React.useState(false);
    const [groupId, setGid] = React.useState(null);
    const [time, setTime] = React.useState(null);
    const [amount, setAmount] = React.useState(null);
    const [actual, setActual] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [selectedIndex3, setSelectedIndex3] = React.useState(-1);
    const [selectedIndex2, setSelectedIndex2] = React.useState(0);
    const buttons = ['One Off','Monthly Donation']
    const buttons2Oneoff = ['30', '40', '99']
    const buttons2Monthly = ['8', '15', '30']
   async function paynow() {
        if (selectedIndex == -1) {
            alert("Please Select Interval Unit")
        }
        else if (selectedIndex3 == -1) {
            alert("Please Select Amount")
        }
        else if (time == "oneoff") {
          //  navigation.navigate("Stripe", { amount: amount,email:email })
            navigation.navigate("Paynow", { duration: selectedIndex, actual: actual, adminCost: adminCost, groupId: "null", groupName: "null", isDonate: true, total: amount })
            setTxt(false)
           
        }
        else {
            if (adminCost == true) {
                navigation.navigate("BankDetails", { duration: selectedIndex, actual: (parseInt(actual) + 2), adminCost: adminCost, groupId: "null", groupName: "null", isDonate: true, total: amount })
                setTxt(false)
            }
            else {
                navigation.navigate("BankDetails", { duration: selectedIndex, actual: actual, adminCost: adminCost, groupId: "null", groupName: "null", isDonate: true, total: amount })
                setTxt(false)
            }
        }
        }


    function sadaq() {
       
        if (adminCost == true) {
            setAdmincost(false)
            
        } else {
            setAdmincost(true)
           
        }
        
    }
    function changeamount(amount) {
        if (amount != "") {
            setSelectedIndex3(100)
            setTxt(true)
            setActual(amount)
            setAmount(amount)
           

        }
        else {
           
            setAmount(10)
            setActual(10)
            setAdmincost(false)
            setSelectedIndex3(1)
            setTxt(false)
        }


    }
    function updateIndex22Oneoff(selectedIndex) {
  
        setAdmincost(false)
        if (selectedIndex == 0 || selectedIndex == '0') {
            setAmount(30)
            setActual(30)
        } else if (selectedIndex == 1 || selectedIndex == '1') {
            setAmount(40)
            setActual(40)
        }
        else if (selectedIndex == 2 || selectedIndex == '2') {
            setAmount(99)
            setActual(99)
        }
        setSelectedIndex3(selectedIndex)
    }
    function updateIndex22monthly(selectedIndex) {
  
        setAdmincost(false)
        if (selectedIndex == 0 || selectedIndex == '0') {
            setAmount(8)
            setActual(8)
        } else if (selectedIndex == 1 || selectedIndex == '1') {
            setAmount(15)
            setActual(15)
        }
        else if (selectedIndex == 2 || selectedIndex == '2') {
            setAmount(30)
            setActual(30)
        }
        setSelectedIndex3(selectedIndex)
    }
    function updateIndex(selectedIndex) {
        setAmount(0)
        setActual(0)
        setSelectedIndex3(-1)
        setSelectedIndex(selectedIndex)
        if (selectedIndex == '0') {
            setTime("oneoff")
        }
        else if (selectedIndex == '1') {
            setTime("monthly")
        } 
    }
    function updateIndex2(selectedIndex) {

        setSelectedIndex2(selectedIndex)
    }



    return (
        <>
          
            <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                centerComponent={{ text: 'Donate', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}

                leftComponent={<Ionicons name="md-menu" style={{ marginBottom:23 }} size={27} color="white" onPress={() => (navigation.openDrawer())} />}
            />
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} >
                    <ScrollView
                        style={{

                            margin: Platform.OS == 'ios' ? 27 : 0,
                            padding: 0
                        }} 
                    >
                      

                        <View style={{ padding: '7%', paddingBottom: '0%', flex: 1, alignItems: 'center', marginTop: '0%', }}>
                            <Text style={{ fontSize: hp('3%'), fontWeight: '300', color: 'rgb(32, 137, 220)', marginBottom: '5%' }}>Donate</Text>
                            <Divider/>

                            <Text style={{ color:'rgb(32, 137, 220)',fontSize:17, alignSelf: 'flex-start', fontWeight: 'bold' }} >Funds</Text>


                            <DropDownPicker
                                items={[
                                    { label: 'General Burial Fund', value: 'General Burial Fund' },

                                ]}
                                defaultValue={fund}
                                containerStyle={{ height: 40, width: '100%', marginBottom:'5%' }}
                                style={{ backgroundColor: '#fafafa' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => { setFund(item.value) }}
                            />

                              
                            <ButtonGroup
                                onPress={(text) => { updateIndex(text) }}
                                selectedIndex={selectedIndex}
                                buttons={buttons}
                                containerStyle={{ height: 50 }}
                               
                                style={{ marginBottom: '5%' }}
                            />
                            {
                                time == "oneoff" ?
                                <ButtonGroup
                                        onPress={(text) => { updateIndex22Oneoff(text) }}
                                    selectedIndex={selectedIndex3}
                                    buttons={buttons2Oneoff}
                                    containerStyle={{ height: 50 }}
                                    disabled={txtamount == false ? false : true}
                                    style={{ marginBottom: '5%' }}
                                    />
                                    :
                                    time == "monthly" ? 
                                <ButtonGroup
                                            onPress={(text) => { updateIndex22monthly(text) }}
                                    selectedIndex={selectedIndex3}
                                    buttons={buttons2Monthly}
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
                                containerStyles={{ marginBottom: '5%', marginTop: '5%', borderWidth: 1, borderColor: 'rgb(32, 137, 220)' }}
                                labelStyles={{ fontSize: 17, color: 'rgb(32, 137, 220)' }}
                                label="or Enter Amount"
                                onChangeText={(text) => { changeamount(text); setIsamount(true) }}
                                style={{ backgroundColor:'#f5f8fc', width: '100%', color: 'black', marginBottom: isamount ? '10%' : '0%' }}
                                value={amount}

                                keyboardType='number-pad'
                                
                                 
                            />
                            <Text style={{ marginBottom: isamount ? '0%' : '10%', color: 'red', display: isamount ? 'none' : 'flex' }}>Please enter Group Name.</Text>
                            <View style={styles.checkboxContainer}>

                                <Switch color="#0095ff" value={adminCost} onValueChange={sadaq} />
                                <Text style={styles.label}>Administration</Text>
                                <Caption style={{ marginLeft: '38%', marginTop:'2%' }}>Sadaqh {"\u00A3"}2</Caption>
                            
                            </View>
                            
                            <View style={styles.checkboxContainer}>
                           
                                <Switch color="#0095ff" value={gift} onValueChange={setGift} />
                                <Text style={styles.label}>Yes, I would like Gift Aid claimed on my donations</Text>
                                </View>
                            <Text style={{ marginBottom: '5%', marginTop: '5%', fontWeight:'bold' }}>
                                What is Gift Aid?   
                            </Text>
                            <Divider/>
                            <Paragraph>

                                By allowing My Muslim burial to claim Gift Aid you can increase the value of your donation by 25% at no cost to you. Your donation of {"\u00A3"}5 will be worth {"\u00A3" }6.25 without you spending an extra penny.

                            </Paragraph>
                        </View>
                        {!isSign ?
                            <Button mode="clear" loading color="rgb(32, 137, 220)"
                            >.. </Button>
                            : 
                            <Button onPress={() => { paynow() }} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%', marginTop: '5%' }} buttonStyle={{ width: '90%' }}  >Pay now</Button>}


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
        flexDirection: Platform.OS == 'ios' ? "row" : "row",
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: '#f3f2f7'
        , padding: '3%',
    
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});
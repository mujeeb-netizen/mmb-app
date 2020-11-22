import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, CheckBox, SafeAreaView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Overlay, Header, ButtonGroup } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Button, Caption, Paragraph, Divider, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import FloatingLabelInput from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from 'react-native';


export default function Stripe({ navigation, navigation: { goBack },route }) {
    const { amount } = route.params;
    const { email } = route.params;
 
    const [visible, setVisible] = React.useState(true);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
 
    //const jsCode = `(function() {
    //                var originalPostMessage = window.postMessage;

    //                var patchedPostMessage = function(message, targetOrigin, transfer) {
    //                  originalPostMessage(message, targetOrigin, transfer);
    //                };

    //                patchedPostMessage.toString = function() {
    //                  return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    //                };

    //                window.postMessage = patchedPostMessage;
    //              })();`;




    const [publicKey, setPk] = React.useState("pk_test_51Hj2lWKfwlzKbH0QQRaSuS8wD2r1YPEgp3dpCLlBgQBbd4mOvtGEglxm61Rf8evCFELQIlXtRjnQlLvwXn2POwsW004UhLG25m");

    const [allowRememberMe, setArm] = React.useState(true);
    const [currency, setCurr] = React.useState("gbp");
   
    const [description, setDesc] = React.useState("Donation Form");
    const [imageUrl, setImgurl] = React.useState(true);
    const [storeName, setStorename] = React.useState("My Muslim Burial");
    const [prepopulatedEmail, setPopulated] = React.useState(true);


    var style = {
        base: {
            color: '#32325d',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            },
            ':-webkit-autofill': {
                color: '#32325d',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
            ':-webkit-autofill': {
                color: '#fa755a',
            },
        }
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>

          
            <WebView
                style={{ height: '100%', width: '100%', borderWidth: 1, borderColor:'red' }}
                javaScriptEnabled={true}
                scrollEnabled={false}
                bounces={false}
             
                source={{
                    html: `<script src="https://checkout.stripe.com/checkout.js"></script>
            <script>
            var handler = StripeCheckout.configure({
              key: '${publicKey}',  
              image: '${imageUrl}',
              locale: 'auto',
              token: function(token) {
                window.ReactNativeWebView.postMessage(token.id, token.id);
console.log(">>>>"+token.id)
              },
            });

          function waitForBridge() {

  handler.open({
                image: '${imageUrl}',
                name: '${storeName}',
                description: '${description}',
                amount: ${amount*100},
                currency: '${currency}',
                allowRememberMe: false,
                email: '${prepopulatedEmail}',
                  
              });   

  
   if (window.postMessage.length !== 1){
     setTimeout(waitForBridge, 200);
   }
   else {
     window.postMessage('abc');
   }
}

window.onload = waitForBridge;
            </script>`, baseUrl: ''
                }}
              // onMessage={event => event.nativeEvent.data === 'WINDOW_CLOSED' ? onClose() : onPaymentSuccess(event.nativeEvent.data)}
               onMessage={(event) => { console.log(event.nativeEvent.data) } }
                style={[{ flex: 1 }, style]}
                scalesPageToFit={false}
                 
             
                />
      

        </SafeAreaView>


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
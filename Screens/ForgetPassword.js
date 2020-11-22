import React from 'react';
import * as Google from "expo-google-app-auth"
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import RadioForm, { RadioButton, RadioButtonTextInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon, Header, Input, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import FloatingLabelInput from 'react-native-floating-label-input';
import firebase from "../firebase/firebase";
import { editUser } from '../store/actions'
import * as GoogleSignIn from 'expo-google-sign-in';
import { set } from 'react-native-reanimated';
import * as Facebook from 'expo-facebook';
import { Bubbles } from 'react-native-loader';
export default function ForgetPassword({ navigation,navigation: { goBack } }) {
     
    const [email, setEmail] = React.useState(null);
    const [loginload, setLoginload] = React.useState(true);
    const [isemail, setIsemail] = React.useState(true);
    async function handleResetPassword() {
        if (email != null) {


            try {
                await firebase.resetPassword(email.trim());
                Alert.alert("Email sent. Please check your inbox to change your password.")
                navigation.navigate("Login")
            }
            catch (err) {
                if (err.code == "auth/invalid-email") {
                    Alert.alert("Invalid Email");
                } else if (err.code == "auth/user-not-found") {
                    Alert.alert("User Not Found");
                }
                alert(err)
            }
        } else {
            Alert.alert("Please Enter Email.");
        }
    }
    return (


        <>
            <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
                centerComponent={{ text: 'Login', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}
            />


            <KeyboardAvoidingView >
                <ScrollView>


                    <View style={{ padding: '0%', paddingBottom: '0%', alignItems: 'center', marginTop: '10%', }}>


                        <Input
                            placeholder='Email'
                            leftIcon={
                                <Ionicons name="md-mail" size={27} style={{ marginRight: '3%' }} color="rgb(32, 137, 220)" />
                            }
                            value={email} onChangeText={(text) => { setEmail(text); setIsemail(true) }}

                        />




                        <Text style={{ marginBottom: isemail ? '0%' : '10%', color: 'red', display: isemail ? 'none' : 'flex' }}>Please enter your valid email.</Text>

                        <View style={{ margin: '5%' }}>

                        </View>


                       




                    </View>
                    {!loginload ?
                        <Button mode="clear" loading color="rgb(32, 137, 220)"
                        >Loading </Button>
                        :
                        <Button onPress={handleResetPassword} color="rgb(32, 137, 220)" mode="contained" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} >CONTINUE</Button>}
                    <View style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        bottom: 0,
                        marginTop: '15%'


                    }}>
                        





                    </View>

                    <Divider />
                    <View style={{ marginTop: '10%' }}>
                        <Button color="rgb(32, 137, 220)" mode="clear" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} onPress={() => { navigation.navigate("Signup", { name: null, email_: null, googleSignup: false }) }} >Do not have an account?</Button>
                        <Button color="rgb(32, 137, 220)" mode="clear" style={{ width: '90%', alignSelf: 'center', marginBottom: '5%' }} buttonStyle={{ width: '90%' }} onPress={() => { navigation.navigate("Login") }} >Already have an account?</Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

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

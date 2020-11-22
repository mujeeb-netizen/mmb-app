
import React, { useEffect } from 'react';
import { StyleSheet, Text,Image ,View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { editUser } from './store/actions'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers'
import { AsyncStorage } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
     } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Screens/Login';
import Logout from './Screens/Logout';
import Signup from './Screens/Signup';
import Home from './Screens/Home';

import ForgetPassword from './Screens/ForgetPassword';
import JoinGroup from './Screens/JoinGroup';
import { Avatar } from 'react-native-paper';

import NextKin from './Screens/NextKin';
import SavedKin from './Screens/SavedKin';
import JoinMMBGroup from './Screens/JoinMMBGroup';
import CreateGroup from './Screens/CreateGroup';
import LovedOne from './Screens/LovedOne';
import Loading from './Screens/Loading';
import SecurityQuestion from './Screens/SecurityQuestion';
import BankDetails from './Screens/BankDetails';
import BankDetailsCG from './Screens/BankDetailsCG';
import BankDetailsLO from './Screens/BankDetailsLO';
import EditProfile from './Screens/EditProfile';
import VerifyProfile from './Screens/VerifyProfile';
import EditKin from './Screens/EditKin';
import EditLovedone from './Screens/EditLovedone';
import Notification from './Screens/Notification';
import Stripe from './Screens/Stripe';
import Paynow from './Screens/Paynow';
import Donate from './Screens/Donate';
import Chat from './Screens/Chat';
import ReadMore from './Screens/ReadMore';
import Feedback from './Screens/Feedback';
const store = createStore(rootReducer)
const Stack = createStackNavigator();

function App() {
    const uid2 = useSelector(state => state.uid)
   const issq = useSelector(state => state.issq)
    var fname = useSelector(state => state.fname)
    var lname = useSelector(state => state.lname)
 
    const dispatch = useDispatch()

    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                {
                    uid2 === null || uid2 == "null" || typeof uid2 == "undefined" ?
                        <Image
                            style={styles.drawerImage}
                            source={require('./splash.png')}
                        />
                        :
                        <View style={{ backgroundColor: '##0095ff' }}>
                            <Avatar.Text

                                style={styles.drawerImage}
                                size={124} label={fname.replace(/['"]+/g, '').charAt(0) + "" + lname.replace(/['"]+/g, '').charAt(0)}
                            />

                            <Text style={{ marginTop: '2%', marginBottom: '2%', alignSelf: 'center', fontSize: 23, color: '#fff' }}>
                                {
                                    fname.replace(/['"]+/g, '') + " " + lname.replace(/['"]+/g, '')
                                }
                            </Text>

                        </View>
                }

                <DrawerItemList {...props} />

            </DrawerContentScrollView>
        );
    }

 
    useEffect(() => {
        AsyncStorage.getItem('userId')
            .then(results1 => {
                if (results1 === null) {

                }
                else {


                    AsyncStorage.getItem('fname')
                        .then(fname => {
                            AsyncStorage.getItem('lname')
                                .then(lname => {

                     AsyncStorage.getItem('title')
                                .then(title => {


                                    AsyncStorage.getItem('email')
                                        .then(email => {


                                            AsyncStorage.getItem('address')
                                                .then(address => {



                                                    AsyncStorage.getItem('town')
                                                        .then(town => {



                                                            AsyncStorage.getItem('zip')
                                                                .then(zip => {



                                                                    AsyncStorage.getItem('masjid')
                                                                        .then(masjid => {


AsyncStorage.getItem('docid')
                                                                        .then(docid1 => {




                                                                            AsyncStorage.getItem('IsSQ')
                                                                                .then(sq => {


                                                                                    AsyncStorage.getItem('IsAns')
                                                                                        .then(ans => {


  AsyncStorage.getItem('IsLO')
                                                                                        .then(islo => {



                                                                                            AsyncStorage.getItem('IsCG')
                                                                                                .then(iscg => {



                                                                                                    AsyncStorage.getItem('IsJG')
                                                                                                        .then(isjg => {


                                                                                                            AsyncStorage.getItem('phone')
                                                                                                                .then(phone => {


                                                                                                                    AsyncStorage.getItem('customerId')
                                                                                                                        .then(customerId => {

                                                                                                                            const data = {
                                                                                                                                uid: results1,

                                                                                                                                email: email,
                                                                                                                                address: address,
                                                                                                                                issq: sq,
                                                                                                                                isans: ans,
                                                                                                                                zip: zip,
                                                                                                                                phone: phone,
                                                                                                                                fname: fname,
                                                                                                                                lname: lname,
                                                                                                                                docid: docid1,
                                                                                                                                title: title,
                                                                                                                                town: town,
                                                                                                                                masjid: masjid,
                                                                                                                                islo: islo,
                                                                                                                                iscg: iscg,
                                                                                                                                isjg: isjg,
                                                                                                                                customerId: customerId

                                                                                                                            }


                                                                                                                            dispatch(editUser(data))




                                                                                                                        })



                                                                                                                })



                                                                                                        })



                                                                                                })



                                                                                        })

                                                                                      



                                                                                        })
                                                                                    


                                                                                })


                                                                        })
                                                                           


                                                                        }) 



                                                                })



                                                        })



                                                })




                                        })


                                    

                                })
                                  


                                  

                                })


                        })


                }
            })
    }, [])

    const Drawer = createDrawerNavigator();
    const myStackNavigator = () => {
        return (
            <>

              

                <Drawer.Navigator
                    drawerContent={props => <CustomDrawerContent {...props} />}
                    drawerContentOptions={{
                        activeTintColor: '#fff',
                        activeTextColor:'#0095ff',
                        backgroundColor:'#0095ff',
                  labelStyle: {
                      color: '#f2f2f2',
                      textAlign: 'center'
                        }
                }} >
                    {

                        uid2 === null || uid2 == "null" || typeof uid2 == "undefined" ?
                            <>
                             
                                <Drawer.Screen name="Login" component={Login} />
                                <Drawer.Screen style={{ backgroundColor: 'red' }} name="Signup" component={Signup} />
                            </>
                            
                                :
                            <>

                                    <Drawer.Screen name="Home" component={Home} />
                                <Drawer.Screen name="Profile" component={Notification} />
                                <Drawer.Screen name="Next of Kin" component={NextKin} />
                                <Drawer.Screen name="Loved One" component={LovedOne} />
                                
                                <Drawer.Screen name="Donate" component={Donate} />
                                <Drawer.Screen name="Feedback" component={Feedback} />
                                <Drawer.Screen name="Logout" component={Logout} />

                            </>
                    }

                     
                  
                </Drawer.Navigator>
            </>
        )
    }
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="UJP" component={myStackNavigator} />
                    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                    <Stack.Screen name="JoinGroup" component={JoinGroup} />
                    <Stack.Screen name="JoinMMBGroup" component={JoinMMBGroup} />
                    <Stack.Screen name="CreateGroup" component={CreateGroup} />
                    <Stack.Screen name="BankDetails" component={BankDetails} />
                    <Stack.Screen name="BankDetailsCG" component={BankDetailsCG} />
                    <Stack.Screen name="BankDetailsLO" component={BankDetailsLO} />
                    <Stack.Screen name="SecurityQuestion" component={SecurityQuestion} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="VerifyProfile" component={VerifyProfile} />
                    <Stack.Screen name="EditKin" component={EditKin} />
                    <Stack.Screen name="EditLovedone" component={EditLovedone} />
                    <Stack.Screen name="Notification" component={Notification} />
                    <Stack.Screen name="Stripe" component={Stripe} />
                    <Stack.Screen name="Paynow" component={Paynow} />
                    <Stack.Screen name="Chat" component={Chat} />
                    <Stack.Screen name="ReadMore" component={ReadMore} />
                    <Stack.Screen name="Feedback" component={Feedback} />
                   
         


                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default function myFunction() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 200,
        backgroundColor: 'white'
    },
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '5%',
      
    }

})
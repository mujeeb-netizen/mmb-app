import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Platform, ScrollView, Picker } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Divider,TextInput } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { Icon, Header, Input, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Ionicons } from '@expo/vector-icons';
import { add } from 'react-native-reanimated';
import firebase from "../firebase/firebase";
import { editUser } from '../store/actions'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import Community from './Community';
import GroupDashboard from './GroupDashboard';
import Donate from './Donate';
import Updates from './Updates';
import Notification from './Notification';
import News from './News';
import { Bubbles } from 'react-native-loader';
export default function Home({ navigation }) {
   
    
    const iscg = useSelector(state => state.iscg)
    const isjg = useSelector(state => state.isjg)
    console.log(iscg)
    console.log(isjg)
    var [mainload, setMainload] = React.useState(Platform.OS == 'ios' ? true : false);
    
   
   
    useEffect(() => {
        if (Platform.OS != 'ios') {

                setTimeout(() => {

                    setMainload(true)
                }, 2000)
            
        }

    }, []);

    const CreateTabs = createBottomTabNavigator()
 
    if (!mainload) {
        return (
             
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}>
                {

                    Platform.OS == "ios" ?
                        <Text> Loading </Text> :
                        <Bubbles size={10} color="rgb(32, 137, 220)" />
                }
            </View>

        );
    }
    else {
        
            return (
                <>
                


            <CreateTabs.Navigator  >

                        <CreateTabs.Screen name="News" component={News} options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Ionicons name="md-home" color="#0095ff" size={28} />
                    ), 
                        }} />
                        {
                            (isjg != "null" || iscg != "null") ?

                                (typeof isjg != "undefined" || typeof iscg != "undefined") ?
                                    <CreateTabs.Screen name="GroupDashboard" component={GroupDashboard} options={{
                                        tabBarLabel: 'Group Dashboard',
                                        tabBarIcon: () => (
                                            <Ionicons name="md-ribbon" color="#0095ff" size={28} />
                                        ),
                                    }} />
                                    :
                                    <CreateTabs.Screen name="Community" component={Community} options={{
                                        tabBarLabel: 'Community',
                                        tabBarIcon: () => (
                                            <Ionicons name="md-ribbon" color="#0095ff" size={28} />
                                        ),
                                    }} />
                                :
                                <>
                                    <CreateTabs.Screen name="Community" component={Community} options={{
                                        tabBarLabel: 'Community',
                                        tabBarIcon: () => (
                                            <Ionicons name="md-ribbon" color="#0095ff" size={28} />
                                        ),
                                    }} />
                                </>
                        }
                        
                <CreateTabs.Screen name="Donate" component={Donate} options={{
                            tabBarLabel: 'Donate',
                          
                    tabBarIcon: () => (
                        <Ionicons name="md-star" color="#0095ff" size={28} />
                    ),
                }} />
                
                <CreateTabs.Screen name="Notification" component={Notification} options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <Ionicons name="md-person" color="#0095ff" size={28} />
                    ),
                }} />
                    </CreateTabs.Navigator>
                    </>
                )
        }
    }

    

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        lottie: {
            width: 100,
            height: 100
        }
    });

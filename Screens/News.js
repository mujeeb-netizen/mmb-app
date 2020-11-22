import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, RefreshControl,Button, ScrollView ,Image} from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, Header } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import firebase from "../firebase/firebase"; 
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Avatar, Card, Title, Paragraph, Divider, List, DataTable, Caption, Badge } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from '@react-navigation/native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function News({ navigation }) {
    const [expoPushToken, setExpoPushToken] = React.useState('');
    const [notionce, setOncenoti] = React.useState(0);
    const [updateonce, setOnceupdate] = React.useState(0);
    const [newsonce, setOncenews] = React.useState(0);
    const [notification, setNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const [once, setOnce] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        
       
 getNoti()
   
       
       

        wait(2000).then(() => { setRefreshing(false) });
    }, [refreshing]);
    const LeftContent = props => <Avatar.Icon {...props} style={{ backgroundColor: 'rgb(32, 137, 220)' }} icon="bullhorn" />
    const updateIcon = props => <Avatar.Icon {...props} style={{ backgroundColor: 'rgb(32, 137, 220)' }} icon="update" />
    const newsIcon = props => <Avatar.Icon {...props} style={{ backgroundColor: 'rgb(32, 137, 220)' }} icon="newspaper" />
    const LeftContent2 = props => <Avatar.Icon {...props} style={{ backgroundColor: '#fff', color: 'rgb(32, 137, 220)' }} color="rgb(32, 137, 220)" size={30} icon="label" />
          const [noti, setNoti] = React.useState([]);
        const [update, setUpdate] = React.useState([]);
    const [news, setNews] = React.useState([]);

    React.useEffect(() => {
        if (noti == "") {
 getNoti()
        }
   
       
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };

    })
    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "New Notification from My Muslim Burial!",
                body: 'You have new post to view',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }
    async function getNoti() {

        await firebase.db.collection("notification").where("Status", "==", 1).onSnapshot(handleSnapshot__);

    }
  

    async function handleSnapshot__(snapshot) {
        
        const data = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        setOncenoti(data.length)
      
        if (data.length - parseInt(notionce) == 1) {
            await schedulePushNotification();
        }
        
        setNoti(data)
   
        // setLoading(false);
    }
  
   
    return (
        <>
        <Header
            backgroundColor="#0095ff"
            barStyle="light-content"
            containerStyle={{ elevation: 5 }}
            centerComponent={{ text: 'Home', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}

                leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-menu" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
        />
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
        <View style={{ backgroundColor: '#fff', height: '100%' }}>

                  

                    {
                        noti.length != 0 ?

                            noti.map((links, key) => (
                                <>
    

                                    <TouchableOpacity onPress={() => { navigation.navigate("ReadMore", { date: links.Date,id: links.Id, title: links.Title, desc: links.Description, photo: links.photo }) }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>


                                            { 
                                                typeof links.photo === "undefined" ?
                                                    <Image style={{ width: 150, height: 150 }} source={require("../dummy.jpg")} />
                                                    :
                                                    <Image style={{ width: 150, height: 150 }} source={{ uri:links.photo }} />

                                            }
                                            <View style={{ alignSelf: 'flex-start', flex: 1, marginLeft: '3%', marginTop: '3%', marginRight:'3%' }}>

                                                <Text style={{ fontSize: 26, fontWeight:'bold' }}>
                                                    {links.Title}
                                                </Text>
                                                <Text numberOfLines={2}  style={{ fontSize:20 }}>
                                                    {links.Description}
                                                </Text>
                                                <View style={{ textAlignVertical: 'bottom' }}>
                                                    <Caption style={{ textAlignVertical: 'bottom' }}>
                                                        {links.Date}

                                                    </Caption>
                                                    <Badge style={{ backgroundColor: '#fff' }}>
                                                        <Text>
                                                            <Ionicons name="ios-arrow-dropright" color="#0095ff" size={22} />
                                                        </Text>
                                                    </Badge>
                                                </View>

                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                    
                                    <Divider/>

                                     


                         
                                </>
                            ))


                            :
                            <>
                                 
                            </>

                    }

                    {
                        update.length != 0 ?

                            update.map((links, key) => (
                                <>


                                    <TouchableOpacity onPress={() => { navigation.navigate("ReadMore", { date: links.Date, id: links.Id, title: links.Title, desc: links.Description, photo: links.photo }) }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>


                                            {
                                                typeof links.photo === "undefined" ?
                                                    <Image style={{ width: 150, height: 150 }} source={require("../assets/icon.png")} />
                                                    :
                                                    <Image style={{ width: 150, height: 150 }} source={{ uri: links.photo }} />

                                            }
                                            <View style={{ alignSelf: 'flex-start', flex: 1, marginLeft: '3%', marginTop: '3%', marginRight: '3%' }}>

                                                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
                                                    {links.Title}
                                                </Text>
                                                <Text numberOfLines={2}  style={{ fontSize: 20 }}>
                                                    {links.Description}
                                                </Text>
                                                <View style={{ textAlignVertical: 'bottom' }}>
                                                    <Caption style={{ textAlignVertical: 'bottom' }}>
                                                        {links.Date}

                                                    </Caption>
                                                    <Badge style={{ backgroundColor: '#fff' }}>
                                                        <Text>
                                                            <Ionicons name="ios-arrow-dropright" color="#0095ff" size={22} />
                                                        </Text>
                                                    </Badge>
                                                </View>

                                            </View>

                                        </View>
                                    </TouchableOpacity>


                                    <Divider />

                                </>
                            ))


                            :
                            <>
                                 
                            </>

                    }
                     {
                        news.length != 0 ?

                            news.map((links, key) => (
                                <>

                                    <TouchableOpacity onPress={() => { navigation.navigate("ReadMore", {date:links.Date, id: links.Id, title: links.Title, desc: links.Description, photo: links.photo }) }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>


                                            {
                                                typeof links.photo === "undefined" ?
                                                    <Image style={{ width: 150, height: 150 }} source={require("../dummy.jpg")} />
                                                    :
                                                    <Image style={{ width: 150, height: 150 }} source={{ uri: links.photo }} />

                                            }
                                            <View style={{ alignSelf: 'flex-start', flex: 1, marginLeft: '3%', marginTop: '3%', marginRight: '3%' }}>

                                                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
                                                    {links.Title}
                                                </Text>
                                                <Text numberOfLines={2} style={{ fontSize: 20 }}>
                                                    {links.Description}
                                                </Text>
                                                <View style={{ textAlignVertical: 'bottom' }}>
                                                    <Caption style={{ textAlignVertical: 'bottom' }}>
                                                        {links.Date}

                                                    </Caption>
                                                    <Badge style={{ backgroundColor: '#fff' }}>
                                                        <Text>
                                                            <Ionicons name="ios-arrow-dropright" color="#0095ff" size={22} />
                                                        </Text>
                                                    </Badge>
                                                </View>

                                            </View>

                                        </View>
                                    </TouchableOpacity>

                                    <Divider />

                                </>
                            ))


                            :
                            <>
                                 
                            </>

                    }

                

    

            </View>
        </ScrollView>
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

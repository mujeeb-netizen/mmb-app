import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, RefreshControl, Button, ScrollView, Image } from 'react-native';
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

 
export default function ReadMore({ navigation, route, navigation: { goBack } }) {
    const { id } = route.params;
    const { title } = route.params;
    const { desc } = route.params;
    const { photo } = route.params;
    const { date } = route.params;
    if (typeof photo == "undefined") {

    }
    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const [once, setOnce] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);






        wait(2000).then(() => { setRefreshing(false) });
    }, [refreshing]);
    
    React.useEffect(() => {
        

       

    })
     
   

   
    
   
    return (
        <>
            <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                centerComponent={{ text: 'Home', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}

                leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}  />
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

                <Card style={{ height: '100%', flex: 1 }}>
                    <Card.Cover source={typeof photo == "undefined" ? require("../dummy.jpg") : { uri: photo}} />
                    <View style={{ marginLeft: "5%", marginRight: '5%', marginTop: '5%', marginBottom: '5%', borderWidth: 1, borderColor: '#e0e0e0' }}>

                        <Card.Title titleStyle={{ fontSize: 30 }} title={title.toUpperCase()} subtitle={date} />
                        <Divider/>
                        <Paragraph style={{ fontSize: 20, marginLeft: '5%',marginRight: '5%', marginTop: '5%', marginBottom: '5%' }}>{desc.toUpperCase()}</Paragraph>
                     </View>
                    </Card>
                
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

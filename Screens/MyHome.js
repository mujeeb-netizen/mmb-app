import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
export default function MyHome({ navigation }) {
    const dispatch = useDispatch()
    
    return (


        <View ><Text style={{ textAlign: 'center' }}>Home</Text></View>

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

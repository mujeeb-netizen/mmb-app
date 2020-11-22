import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
export default function Logout({ navigation }) {
    const dispatch = useDispatch()
    useEffect(() => {

        AsyncStorage.clear();
        dispatch(deleteUser())
    })

    return (


        <View ><Text style={{ textAlign: 'center' }}>...logging out</Text></View>

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

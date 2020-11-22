import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Bubbles } from 'react-native-loader';
export default function Loading({ navigation }) {
    const uid2 = useSelector(state => state.uid)
    alert(uid2)
    useEffect(() => {
        setTimeout(() => {
            if (uid2 != null || uid2 != "null" || typeof uid2 != "undefined") {
                navigation.navigate("Home")
            } else {
                navigation.navigate("Login"
                )
            }
            

        }, 2000)

    })

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
            <Bubbles size={10} color="rgb(32, 137, 220)" />
            <Text>
                sad
            </Text>
        </View>
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

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, Card, Header, Button } from 'react-native-elements'

import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import firebase from "../firebase/firebase";
export default function VerifyProfile({ navigation, navigation: { goBack } }) {

    const uid = useSelector(state => state.uid)
    const docid = useSelector(state => state.docid)
    var [imageUrl, setImageUrl] = React.useState(null);
    var [imageUrl2, setImageUrl2] = React.useState(null);
    var [image, setImage] = React.useState(null);
    var [image2, setImage2] = React.useState(null);
    var [pickerRes, setPickerRes] = React.useState(null);
    var [pickerRes2, setPickerRes2] = React.useState(null);
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");

        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({

            base64: true
        });
        setImage(pickerResult.uri)
        setPickerRes(pickerResult);
       
    }
    let openImagePickerAsync2 = async () => {
        let permissionResult2 = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult2.granted === false) {
            alert("Permission to access camera roll is required!");

        }

        let pickerResult2 = await ImagePicker.launchImageLibraryAsync({

            base64: true
        });
        setImage2(pickerResult2.uri)
        setPickerRes2(pickerResult2);
       
    }
    function savePic() {
        if (pickerRes2 == null || pickerRes == null) {
            alert("Please Select Image")
        } else {
            


                let base64Img = `data:image/jpg;base64,${pickerRes.base64}`
                let base64Img2 = `data:image/jpg;base64,${pickerRes2.base64}`

                //Add your cloud name
                let apiUrl = 'https://api.cloudinary.com/v1_1/du3j5iidy/image/upload';

                let data = {
                    "file": base64Img,
                    "upload_preset": "lg0kpmhq",
                }
                let data2 = {
                    "file": base64Img2,
                    "upload_preset": "lg0kpmhq",
                }

                fetch(apiUrl, {
                    body: JSON.stringify(data),
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'POST',
                }).then(async r => {
                    let data = await r.json()
                    console.log(data, "hh")
                    setImageUrl(data.url)
                    fetch(apiUrl, {
                        body: JSON.stringify(data2),
                        headers: {
                            'content-type': 'application/json'
                        },
                        method: 'POST',
                    }).then(async r => {
                        let data2 = await r.json()
                        console.log(data2, "hh")
                        setImageUrl2(data2.url)
                        const newLink = {
                            userId: uid,
                            docid: docid,
                            photoUrl1: data.url,
                            photoUrl2: data2.url,
                            status: 'pending'

                        }; const voteRef22 = await firebase.db.collection("verify_profile").doc(uid);
                        voteRef22.get().then(doc => {
                            if (doc.exists) {
                                alert("Already Requested!")
                            }
                            else {
                                const user12 = firebase.db.collection("verify_profile").doc(uid).set(newLink);
                                alert("Successfully Requested!")
                                navigation.navigate('Home')
                            }
                        })


                    }).catch(err => console.log(err))
                   
                   
                }).catch(err => console.log(err))
               
            
        }
    }
    return (
        <>
        <Header
            backgroundColor="#0095ff"
            barStyle="light-content"
            containerStyle={{ elevation: 5 }}
            leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-arrow-round-back" size={27} color="white" onPress={() => goBack()} />}
            centerComponent={{ text: 'Verify Profile', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}
        />
        <Card title="Upload 1 Photo ID and 1 Proof of Address">
                <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                    <Button type='outline' onPress={openImagePickerAsync} style={styles.buttonText} title="Pick a photo" />
                    <Text style={{ color: pickerRes == null ? 'black':'green', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: '7%' }} >
                        {pickerRes == null ? "Image Not Selected" : "Image Selected"}
                </Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={openImagePickerAsync2} style={styles.button}>
                    <Button type='outline' onPress={openImagePickerAsync2} style={styles.buttonText} title="Pick a photo" />
                    <Text style={{ color: pickerRes2 == null ? 'black':'green', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: '7%' }} >
                        {pickerRes2 == null ? "Image Not Selected" : "Image Selected"}
                </Text>
                </TouchableOpacity>

                <Button onPress={() => { savePic()}} title="Save" />
                    
                 
        </Card>
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

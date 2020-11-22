import React, { useEffect } from 'react';
import { StyleSheet, RefreshControl, Text, View, Alert, Platform, ScrollView, Picker } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Divider, TextInput, Avatar, Caption, Badge } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { Icon, Header, Input, ListItem, Card, CardItem, Button as ElementButton } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Ionicons } from '@expo/vector-icons';
import { add } from 'react-native-reanimated';
import firebase from "../firebase/firebase";
import UserAvatar from 'react-native-user-avatar';
import { editUser } from '../store/actions'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
export default function Notification({ navigation }) {
    const uid = useSelector(state => state.uid)
    const docid = useSelector(state => state.docid)
    var [image, setImage] = React.useState(null);
    var [photourl, setPhotoUrl] = React.useState(null);
  
    var [pickerRes, setPickerRes] = React.useState(null);
   
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
        savePic(pickerResult);
    }

    function savePic(picker) {
        if (picker == null) {
            alert("Please Select Image")
        } else {



            let base64Img = `data:image/jpg;base64,${picker.base64}`
          
            //Add your cloud name
            let apiUrl = 'https://api.cloudinary.com/v1_1/du3j5iidy/image/upload';

            let data = {
                "file": base64Img,
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
                
                   
                    const newLink = {
                        userId: uid.replace(/['"]+/g, ''),
                        docid: docid.replace(/['"]+/g, ''),
                        photoUrl: data.url,
                       

                };
                setPhotoUrl(data.url)
                const voteRef22 = await firebase.db.collection("user_photo").doc(uid.replace(/['"]+/g, ''));
                    voteRef22.get().then(doc => {
                        if (doc.exists) {
                            alert("Profile Photo Updated!")
                            voteRef22.update({ photoUrl: data.url })
                                .then(() => { getProfilePic() })
                           
                          
 
                        }
                        else {
                          
                            const user12 = firebase.db.collection("user_photo").doc(uid.replace(/['"]+/g, '')).set(newLink);
                           
                            alert("Profile Photo Updated!")
                           
                        }
                       
                    })


              


            }).catch(err => console.log(err))


        }
      
    }

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getVerificationStatus()
        getProfilePic()
        wait(2000).then(() => { setRefreshing(false) });
    }, [refreshing]);
    const dispatch = useDispatch()
    const [verified, setIsverified] = React.useState(true);
    var remail = useSelector(state => state.email)
  
    var raddress = useSelector(state => state.address)
    var rzip = useSelector(state => state.zip)
    var rfname = useSelector(state => state.fname)
    var rlname = useSelector(state => state.lname)
    var phone = useSelector(state => state.phone)
    var masjid = useSelector(state => state.masjid)
    useEffect(() => {
        getVerificationStatus()
        getProfilePic()
       
    }, []);


    async function getVerificationStatus() {
        const voteRef = await firebase.db.collection("verify_profile").doc(uid);
        voteRef.get().then(doc => {
            if (doc.exists) {

                 
                setIsverified(doc.data().status)


            }
            else {
                setIsverified(null)
                
            }
        })


    }
    async function getProfilePic() {
        setPhotoUrl()
        const voteRef = await firebase.db.collection("user_photo").doc(uid.replace(/['"]+/g, ''));

        const observer = voteRef.onSnapshot(docSnapshot => {

           
            if (typeof docSnapshot.data() != "undefined") {
             
                setPhotoUrl(docSnapshot.data().photoUrl)

            }
            else {
                setPhotoUrl(null)
            }


        }, err => {
            console.log(`Encountered error: ${err}`);
        });


   

    }
     if (raddress == null || typeof raddress == "undefined") {
        raddress = "N/A"
    } if (rzip == null || typeof rzip == "undefined") {
        rzip = "N/A"
    } 
    if (rfname == null || typeof rfname == "undefined") {
        rfname = "N/A"
    }
    if (rlname == null || typeof rlname == "undefined") {
        rlname = "N/A"
    }  if (remail == null || typeof remail == "undefined") {
        remail = "N/A"
    }

    return (
        <>
            <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                centerComponent={{ text: 'Profile', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}

                leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-menu" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
            /> 
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

            <Card title="My Profile" >
                    <View style={{ alignItems: 'center' }}>

                        {photourl == null ?
                            <Avatar.Text style={{ backgroundColor: "#0095ff" }} size={124} label={rfname.charAt(1) + "" + rlname.charAt(1)} />
                            :
                            <UserAvatar size={124} name={rfname.charAt(1) + " " + rlname.charAt(1)} src={photourl} />

                          
                            }
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Button onPress={openImagePickerAsync} labelStyle={{ color:'#0095ff'}}>Upload Photo</Button>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }} style={{ alignSelf: 'flex-end' }}>
                        <Ionicons name="ios-create" color="#0095ff" size={28} />
                        
                    </TouchableOpacity>
                    {
                        verified == null ? 
                            <>
                        <TouchableOpacity onPress={() => { navigation.navigate("VerifyProfile") }} style={{ alignSelf: 'flex-end' }}>
                        <Button mode='outlined' labelStyle={{ color: '#0095ff' }}>
                            Verify Profile
                        </Button>

                                </TouchableOpacity>
                            </>
                            : verified == 'pending' ?
                                <>
                                    <TouchableOpacity   style={{ alignSelf: 'flex-end' }}>
                                        <Button mode='outlined' labelStyle={{ color: '#0095ff' }}>
                                            Verification Requested
                        </Button>

                                    </TouchableOpacity>
                                </>
                                : verified == 'verifed' ?
                                <>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                                            <Button mode='outlined' labelStyle={{ color: '#0095ff' }}>
                                                Verified
                        </Button>

                                        </TouchableOpacity>
                                    </>
                                    : verified == 'rejected' ?
                                    <>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                                            <Button mode='outlined' labelStyle={{ color: '#0095ff' }}>
                                               Verification Rejected
                        </Button>

                                        </TouchableOpacity>
                                        </>
                                        :
                                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                                            <Button mode='outlined' labelStyle={{ color: '#0095ff' }}>
                                                loading...
                        </Button>

                                        </TouchableOpacity>
                    }
                <Text style={{ fontSize: 20, marginBottom: '3%' }}>Name: </Text>
                <Divider />
                <View style={{

                    flexDirection: 'row',

                    textAlign: 'center'
                }}>
                    <Text>
                        <Ionicons name="md-contact" color="#0095ff" size={28} />
                    </Text>
                    <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rfname.replace(/['"]+/g, '') + " " + rlname.replace(/['"]+/g, '')}</Caption>
                </View>
                <Text>{"\n"}</Text>
               
               
                <Text style={{ fontSize: 20, marginBottom: '3%' }}>Email: </Text>
                <Divider />
                <View style={{

                    flexDirection: 'row',

                    textAlign: 'center'
                }}>
                    <Text>
                        <Ionicons name="md-mail" color="#0095ff" size={28} />
                    </Text>
                    <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{remail.replace(/['"]+/g, '')}</Caption>
                </View>
                <Text>{"\n"}</Text>
               
               
              

                
                <Text style={{ fontSize: 20, marginBottom: '3%' }}>Address: </Text>
                <Divider />
                <View style={{

                    flexDirection: 'row',

                    textAlign: 'center'
                }}>
                    <Text>
                        <Ionicons name="md-home" color="#0095ff" size={28} />
                    </Text>
                    <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{raddress.replace(/['"]+/g, '')}</Caption>
                </View>
                <Text>{"\n"}</Text>
                <Text style={{ fontSize: 20, marginBottom: '3%' }}>Postal Code: </Text>
                <Divider />
                <View style={{

                    flexDirection: 'row',

                    textAlign: 'center'
                }}>
                    <Text>
                        <Ionicons name="md-clipboard" color="#0095ff" size={28} />
                    </Text>
                    <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{rzip.replace(/['"]+/g, '')}</Caption>
                </View>
                    <Text>{"\n"}</Text>
                    <Text style={{ fontSize: 20, marginBottom: '3%' }}>Phone: </Text>
                    <Divider />
                <View style={{

                    flexDirection: 'row',

                    textAlign: 'center'
                }}>
                    <Text>
                        <Ionicons name="md-call" color="#0095ff" size={28} />
                    </Text>
                    <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{phone.replace(/['"]+/g, '')}</Caption>
                </View>
                    <Text>{"\n"}</Text>

                    <Text style={{ fontSize: 20, marginBottom: '3%' }}>Nearest Masjid: </Text>
                    <Divider />
                <View style={{

                    flexDirection: 'row',

                    textAlign: 'center'
                }}>
                    <Text>
                        <Ionicons name="md-home" color="#0095ff" size={28} />
                    </Text>
                    <Caption style={{ marginLeft: '3%', marginTop: '2%', fontSize: 20 }}>{masjid.replace(/['"]+/g, '')}</Caption>
                </View>
                <Text>{"\n"}</Text>

               
              
               
              
             
               









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

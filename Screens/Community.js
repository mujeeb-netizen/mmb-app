import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, Button, Header, Overlay } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import { Avatar, Card, Title, Paragraph, Divider, List, Caption, DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'modal-react-native-web';
import { Container, Content } from 'native-base'

export default function Community({ navigation }) {
    const [readmore, setReadmore] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    if (!readmore) {


        return (
            <>
            <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                centerComponent={{ text: 'Community', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}

                    leftComponent={<Ionicons style={{ marginBottom: 23 }} name="md-menu" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
            />
            <Container>
                 
                <View style={{ backgroundColor: '#fff', height: '100%', padding: '5%' }}>
                
                        <Title style={{ textAlign: 'center', color: '#0750A4' }}>MMB Group</Title>
                        <Divider />

                        <Paragraph style={{ textAlign: 'center', fontSize: 17 }}>
                            My Muslim burial group is a public group you can join within your community, you will be paying a monthly fee and should anyone from the group pass away they will get their funeral costs covered subject to terms and conditions. </Paragraph>
                        <Button
                        buttonStyle={{ width: '100%', alignSelf: 'center', marginTop: '5%' }}
                        title="Join MMB Group"
                        onPress={() => { navigation.navigate('JoinMMBGroup') }}

                        />
                        <Text style={{ opacity: 0 }} > space </Text>

                
                       
                        <Title style={{ textAlign: 'center', color: '#0750A4' }}>Community Group </Title>
                        <Divider />

                        <Paragraph style={{ textAlign: 'center', fontSize: 17 }}>
                            The community group allows you to either create a group or join an existing group with a unique code, your group will decide to pay a fee monthly or annually and if anyone should pass away while being part of this group the money will be put towards their costs. These funds will be visible to the group members.
                        <Caption onPress={() => { readmore == false ? setReadmore(true) : setReadmore(false) }} style={{ fontSize: 15 }}>
                                Read more
                    </Caption>
                        </Paragraph>

                        <Button
                            buttonStyle={{ width: '100%', alignSelf: 'center', marginTop: '5%' }}
                            title="Join Community Group"
                            onPress={toggleOverlay}

                        />
                    </View>


                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ height:'30%' }}>
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        padding:'5%'
                    }}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', color:'rgb(32, 137, 220)' }}>
                            Choose an option
                        </Text>
                        <Button
                            buttonStyle={{ width: '100%', alignSelf: 'center', marginTop: '5%' }}
                            title="Join Community Group"

                            onPress={() => {navigation.navigate("JoinGroup"); toggleOverlay()} }
                    />
                    <Button
                        buttonStyle={{ width: '100%', alignSelf: 'center', marginTop: '5%' }}
                        title="Create Community Group"
                            onPress={() => { navigation.navigate("CreateGroup"); toggleOverlay() }}

                    />
                    </View>  
                </Overlay>



            </Container>
                </>
        );
    }
    else {


        return (
            <>
            <Header
                backgroundColor="#0095ff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                centerComponent={{ text: 'Community', style: { color: '#fff', fontSize: 25, marginLeft: 0, fontWeight: 'bold' } }}

                leftComponent={<Ionicons name="md-menu" size={27} color="white" onPress={() => (navigation.openDrawer())} />}
            />
            <Container>

                <View style={{ backgroundColor: '#fff', height: '100%', padding:'5%' }}>
                    <Ionicons name="md-arrow-round-back" size={27} style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }} color="rgb(32, 137, 220)" onPress={() => { setReadmore(false) }} />

                    <Title style={{ textAlign: 'center', color: '#0750A4' }}>Community Group </Title>
                        <Divider />
                        <Text style={{ opacity: 0 }} > space </Text>
                        <Paragraph style={{ textAlign: 'center', fontSize: 17 }}>
                            The community group allows you to either create a group or join an existing group with a unique code, your group will decide to pay a fee monthly or annually and if anyone should pass away while being part of this group the money will be put towards their costs. These funds will be visible to the group members. 
                            </Paragraph>
                        <Text style={{ opacity: 0 }} > space </Text>
                        <Paragraph style={{ textAlign: 'center', fontSize: 17 }}>
                            your group members are also able to apply for a special grant to top up outstanding costs if required from our public fund.
                            </Paragraph>
                        <Text style={{ opacity: 0 }} > space </Text>
                        <Paragraph style={{ textAlign: 'center',fontSize: 17 }}>
                            15% of your monthly donated sum goes towards the public pot which will be used to cover the funeral costs of vulnerable Muslims in the community who can not afford to pay their costs as part of a Sadaqah jariyah initiative.
                        </Paragraph>
                        <Text style={{ opacity: 0 }} > space </Text>
                        <Paragraph style={{ textAlign: 'center', fontSize: 17 }}>

                            Additionally, your group members are also able to apply for a special grant to top up outstanding costs if required from our public fund, subject to terms and conditions.
                            </Paragraph>
      <Text style={{ opacity: 0 }} > space </Text>

                        <Paragraph style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 17 }}>
On the authority of Abu Hurairah (ra) that the Messenger of Allah (saw) said, "When a person dies, his deeds come to an end except for three: Sadaqah Jariyah (a continuous charity), or knowledge from which benefit is gained, or a righteous child who prays for him". (Muslim)
                                 </Paragraph>
                       
                  
           



                </View>
            </Container>
            
            </>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

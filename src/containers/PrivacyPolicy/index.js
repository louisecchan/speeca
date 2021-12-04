import React from "react";
import {
    Platform, ScrollView, StyleSheet, Text, View
} from "react-native";
import Header from '../../components/HeaderCustom';



export default class PrivacyPolicy extends React.Component {
    state = {
        visible: 'collocation',
        topicList: [
            { name1: 'Simply Hello', name2: '漢字字漢字' },
            { name1: 'Nih Hello', name2: '漢字漢字漢字' },
            { name1: 'World Hello', name2: '漢字漢字' },
            { name1: 'Bye Hello', name2: '漢字' },
        ]

    }
    render() {
        const { visible, visible1, buttontext, topicList } = this.state
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white' }}>
                <Header  logoutvisible navigation={this.props.navigation} />
                <ScrollView contentContainerStyle={{ padding: 27 }}>
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>Privacy Policy</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'gray' }}>漢 字 漢 字</Text>
                    <Text style={{marginTop:10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.{'\n'}{'\n'}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                </ScrollView>
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    elevationLow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
    },
})
import { firebase } from '@react-native-firebase/auth';
import React from "react";
import {
    Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
import { connect } from 'react-redux';
import Header from '../../components/HeaderCustom';
import texts from '../../utils/Convertor/translation.json';

class ClassUserInfo extends React.Component {
    state = {
       email:this.props.userdata.data.email,
       mobile:""
    }

  submit=()=>{
      if(!this.state.mobile){ return Alert.alert("Please Enter your mobile number")}
    firebase.firestore().collection("users").doc(this.props.userdata.data.uid).set({
       mobile:this.state.mobile
    },{merge:true})
    .then(() => {
        console.log("Document successfully written!");

        Alert.alert(texts[this.props.lang].thankyouWeWillContact)     
        this.props.navigation.navigate("Class")
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  }

    render() {

        const {lang}=this.props
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white' }}>
                <Header back logoutvisible navigation={this.props.navigation} />
                <ScrollView contentContainerStyle={{ padding: 27 }}>
                <View style={{
                
                    }}>
                    <Text style={{fontSize: 22, fontFamily: 'Quicksand-Bold'}}>
                      Contact Information
                    </Text>
                    <Text
                        style={{
                        fontSize: 16,
                        color: 'gray',
                        letterSpacing:5,
                        fontFamily: 'Quicksand-Medium',
                        }}>

                        {texts[lang].contactInformation}
                        {/* English Test */}
                    </Text>
                    </View>
                 

                    <TextInput
                        placeholder="Your Email Address"
                        value={this.state.email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        editable={false} selectTextOnFocus={false}
                        onChangeText={(email) => this.setState({ email })}
                        style={{ borderBottomColor: 'gray',marginTop:30, borderBottomWidth: 1, paddingBottom: 6 }}
                    />
                     <TextInput
                        // placeholder={"你的微信/WhatsApp帳號"}
                        placeholder={`${texts[lang].yourWeChat}/WhatsApp${texts[lang].accountNumber}`}
                        // Your WeChat
                        // account number
                        value={this.state.mobile}
                        keyboardType={'numeric'}
                        autoCapitalize='none'
                        onChangeText={(mobile) => this.setState({ mobile })}
                        style={{ borderBottomColor: 'gray',marginTop:30, borderBottomWidth: 1, paddingBottom: 6 }}
                    />
                     <TouchableOpacity onPress={() => this.submit()} style={{ marginTop: 30, backgroundColor: '#36BEFD', padding: 11, borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>
                            {/* 遞交報名 */}
                            {texts[lang].submitRegistration}
                            </Text>
                        {/* Submit registration */}
                    </TouchableOpacity>
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

function mapStateToProps(state) {

    return ({
      userdata: state.User.data,
      lang:state.User.languageCode.languageCode
   
    })
  }
  
  export default connect(mapStateToProps)(ClassUserInfo);

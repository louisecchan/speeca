import { firebase } from '@react-native-firebase/auth';
import React from 'react';
import {
  ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux';
import texts from '../../utils/Convertor/translation.json';

class ForgetPass extends React.Component {
  state = {
    visible: 'collocation',
    email: '',
    loader: false,
    data: [],
  };
  forgetpass = async () => {
    const {email} = this.state;
    if (!email) {
      return Alert.alert('Enter your email address');
    }

     firebase
      .firestore()
      .collection("users").where("email", "==", email)
    .get()
    .then((querySnapshot) => {
        console.log(querySnapshot._docs,"h1")
        if(querySnapshot._docs.length === 0){
          Alert.alert("User not found")
        }
        querySnapshot.forEach((doc) => {
            firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
         
            Alert.alert(`Email sent to ${email}`);
            this.props.navigation.navigate('Login');
            })
            .catch(error => {
           
         
            });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  };
  render() {
    const {visible, visible1, buttontext, loader} = this.state;
    const {lang}=this.props
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'white',
        }}>
        {loader ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 99,
              justifyContent: 'center',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : null}
        <Image
          style={{
            width: '60%',
            alignSelf: 'center',
            height: '10%',
            marginTop: getStatusBarHeight() + 60,
          }}
          source={require('../../assets/app-logo.png')}
        />

        <View style={{padding: 36}}>
          {/* <Text style={{color:'#3C3C3C',fontWeight:'700',fontSize:19}}>Forget Password</Text> */}
          <Text
            style={{
              fontWeight: '600',
              fontSize: 14,
              marginVertical: 10,
              color: '#1E74E9',
            }}>
            {''}
            EMAIL
            {/* {texts[lang].email} */}
          </Text>
          <TextInput
            placeholder={texts[lang].yourEmailAddress}
            value={this.state.email}
            autoCapitalize="none"
            onChangeText={email => this.setState({email})}
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              paddingBottom: 6,
            }}
          />
          <TouchableOpacity
            onPress={() => this.forgetpass()}
            style={{
              marginTop: 30,
              backgroundColor: '#7D7D7D',
              padding: 11,
              borderRadius: 5,
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 15}}>
              {texts[lang].send}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    
    lang:state.User.languageCode.languageCode
  };
}


export default connect(mapStateToProps, null)(ForgetPass);
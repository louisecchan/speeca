import {
  appleAuth
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import React from 'react';
import {
  ActivityIndicator, Alert, Image, KeyboardAvoidingView,
  Platform, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import LoginAction from '../../store/Actions/LoginAction';
import texts from '../../utils/Convertor/translation.json';




class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loader: false,
      eye: true,
    };
  }

  componentDidMount = () => {
    const {count} = this.state;
    const {userdata} = this.props;

    console.log(userdata.User, 'hhh');
    if (userdata.User.data === null) {
      this.props.navigation.navigate('Login');
    } else {
      this.props.navigation.navigate('Dashboard');
    }
  };
  login = () => {
    const {email, password} = this.state;
    if (!email) {
      // return Alert.alert('請輸入您的電子郵件');
      return Alert.alert(texts[lang].pleaseEnterYourEmail);
    } else if (!password) {
      // return Alert.alert('請輸入你的密碼');
      return Alert.alert(texts[lang].pleaseEnterYourPass);
    }
    this.setState({loader: true});

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({user: {uid}}) => {
        firestore()
          .collection('users')
          .doc(uid)
          .get()
          .then(doc => {
            const data = doc.data();
            if (data) {
              console.log(doc.data(), 'login data');
              this.setState({loader: false});
              const userdata = {
                uid: uid,
                data,
              };
              console.log(userdata, 'stringify data');

              this.props.LoginData(userdata);
              this.props.navigation.navigate('Dashboard');
            } else Alert.alert("You're not signed up as a User!");
          })
          .catch(err => {
            this.setState({loader: false});
            console.log(err, 'errorrr');
          });
      })
      .catch(err => {
        console.log(err.response, 'response');
        console.log(err.data, 'data');
        console.log(err.message, 'msgg');
        if (
          err.message ==
          '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          this.setState({loader: false});
          Alert.alert('用戶不存在');
        } else if (
          err.message ==
          '[auth/wrong-password] The password is invalid or the user does not have a password.'
        ) {
          this.setState({loader: false});
          Alert.alert('Password is incorrect');
        } else {
          Alert.alert(err.message);
        }
      });
  };
  onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }


    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );


    const res = await auth().signInWithCredential(appleCredential);
    console.log(res.user._user, 'response');

    var cities = [];

    await firebase
      .firestore()
      .collection('users')
      .where('email', '==', res.user._user.email)
      .get()
      .then(async querySnapshot => {
        querySnapshot.forEach(doc => {
          cities.push(doc.data());
        });

        console.log('Current cities in CA: ', cities.length);
        const a = cities.length;
        console.log(a, 'typeof');
        if (!cities[0]?.age) {
     
          var data = {
            email: res.user._user.email,
            uid: res.user._user.uid,
          
          };
          console.log(data, 'dattaaa');
          firebase
            .firestore()
            .collection('users')
            .doc(res.user._user.uid)
            .set({
              ...data,
            })
            .then(() => {

              this.props.navigation.navigate('AppleAge', {data});
            })
            .catch(error => {
              console.error('Error writing document: ', error);
            });
        } else {

          firebase
            .firestore()
            .collection('users')
            .doc(res.user._user.uid)
            .set(
              {
                age: cities[0].age,
              },
              {merge: true},
            )
            .then(async () => {

              firebase
                .firestore()
                .collection('users')
                .where('email', '==', res.user._user.email)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    var newdata = {
                      uid: res.user._user.uid,
                    };
                    querySnapshot.forEach(doc => {
                      newdata.data = doc.data();
                    });
                    console.log('Current data in CA: ', newdata);
                    this.props.LoginData(newdata);
                    this.props.navigation.navigate('Dashboard');
                  });
                })
                .catch(error => {
                  console.log('Error getting documents: ', error);
                });
         
            })
            .catch(error => {
              console.error('Error writing document: ', error);
            });
        }
      });

    
  };
  render() {
    const {email, password, loader} = this.state;
    const {lang}= this.props


    
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
       
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={{padding: 36}}>
            <Text style={{color: '#3C3C3C', fontWeight: '700', fontSize: 19}}>
              {/* 登入 */}
              {texts[lang].login}
              {/* //login */}
            </Text>
            <Text
              style={{
                color: '#8C8C8C',
                fontWeight: '600',
                fontSize: 14,
                marginVertical: 10,
                fontFamily: 'Quicksand-Medium',
              }}>

              {texts[lang].hiThere}
            </Text>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                marginVertical: 10,
                color: '#1E74E9',
                fontFamily: 'Quicksand-Medium',
              }}>
              {/* 電郵地址 */}
              EMAIL
            </Text>
            <TextInput

              placeholder={texts[lang].yourEmailAddress}
              value={this.state.email}
              keyboardType={'email-address'}
              autoCapitalize="none"
              onChangeText={email => this.setState({email})}
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                paddingBottom: 6,
                fontFamily: 'Quicksand-Medium',
              }}
            />
            <Text
              style={{
                color: '#8C8C8C',
                fontWeight: '600',
                fontSize: 14,
                marginVertical: 10,
                color: '#1E74E9',
                fontFamily: 'Quicksand-Medium',
              }}>
              {/* 密碼 */}

              {/* {texts[lang].password} */}
              Password
            </Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}>
              <TextInput
                value={this.state.password}
                placeholder={texts[lang].yourPassword}
                autoCapitalize="none"
                onChangeText={password => this.setState({password})}
                style={{
                  flex: 1,
                  paddingBottom: 6,
                  fontFamily: 'Quicksand-Medium',
                }}
                secureTextEntry={this.state.eye ? true : false}
              />
              <TouchableOpacity
                onPress={() => this.setState({eye: !this.state.eye})}>
                <Ionicons
                  name={this.state.eye ? 'eye-off' : 'ios-eye'}
                  color="gray"
                  style={{
                    fontSize: 19,
                    fontFamily: 'Quicksand-Medium',
                    alignSelf: 'flex-end',
                    marginTop: Platform.OS == 'android' ? 18 : 0,
                  }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => this.login()}
              style={{
                marginTop: 30,
                backgroundColor: '#7D7D7D',
                padding: 11,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'Quicksand-Medium',
                }}>
                {/* LOGIN */}
                {texts[lang].login}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View
                style={{
                  backgroundColor: 'gray',
                  height: 1,
                  flex: 1,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  paddingHorizontal: 5,
                  fontSize: 13,
                  fontFamily: 'Quicksand-Medium',
                }}>
                {/* OR */}
                {texts[lang].or}
              </Text>
              <View
                style={{
                  backgroundColor: 'gray',
                  height: 1,
                  flex: 1,
                  alignSelf: 'center',
                }}
              />
            </View>
            {/* <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              width: "100%",
              height: 45,
              marginTop:10
              // backgroundColor:"black"
              }}
      onPress={() => this.onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
    /> */}
            {Platform.OS == 'ios' ? (
              <TouchableOpacity
                onPress={() => this.onAppleButtonPress()}
                style={{
                  marginTop: 30,
                  backgroundColor: '#000000',
                  padding: 11,
                  borderRadius: 5,
                }}>
                <Text
                  style={{textAlign: 'center', color: 'white', fontSize: 15}}>
                  <AntDesign
                    name="apple1"
                    color="white"
                    style={{fontSize: 16, fontFamily: 'Quicksand-Medium'}}
                  />{' '}
                  {/* SIGN IN WITH APPLE */}
                  {texts[lang].signInWithApple}
                </Text>
              </TouchableOpacity>
            ) : null}

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgetPass')}>
                <Text
                  style={{color: '#7D7D7E', fontSize: 15, fontWeight: '700'}}>
                  {/* 忘記密碼? */}
                  {texts[lang].forgetThePassword}
                  {/* forget the password? */}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text
                  style={{color: '#1E74E9', fontSize: 15, fontWeight: '700'}}>
                  {/* 註冊新帳號 */}
                  {texts[lang].registerNewAccount}

                  {/* register new account */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

      </View>
    );
  }
}



function mapStateToProps(state) {
  return {
    userdata: state,
    lang:state.User.languageCode.languageCode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    LoginData: userdata => dispatch(LoginAction.getLogin(userdata)), //action ub hm middleware k andr chala rhy wahn action k bd api hit horhi server pey

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

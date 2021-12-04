import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux';
import texts from '../../utils/Convertor/translation.json';
class Signup extends React.Component {
  state = {
    isSelected: false,
    email: '',
    password: '',
    loader: false,
    age: ['< 18', '19-24', '25-30', '31-35', '36-40', '> 40'],
    age1: '',
  };
  register = () => {
    const {email, password, loader, age1, age} = this.state;
    const {lang} = this.props;
    if (!email) return Alert.alert(texts[lang].pleaseEnterYourEmail);
    else if (!password) return Alert.alert(texts[lang].pleaseEnterYourPass);
    else if (!age1) return Alert.alert(texts[lang].pleaseSelectYourAgeRange);
    this.setState({loader: true});
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user: {uid}}) => {
        const details = {
          email,
          password,
          age1,
          uid,
        };
        firestore()
          .collection('users')
          .doc(uid)
          .set({
            ...details,
          })
          .then(() => {
            this.setState({loader: false});
            this.props.navigation.navigate('Login');
          })
          .catch(err => {
            this.setState({loader: false});
            console.log(err.message);
            Alert.alert(err.message);
          });
      })
      .catch(error => {

        console.log(error.message);
        if (
          error.message ==
          '[auth/invalid-email] The email address is badly formatted.'
        ) {
          this.setState({loader: false});

          Alert.alert(texts[lang].incorrectEmailFormat);
        }

   
      });
  };
  render() {
    const {isSelected, email, password, loader, age, age1} = this.state;
    console.log('age', age);
    const {lang} = this.props;
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
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <View style={{padding: 24}}>
              <Text
                style={{
                  color: '#3C3C3C',
                  fontWeight: '600',
                  fontSize: 19,
                  fontFamily: 'Quicksand-Medium',
                  marginTop: getStatusBarHeight() + 40,
                }}>
                {/* 註冊 */}
                {texts[lang].register}
              </Text>
              <Text
                style={{
                  color: '#8C8C8C',
                  fontWeight: '600',
                  fontSize: 14,
                  marginVertical: 10,
                  fontFamily: 'Quicksand-Medium',
                }}>
                {/* Hi there! Nice to see you. */}
                {texts[lang].hiThere}
              </Text>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  marginVertical: 10,
                  color: '#1E74E9',
                  fontFamily: 'Quicksand-Bold',
                }}>
                EMAIL
              </Text>
              <TextInput
                keyboardType={'email-address'}
                placeholder={texts[lang].yourEmailAddress}
                autoCapitalize="none"
                onChangeText={email => this.setState({email})}
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  fontFamily: 'Quicksand-Medium',
                  paddingBottom: 6,
                }}
              />
              <View style={{marginTop: 18}}>
                <Text
                  style={{
                    color: '#8C8C8C',
                    fontWeight: '600',
                    fontSize: 14,
                    marginVertical: 10,
                    fontFamily: 'Quicksand-Bold',
                    color: '#1E74E9',
                  }}>
                  PASSWORD
                </Text>
                <TextInput
                  // placeholder="你的密碼"
                  placeholder={texts[lang].yourPassword}
                  autoCapitalize="none"
                  onChangeText={password => this.setState({password})}
                  style={{
                    borderBottomColor: 'gray',
                    fontFamily: 'Quicksand-Medium',
                    borderBottomWidth: 1,
                    paddingBottom: 6,
                  }}
                  secureTextEntry
                />
              </View>

              <View style={{marginTop: 28}}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    marginVertical: 10,
                    color: '#1E74E9',
                    fontFamily: 'Quicksand-Bold',
                  }}>
                  PLEASE SELECT YOUR AGE
                </Text>
                <SelectDropdown
                  data={age}
                  // defaultButtonText="選擇年紀"
                  defaultButtonText={texts[lang].chooseAge}
                  buttonTextStyle={{
                    textAlign: 'left',
                    marginLeft: -6,
                    fontFamily: 'Quicksand-Medium',
                    fontSize: 14,
                    color: '#8C8C8C',
                  }}
                  buttonStyle={{
                    borderBottomWidth: 1,
                    fontFamily: 'Quicksand-Medium',
                    backgroundColor: 'white',
                    width: '100%',
                    height: 30,
                    textAlign: 'left',
                    borderColor: '#8C8C8C',
                  }}
                  onSelect={(selectedItem, index) => {
                    this.setState({age1: selectedItem});
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  disabled={false}
                  value={isSelected}
                  boxType={'square'}
                  style={{height: 12, marginTop: 30}}
                  onValueChange={newValue => this.setState({isSelected:!isSelected})}
                />
                <Text
                  style={{
                    color: '#8C8C8C',
                    fontWeight: '600',
                    fontSize: 12,
                    letterSpacing: 0.8,
                    marginTop: 28,
                    color: 'black',
                    marginLeft: Platform.OS == 'ios' ? -20 : -6,
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  {'  '}

                  {texts[lang].iAgreeToThe}
                  <Text
                    style={{
                      color: '#E2D319',
                      fontFamily: 'Quicksand-Medium',
                      letterSpacing: 0.8,
                    }}>
                    {' '}
                    {texts[lang].termOfService}{' '}
                  </Text>
                  {texts[lang].and}
                  <Text
                    style={{
                      color: '#E2D319',
                      fontFamily: 'Quicksand-Medium',
                      letterSpacing: 0.8,
                    }}>
                 {texts[lang].privacyPolicy}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.register()}
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
                  {/* 下一步 */}
                  {texts[lang].nextStep}
                </Text>
              </TouchableOpacity>
            
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <View style={{marginTop: 20}}>
                  <Text
                    style={{
                      color: '#7D7D7E',
                      fontSize: 15,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Quicksand-Medium',
                    }}>
                    {/* 已有帳號?  */}
                    {texts[lang].alreadyHaveAnAccount}
                    <Text style={{color: '#1E74E9'}}>
                      {/* 登入 */}
                      {texts[lang].login}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    lang: state.User.languageCode.languageCode,
  };
}

export default connect(mapStateToProps, null)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

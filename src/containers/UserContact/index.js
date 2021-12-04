import {firebase} from '@react-native-firebase/auth';
import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../components/HeaderCustom';

class UserContact extends React.Component {
  state = {
    email: this.props.userdata.User.data.data.email,
    mobile: '',
  };

  save = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(this.props.userdata.User.data.data.uid)
      .set(
        {
          mobile: this.state.mobile,
        },
        {merge: true},
      )
      .then(() => {
        Alert.alert('Thankyou! We will contact you shortly!');
        this.props.navigation.navigate('Class');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'white',
        }}>
        <Header back logoutvisible navigation={this.props.navigation} />
        <ScrollView contentContainerStyle={{padding: 27}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              fontFamily: 'Quicksand-Medium',
            }}>
            User contact Information
          </Text>
          <Text
            style={{
              color: '#8C8C8C',
              fontFamily: 'Quicksand-Medium',
              fontWeight: '600',
              fontSize: 14,
              marginTop: 20,
              color: '#1E74E9',
            }}>
            EMAIL
          </Text>
          <TextInput
            placeholder="Your Email Address"
            value={this.state.email}
            keyboardType={'email-address'}
            editable={false}
            autoCapitalize="none"
            onChangeText={email => this.setState({email})}
            style={{
              borderBottomColor: 'gray',
              fontFamily: 'Quicksand-Medium',
              borderBottomWidth: 1,
              paddingBottom: 6,
              color: '#585857',
            }}
          />
          <Text
            style={{
              color: '#8C8C8C',
              fontFamily: 'Quicksand-Medium',
              fontWeight: '600',
              fontSize: 14,
              marginTop: 20,
              color: '#1E74E9',
            }}>
            MOBILE NUMBER
          </Text>
          <TextInput
            placeholder="Your Mobile Number"
            value={this.state.mobile}
            keyboardType={'phone-pad'}
            autoCapitalize="none"
            onChangeText={mobile => this.setState({mobile})}
            style={{
              borderBottomColor: 'gray',
              fontFamily: 'Quicksand-Medium',
              borderBottomWidth: 1,
              paddingBottom: 6,
              color: '#585857',
            }}
          />
          <TouchableOpacity
            onPress={() => this.save()}
            style={{
              marginTop: 30,
              backgroundColor: '#36BEFD',
              padding: 11,
              borderRadius: 5,
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 15}}>
              SUBMIT
            </Text>
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
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.9,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

function mapStateToProps(state) {
  return {
    userdata: state,
  };
}

export default connect(mapStateToProps)(UserContact);

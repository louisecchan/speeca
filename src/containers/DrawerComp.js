import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import device from '../../utils/device';
import LoginAction from '../store/Actions/LoginAction';
import texts from '../utils/Convertor/translation.json';
const color = [{blue: 'blue'}];
class DrawerComp extends React.Component {
  state = {
    bgcolor: 'blue',
    buttonColor: 'green',
  };
  logout = () => {
    console.log(this.props.Logout());
    this.props.navigation.navigate('Login');
  };
  handleButtonPress(title) {
    var link = 'https://speeca-fc9d3.firebaseapp.com/';
    this.props.navigation.navigate('Browser', {title, link});
  }
  render() {
    const {select} = this.state;
    const {lang} = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          backgroundColor: 'white',
          flex: 1,
          marginTop: getStatusBarHeight(),
        }}>
        <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
          <Entypo name="cross" size={24} style={{padding: 20, color: 'red'}} />
        </TouchableOpacity>

        <Image
          style={{width: '70%', alignSelf: 'center', height: '10%'}}
          source={require('./../assets/app-logo.png')}
        />

        <View style={{paddingTop: 40, width: '100%'}}>
          <TouchableHighlight
            style={styles.subContainer}
            activeOpacity={0.4}
            underlayColor="#1E74E9"
            onPress={() => {
              this.props.navigation.navigate('Dashboard');
              this.props.navigation.closeDrawer();
            }}>
            <View style={styles.subContent}>
              <MaterialCommunityIcons name="home" size={21} color="#d8dce4" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 10,
                    fontWeight: '600',
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  {/* 主頁  */}
                  {texts[lang].home} Home
                </Text>
                <AntDesign
                  name="right"
                  size={14}
                  style={{marginTop: 3, alignSelf: 'center', color: '#d8dce4'}}
                />
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.subContainer}
            activeOpacity={0.4}
            underlayColor="#1E74E9"
            onPress={() => {
              this.props.navigation.navigate('Quiz');
              this.props.navigation.closeDrawer();
            }}>
            <View style={styles.subContent}>
              <Image
                source={require('../assets/quiz-icon.png')}
                style={{width: 20, height: 20}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 10,
                    fontWeight: '600',
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  {/* 水平測試  */}
                  {texts[lang].quizzes} Quizzes
                </Text>
                <AntDesign
                  name="right"
                  size={14}
                  style={{marginTop: 3, alignSelf: 'center', color: '#d8dce4'}}
                />
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.subContainer}
            activeOpacity={0.4}
            underlayColor="#1E74E9"
            onPress={() => {
              this.props.navigation.navigate('Learn');
              this.props.navigation.closeDrawer();
            }}>
            <View style={styles.subContent}>
              <Entypo name="light-bulb" size={21} color="#d8dce4" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 10,
                    fontWeight: '600',
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  {/* 學習  */}
                  {texts[lang].learn} Learn
                </Text>
                <AntDesign
                  name="right"
                  size={14}
                  style={{marginTop: 3, alignSelf: 'center', color: '#d8dce4'}}
                />
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.subContainer}
            activeOpacity={0.4}
            underlayColor="#1E74E9"
            onPress={() => {
              this.props.navigation.navigate('Resources');
              this.props.navigation.closeDrawer();
            }}>
            <View style={styles.subContent}>
              <Image
                source={require('../assets/resource-icon.png')}
                style={{width: 20, height: 20}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 10,
                    fontWeight: '600',
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  {/* 資源 */}
                  {texts[lang].resources} Resources
                </Text>
                <AntDesign
                  name="right"
                  size={14}
                  style={{marginTop: 3, alignSelf: 'center', color: '#d8dce4'}}
                />
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.subContainer}
            activeOpacity={0.4}
            underlayColor="#1E74E9"
            onPress={() => {
              this.props.navigation.navigate('Class');
              this.props.navigation.closeDrawer();
            }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 0,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/class-icon.png')}
                style={{width: 20, height: 20}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 10,
                    fontWeight: '600',
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  {/* 課程 */}
                  {texts[lang].courses} Courses
                </Text>
                <AntDesign
                  name="right"
                  size={14}
                  style={{marginTop: 3, alignSelf: 'center', color: '#d8dce4'}}
                />
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.subContainer}
            activeOpacity={0.4}
            underlayColor="#1E74E9"
            onPress={() => {
              this.props.navigation.navigate('GetInTouch');
              this.props.navigation.closeDrawer();
            }}>
            <View style={styles.subContent}>
              <MaterialCommunityIcons name="heart" size={21} color="#d8dce4" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 10,
                    fontWeight: '600',
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  {/* 聯絡我們 */}
                  {texts[lang].getInTouch} Get In Touch
                </Text>
                <AntDesign
                  name="right"
                  size={14}
                  style={{marginTop: 3, alignSelf: 'center', color: '#d8dce4'}}
                />
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.subContainer}
            activeOpacity={0.4}
            underlayColor="#1E74E9"
            onPress={() => this.handleButtonPress('Privacy Policy')}>
            <View style={styles.subContent}>
              <Entypo name="lock" size={21} color="#d8dce4" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    marginLeft: 10,
                    fontWeight: '600',
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  {/* 隱私政策  */}
                  {texts[lang].privacyPolicy} Privacy Policy
                </Text>
                <AntDesign
                  name="right"
                  size={14}
                  style={{marginTop: 3, alignSelf: 'center', color: '#d8dce4'}}
                />
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableOpacity
          style={styles.containerMain}
          activeOpacity={0.4}
          underlayColor="#1E74E9"
          onPress={() => this.logout()}>
          <View style={styles.bottomView}>
            <AntDesign name="logout" size={18} color="#d8dce4" />
            <View
              style={styles.bottomView}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: '600',
                  marginLeft: 10,
                  fontFamily: 'Quicksand-Medium',
                }}>
                {/* Logout */}
                {texts[lang].logout}
                {' Logout'}
              </Text>
              <AntDesign
                name="right"
                size={14}
                style={{marginTop: 3, alignSelf: 'center', color: '#d8dce4'}}
              />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: device.isIphoneX ? 20 : 10,
    flexDirection: 'row',
    margin: 0,
    padding: 10,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  subContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    marginVertical: 3,
  },
  subContent: {
    flexDirection: 'row',
    margin: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    userdata: state.User.data,
    lang: state.User.languageCode.languageCode,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    Logout: data => dispatch(LoginAction.getLogout(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerComp);

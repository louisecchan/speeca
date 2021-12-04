import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import React from 'react';
import {
  Alert, Image, Platform, ScrollView, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import { connect } from 'react-redux';
import stripe from 'tipsi-stripe';
import { demoCardFormParameters } from '../../../scenes/demodata/demodata';
import Image1 from '../../assets/class-image.svg';
import Header from '../../components/HeaderCustom';
import texts from '../../utils/Convertor/translation.json';

// import testID from '../../../utils/__tests__/types.test'

// stripe.setOptions({
//     publisablekey:"pk_test_51JeaCvKLjO5zSSsbSBAhaMM1BzgrohBnqQAZI6r0XizjJARr6IBML40MvK8vSTNG1mhtG8DtNWIdWUHhvbIG5vkJ00zu7sZ6PC"
// })

class Class extends React.Component {
  state = {
    visible: 'collocation',
    topicList: [
      {name1: 'Simply Hello', name2: '漢字字漢字'},
      {name1: 'Nih Hello', name2: '漢字漢字漢字'},
      {name1: 'World Hello', name2: '漢字漢字'},
      {name1: 'Bye Hellgo', name2: '漢字'},
    ],
    loading: false,
    paymentMethod: null,
  };
 
  handleCardPayPress = async () => {
    try {
      this.setState({loading: true, paymentMethod: null});
      const paymentMethod = await stripe.paymentRequestWithCardForm(
        demoCardFormParameters,
      );

      this.setState({paymentMethod});
      axios({
        method: 'POST',
        url: 'https://us-central1-speeca-fc9d3.cloudfunctions.net/completePaymentWithStripe',
        data: {
          amount: 99,
          currency: 'usd',
          token: paymentMethod.tokenId,
        },
  
      })
        .then(response => {
         
          var today = new Date();
          const paymentList = {
            amount: response.data.amount,
            stripeid: response.data.id,
            date: today.toLocaleDateString('en-US'),
            uid: this.props.userdata.uid,
            email: this.props.userdata.data.email,
          };
          firestore()
            .collection('payment')
            .doc()
            .set({
              ...paymentList,
            })
            .then(() => {
              console.log('Document successfully written!');
            })
            .catch(error => {
              console.error('Error writing document: ', error);
            });

          console.log(paymentList, 'LISTTSTTTTTT');
          if (response.data.status == 'succeeded') {
            Alert.alert('Successful!!');
          } else {
            Alert.alert('Please try again!');
          }
          this.setState({loading: false});
        })
        .catch(err => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error, 'payment method');
      this.setState({loading: false});
    }
  };
  //   handleCardPayPress = async () => {
  //       console.log("handleCardPayPress")
  //     try {
  //       console.log("try1")
  //       this.setState({ loading: true, paymentMethod: null })
  //       console.log("try2")
  //       const paymentMethod = await stripe.paymentRequestWithCardForm({
  //         smsAutofillDisabled: true,
  //         requiredBillingAddressFields: 'full',
  //         prefilledInformation: {
  //           billingAddress: {
  //             name: 'Gunilla Haugeh',
  //             line1: 'Canary Place',
  //             line2: '3',
  //             city: 'Macon',
  //             state: 'Georgia',
  //             country: 'US',
  //             postalCode: '31217',
  //             email: 'ghaugeh0@printfriendly.com',
  //           },
  //         },
  //       })
  //       console.log(paymentMethod,"try3")
  //       this.setState({ loading: false, paymentMethod })
  //     } catch (error) {
  //         console.log(error)
  //       this.setState({ loading: false })
  //     }
  //   }
  render() {

    const {lang} = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'white',
        }}>
        <Header logoutvisible navigation={this.props.navigation} />
        <ScrollView
          contentContainerStyle={{padding: 27}}
          showsVerticalScrollIndicator={false}>
          <Text style={{fontSize: 24, fontFamily: 'Quicksand-Bold'}}>
            Courses
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: 'gray',
              letterSpacing:4,
              fontFamily: 'Quicksand-Medium',
            }}>
            {/* 錄 播 課 程 */}
            {texts[lang].recordingAndBroadCastingCourses}
          </Text>
          {/* Recording and Broadcasting Courses */}
          <View style={styles.elevationLow}>
            <Image
              source={require('../../assets/class-image.jpg')}
              style={{
                width: '100%',
                height: 190,
                borderRadius: 20,
                marginTop: 9,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <Image
                source={require('../../assets/CourseLogo1.png')}
                style={{width: 100, height: 80, borderRadius: 20, marginTop: 9}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: '#36BEFD',
                  fontFamily: 'Quicksand-Medium',
                  letterSpacing: 0.3,
                }}>
                {/* 10段高質量影片  */}
                {texts[lang].HighQualityVideos}
              </Text>
              {/* 10 high-quality videos */}
            </View>
            <View>
              <Image
                source={require('../../assets/CourseLogo2.png')}
                style={{width: 100, height: 80, borderRadius: 20, marginTop: 9}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: '#36BEFD',
                  fontFamily: 'Quicksand-Medium',
                  letterSpacing: 0.3,
                }}>
                {/* 課後測驗和練習 */}
                {texts[lang].AfterSchoolQuizzes}
              </Text>

              {/* After-school quizzes and exercises */}
            </View>
            <View>
              <Image
                source={require('../../assets/CourseLogo3.png')}
                style={{width: 100, height: 80, borderRadius: 20, marginTop: 9}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: '#36BEFD',
                  fontFamily: 'Quicksand-Medium',
                  letterSpacing: 0.3,
                }}>
                {/* 課程支援小組 */}
                {texts[lang].curriculumSupportGroup}
                    {/* Curriculum Support Group */}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 20, flexDirection: 'row'}}>
            <Text style={{fontFamily: 'Quicksand-Medium'}}>課程學費 </Text>
            {/* Course tuition */}
            <Text
              style={{
                textDecorationLine: 'line-through',
                fontFamily: 'Quicksand-Medium',
              }}>
              $199{' '}
            </Text>
            <Text style={{color: 'green', fontFamily: 'Quicksand-Medium'}}>
              {' '}
              $99{' '}
            </Text>
          </View>
          <View style={{marginTop: 20, flexDirection: 'row'}}>
            <Text style={{color: 'red', fontFamily: 'Quicksand-Medium'}}>
              {/* 謝謝大家支持,{' '} */}
              {texts[lang].ThankyouAllForYourSupport}{' '}
              {/* Thank you all for your support */}
            </Text>
            <Text style={{color: 'red', fontFamily: 'Quicksand-Medium'}}>
              {/* 由於報名人數眾多,{' '} */}

              {texts[lang].dueToTheLargeNumber}{' '}
              {/* Due to the large number of applicants */}
            </Text>
            <Text style={{color: 'red', fontFamily: 'Quicksand-Medium'}}>
              {' '}
              {/* 課程目前名額已滿{' '} */}
              {texts[lang].coursesAreCurrentluFull}{' '}

                {/* Courses are currently full */}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ClassUserInfo')}
            style={{
              backgroundColor: '#36BEFD',
              padding: 17,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '800',
                fontFamily: 'Quicksand-Medium',
              }}>
              {/* 預留名額{' '} */}
              {texts[lang].reservedPlaces}{' '}
              {/* Reserved places */}
            </Text>
          </TouchableOpacity>
          <Image1 width={'100%'} style={{marginTop: 20}} height={150} />
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
    userdata: state.User.data,
    lang:state.User.languageCode.languageCode

  };
}

export default connect(mapStateToProps)(Class);


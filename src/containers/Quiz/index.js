import React from 'react';
import {
  Dimensions,
  StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import { connect } from 'react-redux';
import Tab2 from '../../assets/tab-img1.svg';
import Tab1 from '../../assets/tab-img2.svg';
import Header from '../../components/HeaderCustom';
import texts from '../../utils/Convertor/translation.json';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
console.log(width, 'width');
console.log(height, 'height');
 class Quiz extends React.Component {
  state = {
    visible: 'collocation',
    visible1: 'vocabulary',
  };
  render() {
    const {visible, visible1} = this.state;
    const {lang} = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'white',
        }}>
        <Header logoutvisible navigation={this.props.navigation} />
        <View style={{padding: 20}}>
          <Text style={{fontSize: 22, fontFamily: 'Quicksand-Bold'}}>
            Quizzes
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: 'gray',
              letterSpacing:5,
              fontFamily: 'Quicksand-Medium',
            }}>
            {/* 英 文 測 試 */}
            {texts[lang].englishTest}
            {/* English Test */}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            justifyContent: 'space-around',
          }}>
          <View
            onPress={() => this.setState({visible: 'collocation'})}
            style={{
              borderBottomColor: visible == 'collocation' ? 'gray' : '#D8D6D6',
              borderBottomWidth: 2,
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: 'gray',
                textAlign: 'left',
                fontFamily: 'Quicksand-Medium',
              }}>
              Collocation quiz
              
            </Text>
          </View>
          <View
            onPress={() => this.setState({visible: 'chinese1'})}
            style={{
              borderBottomColor: visible == 'collocation' ? '#D8D6D6' : 'gray',
              borderBottomWidth: 2,
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                letterSpacing:1,
                fontFamily: 'Quicksand-Medium',
              }}>
              {/* 搭配字詞測試 */}
              {texts[lang].englishTest}
              {/* Collocation test */}

            </Text>
          </View>
        </View>
        {visible == 'collocation' ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('QuizQuestion', {
                select: 'collocation',
              })
            }
            style={{padding: 20, alignItems: 'center'}}>
            <Tab1 width={'100%'} height={150} />
          </TouchableOpacity>
        ) : (
          <View style={{padding: 20, alignItems: 'center'}}>

            <Tab1 width={'100%'} height={150} />

          </View>
        )}

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: height > 750 ? 505 : null,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'space-around',
            }}>
            <View
              onPress={() => this.setState({visible: 'collocation'})}
              style={{
                borderBottomColor:
                  visible == 'collocation' ? 'gray' : '#D8D6D6',
                borderBottomWidth: 2,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: 'gray',
                  textAlign: 'left',
                  fontFamily: 'Quicksand-Medium',
                }}>
                Vocabulary quiz
              </Text>
            </View>
            <View
              onPress={() => this.setState({visible: 'chinese1'})}
              style={{
                borderBottomColor:
                  visible == 'collocation' ? '#D8D6D6' : 'gray',
                borderBottomWidth: 2,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  fontFamily: 'Quicksand-Medium',
                }}>
                {/* 詞彙測試 */}
                {texts[lang].vocabularyQuiz}
                {/* Vocabulary test */}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('QuizQuestion', {
                select: 'vocabulary',
              })
            }
            style={{padding: 20, alignItems: 'center'}}>
            <Tab2 width={'100%'} height={'160'} />
          </TouchableOpacity>
        </View>
      </View>

    
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  bottomView: {

    bottom: 20,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});
function mapStateToProps(state) {
  return {
    
    lang:state.User.languageCode.languageCode
  };
}


export default connect(mapStateToProps, null)(Quiz);
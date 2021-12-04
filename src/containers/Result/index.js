import React from "react";
import {
    StyleSheet, Text,
    TouchableOpacity, View
} from "react-native";
import Share from 'react-native-share';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Image1 from "../../assets/result-image.svg";
import Header from '../../components/HeaderCustom';
import texts from '../../utils/Convertor/translation.json';
class Result extends React.Component {
    state = {
        visible: 'collocation',
        visible1: 'vocabulary',

        questionNum: 1,
        resultscore:""
    }
    componentDidMount = () => {
        const score=this.props.navigation.getParam("score")
        this.setState({resultscore:score})

    }
    share=async()=>{
        const shareOptions={
            message:"分享你的成績給...",
        }
        try{
            const shareResponse= await Share.open(shareOptions)
        }catch{
            console.log("error",error)
        }
    }
    render() {
        const { visible, visible1, question, text, choice, questionNum,resultscore } = this.state
        const {lang}= this.props
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start',backgroundColor:'white' }}>
                <Header back quizGoBack logoutvisible navigation={this.props.navigation} />
                <Text style={{ paddingLeft: 20, marginTop: 20, fontSize: 20, fontFamily:"Quicksand-Bold"}}>Your Result</Text>
                <Text style={{ paddingLeft: 20, fontSize: 16,fontFamily:"Quicksand-Medium",color:'grey' ,letterSpacing:4}}> 
                {/* 你 的 分 數 */}
                {texts[lang].yourPoints}
                </Text>

                <TouchableOpacity style={{ borderBottomColor: 'gray', padding: 20, alignSelf: 'center', marginTop: 15, borderBottomWidth: 1, paddingBottom: 8, width: '80%' }}>
                    <Text style={{ textAlign: 'center',fontFamily:"Quicksand-Medium", fontSize: 18, color: 'black', fontWeight: '600' }}>{resultscore}</Text>
                </TouchableOpacity>
                <View style={{ padding: 26 }}>
                    <TouchableOpacity onPress={()=>this.share()} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ width: '70%' ,fontFamily:"Quicksand-Medium"}}>Share the score with your friends!
                         {/* 跟朋友分享你的分數吧！ */}
                         {texts[lang].shareYourScore}
                         </Text>
                        <AntDesign size={25} name="sharealt" style={{ color: 'black' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Quiz")} style={{ padding: 10, backgroundColor: "#2F9CEC", marginTop: 20, borderRadius: 6, marginHorizontal: 4 }}>
                        <Text style={{ color: 'white', fontWeight: '500', textAlign: 'center',fontFamily:"Quicksand-Medium" }}>Try it again
                         {/* 重試 */}
                          {' '}{texts[lang].retry}
                         </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.containerMain}>
                    <Image1 style={styles.bottomView} width={'100%'} height={'90%'} />
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
    },
    bottomView: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', 
      bottom: 20, 
    },
    textStyle: {
      color: '#fff',
      fontSize: 18,
    },
  });

  function mapStateToProps(state) {

    return {
      userdata: state.User.data,
      lang: state.User.languageCode.languageCode,
    };
  }

  export default connect(mapStateToProps, null)(Result);
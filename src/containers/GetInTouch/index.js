import firestore from '@react-native-firebase/firestore';
import React from "react";
import {
  Alert, StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
import { connect } from 'react-redux';
import Image1 from "../../assets/getintouch-image.svg";
import Header from '../../components/HeaderCustom';
import texts from '../../utils/Convertor/translation.json';

class GetInTouch extends React.Component {
    state = {
       description:''
    }
    componentDidMount(){
      console.log(this.props.userdata.User.data.uid)
    }
    sendEmail=()=>{
      const {description}=this.state
      if(!description){ return Alert.alert("Please enter your message")}

      firestore().collection("queries").doc().set({
       uid:this.props.userdata.User.data.uid,
       email:this.props.userdata.User.data.data.email,
       description: description
    })
    .then(() => {
        console.log("Document successfully written!");
        this.props.navigation.navigate("Dashboard")
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

    }
    render() {
        const { buttonText } = this.state
        const { lang } = this.props
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white' }}>
                <Header  logoutvisible navigation={this.props.navigation} />
                <View style={{ padding: 20 ,}}>
                    <Text style={{ fontSize: 22,fontFamily:"Quicksand-Bold" }}
                    >Get in Touch</Text>
                    <Text style={{ fontSize: 16, color: 'gray',fontFamily:"Quicksand-Medium",letterSpacing:4}}>
                      {/* 聯 絡 我 們 */}
                      {texts[lang].contactUs}
                      </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', color: 'gray',
                    marginTop:20 ,fontFamily:"Quicksand-Medium"}}>
                      {/* 我們一直致力找方法優化我們的手機程式，如果你有任何想法覺得可以改善你的使用經驗，請告訴我們 */}
                      {texts[lang].weAreAlwaysWorkingHard}
                      </Text>
                </View>

               <View style={{padding:20,marginTop:20}}>
                 <Text style={{fontFamily:"Quicksand-Medium"}}>
              
                   {texts[lang].whatsOnYourMind}
                   </Text>

                 <TextInput onChangeText={(description)=>this.setState({description})} style={{borderBottomColor:'#7852C8',marginTop:20,width:'98%',borderBottomWidth:1}} />
               </View>
         
               <TouchableOpacity onPress={()=>this.sendEmail()} style={{padding:10,width:'89%',alignSelf:'center',backgroundColor:'#7852C8'}}>
                 <Text style={{alignSelf:'center',color:'white',fontFamily:"Quicksand-Bold"}}>
             
                   {texts[lang].send}
                   </Text>
                 </TouchableOpacity>
               <View style={{marginTop:20}}>
                    <Image1  width={'100%'} height={200} />
              </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
  console.log(state, 'this is login state')
  return ({
    userdata: state,
    lang:state.User.languageCode.languageCode
   
  })
}

export default connect(mapStateToProps, null)(GetInTouch);

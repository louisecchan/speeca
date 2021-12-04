import { firebase } from '@react-native-firebase/storage';
import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux';

import LoginAction from '../../store/Actions/LoginAction';
import texts from '../../utils/Convertor/translation.json';

class Login extends React.Component {
  state={
    email:'',
    password:'',
    loader:false,
    eye:true,
    age:['10-15','15-20','20-25'],

    age1:[],
    data:[]
  }
  componentDidMount = () => {
    var data= this.props.navigation.getParam("data")

    this.setState({data:data})

  }
  login=()=>{
    firebase.firestore().collection("users").doc(this.state.data.uid).set({
       age:this.state.age1
    },{merge:true})
    .then(async() => {

        await firebase.firestore().collection("users").where("email", "==", this.state.data.email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                      var newdata = {
                          uid:this.state.data.uid,
                        }
                         querySnapshot.forEach((doc) => {
                          newdata.data=doc.data()
                        });

                        this.props.LoginData(newdata)
                        this.props.navigation.navigate("Dashboard")
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
      
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    
  }
  render() {
    const {email,password,loader,age} = this.state
    const {lang}=this.props
    console.log("speeca")
    return (
      <View style={{flex: 1,justifyContent:'flex-start',backgroundColor:'white'}}>
         {loader ? <View style={{ position: "absolute", zIndex: 99, justifyContent: 'center', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ActivityIndicator size="large" color="black" />
        </View> : null
        }
        <Image style={{width:'60%',alignSelf:'center',height:'10%',marginTop:getStatusBarHeight()}} source={require("../../assets/app-logo.png")} />
        <View style={{padding:36}}>
      
      <View style={{marginTop:28}}>
        <Text style={{fontWeight:'600',fontSize:14,marginVertical:10,color:'#1E74E9'}}>PLEASE SELECT YOUR AGE</Text>
          <SelectDropdown
              data={age}
              defaultButtonText={texts[lang].chooseAge}

              buttonTextStyle={{textAlign:'left',marginLeft:-6,fontSize:14,color:'#8C8C8C'}}
              buttonStyle={{borderBottomWidth:1,backgroundColor:"white",width:'100%',height:30,textAlign:'left',borderColor:'#8C8C8C'}}
              onSelect={(selectedItem, index) => {
                this.setState({age1:selectedItem})
              }}
            />
          </View>
           

            <TouchableOpacity onPress={()=>this.login()} style={{marginTop:30,backgroundColor:'#7D7D7D',padding:11,borderRadius:5}}>
                <Text style={{textAlign:'center',color:'white',fontSize:15}}>
                {texts[lang].done}
                  </Text>
            </TouchableOpacity>
        
        </View>
      </View>
    );
  }
}



function mapStateToProps(state) {

  return ({
    userdata: state,
    lang:state.User.languageCode.languageCode

  })
}

function mapDispatchToProps(dispatch) {
  return {

    LoginData: (userdata) => dispatch(LoginAction.getLogin(userdata))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);


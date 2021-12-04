import React from "react";
import {
    StyleSheet, Text,
    TouchableOpacity, View
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Image1 from "../../assets/education-level.svg";
import Header from '../../components/HeaderCustom';


export default class EducationLevel extends React.Component {
    state={
        visible:'collocation',
        visible1:'vocabulary'
    }
    render() {
        const {visible,visible1}=this.state
        return (
            <View style={{ flex: 1,justifyContent:'flex-start',backgroundColor:'white' }}>
                <Header back logoutvisible navigation={this.props.navigation} />
                <Text style={{paddingLeft:30,marginTop:20,fontSize:20,fontWeight:'600'}}>Education Level</Text>
                <Text style={{paddingLeft:30,marginTop:20,fontSize:13,fontWeight:'600',color:'#1E74E9'}}>Please select Education level here</Text>
                <View style={{paddingLeft:30,marginTop:20}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("QuizQuestion")} style={{borderBottomColor:'gray',borderBottomWidth:1,paddingBottom:8,width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>EDUCATION LEVEL 1</Text>
                        <AntDesign name="right" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderBottomColor:'gray',marginTop:15,borderBottomWidth:1,paddingBottom:8,width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>EDUCATION LEVEL 2</Text>
                        <AntDesign name="right" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderBottomColor:'gray',marginTop:15,borderBottomWidth:1,paddingBottom:8,width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>EDUCATION LEVEL 3</Text>
                        <AntDesign name="right" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderBottomColor:'gray',marginTop:15,borderBottomWidth:1,paddingBottom:8,width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>EDUCATION LEVEL 4</Text>
                        <AntDesign name="right" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderBottomColor:'gray',marginTop:15,borderBottomWidth:1,paddingBottom:8,width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>EDUCATION LEVEL 5</Text>
                        <AntDesign name="right" />
                    </TouchableOpacity>
                   
                </View>
                <View style={styles.containerMain}>
                    <Image1 style={styles.bottomView} width={'100%'} height={150} />
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
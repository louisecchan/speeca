import storage from '@react-native-firebase/storage';
import React from "react";
import {
    ActivityIndicator, Alert, PermissionsAndroid, Platform, Text,
    TouchableOpacity, View
} from "react-native";
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import Header from '../../components/HeaderCustom';
import texts from '../../utils/Convertor/translation.json';



class Resources extends React.Component {
    state = {
        buttonText: [
        ],
        url1: '',
        loader: false
    }
    componentDidMount = async () => {
        var reference1 = storage().ref('pdf');
        this.setState({loader:true})
        this.listFilesAndDirectories(reference1).then(() => {

          this.setState({loader:false})
        });
    }
    listFilesAndDirectories=(reference1, pageToken)=> {
        return reference1.list({ pageToken }).then(result => {
          // Loop over each item
          var array=[]
          result.items.forEach(ref => {

            array.push(ref.path)

            var storageUrl = ref.path
          });
          var mydata = [];
          array.map((data, i) => {
            var filename = data.split(".").slice(0, -1).join(".");
            var a = filename.substring(filename.lastIndexOf("/") + 1);
            mydata.push(a);
          });
          console.log(mydata);
          this.setState({buttonText:mydata})

          if (result.nextPageToken) {
            return listFilesAndDirectories(reference1, result.nextPageToken);
          }
      
          return Promise.resolve();
        }).catch((err)=>{
            console.log(err)
        })
      }
      
     
    actualDownload = async (newdata) => {
        console.log(newdata,"newdataaaa")
        const { dirs } = RNFetchBlob.fs;
        this.setState({ loader: true })

           var storageUrl = `pdf/${newdata}.pdf`;
            var name = newdata
       
        console.log(RNFetchBlob.fs.dirs.DocumentDir, 'ios directoruy')
        const download = Platform.OS == 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
        console.log(download,"download")
        let reference = storage().ref(storageUrl);   
        const fileurl1 = reference.getDownloadURL();
        console.log(fileurl1, 'this is url')
        const data = await fileurl1.then((data) => {
            console.log(data, 'this is data')
            const configOptions = Platform.select({
                ios: {
                    fileCache: true,
                    path: download + '/' + "speeca/" + name + '.pdf',
                    notification: true,
                    appendExt: 'pdf',

                },
                android: {
                    fileCache: true,
                    appendExt: 'pdf',
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        title: name,
                        notification: true,

                        path: download + '/speecapdf/' + name + '.pdf',
                    },
                },
            });
            RNFetchBlob.config(configOptions)
                .fetch('GET', data, {})
                .then((res) => {
                    console.log('The file saved to ', res.path());
                    this.setState({ loader: false })
                    this.refs.toast.show(`${name} 已被成功下載`, 1000, () => {

                    })

                })
                .catch((e) => {
                    console.log(e, 'error')
                    this.setState({ loader: false })
                });
            return data
        })
            .catch((err) => {
                this.setState({ loader: false })
                console.log(err.message)
            })


    }

    downloadFile = async (data) => {
        try {

            if (Platform.OS == 'android') {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log(data, 'this is download dasta')
                    this.actualDownload(data);
                } else {
                    Alert.alert(texts[this.props.lang].permissionDenied, texts[this.props.lang].youNeedToGiveStoragePer);
                }
            }
            else {
                this.actualDownload(data);
            }

        } catch (err) {
            console.warn(err);
        }
    }
    render() {
        const { buttonText, loader } = this.state
        const { lang } = this.props
        console.log(buttonText,"butttontext")
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white' }} >
                {loader ? <View style={{ position: "absolute", zIndex: 99, justifyContent: 'center', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <ActivityIndicator size="large" color="black" />
                </View> : null
                }
                <Header back quizGoBack logoutvisible navigation={this.props.navigation} />

                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 22,fontFamily:"Quicksand-Bold"}}>Resources</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' ,fontFamily:"Quicksand-Medium",letterSpacing:4}}>
                        {/* 學 習 資 源 */}
                        {texts[lang].learningResources}
                        </Text>
                    {/* Learning Resources */}
                </View>
                {
                    buttonText.map((data, index) => {
                        return (
                            <TouchableOpacity 
                            onPress={() => this.downloadFile(data)} key={index} 
                            style={{ padding: 14, marginTop: 15, borderRadius: 7,
                            shadowOpacity:0.4,
                            shadowRadius:3,
                            elevation:4,
                            shadowOffset:{height:0,width:0},
                            shadowColor:'grey',
                             width: '77%', backgroundColor: '#2CBCEE', alignSelf: 'center', 
                             justifyContent: 'center' }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '800',fontFamily:"Quicksand-Medium" }}>{data}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
    <Toast  
                     ref='toast'
                    style={{backgroundColor:'#DCDCDC',width:'80%'}}
                    position='bottom'
                    positionValue={140}
                    fadeInDuration={750}
                    fadeOutDuration={2000}
                    opacity={0.8}
                    textStyle={{color:'black',textAlign:'center'}}/>
            </View >
        );
    }
}

function mapStateToProps(state) {
    return ({
      lang:state.User.languageCode.languageCode
    })
  }

  export default connect(mapStateToProps, null)(Resources);
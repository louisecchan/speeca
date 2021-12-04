class LoginAction{
    static GET_LOGIN="GET_LOGIN"
    static GET_LOGOUT="GET_LOGOUT"
    static GET_AUDIO="GET_AUDIO"
    static getLogin(data){
        return{
            type:this.GET_LOGIN,   
            data   
        }
    }
    static getLogout(data){
        return{
            type:this.GET_LOGOUT,   
            data   
        }
    }
    static getAudio(audio){
        return{
            type:this.GET_AUDIO,   
            audio   
        }
    }
}

export default LoginAction;
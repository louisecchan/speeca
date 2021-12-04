import LoginAction from '../Actions/LoginAction';
function User(
  state = {
    User: 'USER_ONE',
    data: null,
    audio: null,
    languageCode:'cn'
  },
  action,
) {
  switch (action.type) {
    case LoginAction.GET_LOGIN:
      return {
        ...state,
        data: action.data,
      };
    case LoginAction.GET_LOGOUT:
      return {
        ...state,
        data: null,
      };
    case LoginAction.GET_AUDIO:
      return {
        ...state,
        audio: action.audio,
      };
    case 'SET_COUNTRY':
      return {
        ...state,
        languageCode: action.payload,
      };
    default:
      return state;
  }
}
export default User;

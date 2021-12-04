
import TodoAction from '../Actions/todoActions'
function Todo(state={
    Todo:"TODO_ONE",

    isError:false,
    errorMessage:"",
    successMessage:"",
    todo:[]
    } ,action){

    switch(action.type){
    
        case TodoAction.GET_TODO : 

            return{
                ...state,
                text:'TODO_ADDED',
                isLoading:"gettodo_loading"  
            }
        case TodoAction.GET_TODO_SUCCESSFUL :
            return{
                ...state,
                isLoading:"get_successful loding" ,
                todo:action.data 
            }
            default:
                return  state;           
    }
}
export default Todo;
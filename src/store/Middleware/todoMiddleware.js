// import TodoAction from "../Actions/todoActions";
// class TodoMiddleware{
//     static getTodo(data){
//         return(dispatch)=>{
//             dispatch(TodoAction.getTodo()) // fetch hony sy phly loder chlado
//             fetch('https://jsonplaceholder.typicode.com/todos/1')
//             .then(response => response.json())
//             .then(json => {
//                 console.log(json,'api is working')
//                 console.log("todoaction",TodoAction)
//                 dispatch(TodoAction.getTodoSuccessfull({todos:json})) //json ko data me dal rhy or ye data action k parameter me hy
//             })
//         }
      
//     }
// }
// export default TodoMiddleware;
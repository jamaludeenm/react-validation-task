export const IntialState={
    inputarr:[],
};


export const StateReducer=(state,action)=>{
console.log('action',action)
    switch(action.type){
        case"Addtask":{
            return{
                inputarr:action.payload,
            };
        }
        case "handledelete":  {
            return{
                ...state,
                inputarr: state.inputarr.filter((ind)=>ind.id!==action.payload)
            }
        } case "handlecomplete":{
            return{
                ...state,
                inputarr:state.inputarr.map((info) =>{
                    if(action.payload.id === info.id) {
                        return {...info,completed: !info.completed}
                    }
                    return info;
                })
            }

        }case "updatetask":{
          
           return{
             inputarr: [...state.inputarr.filter((upd)=>upd.id !== action.payload.id),action.payload]
           }

        }
        default :
        return state; 
    }
}


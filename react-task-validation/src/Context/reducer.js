export const IntialState={
    inputarr:[],
};


export const StateReducer=(state,action)=>{
console.log('action',action)
    switch(action.type){
        case"setInputarr":{
            return{
                inputarr:action.payload,
            };
        }
        case "handledelete":  {
            return{
                ...state,
                inputarr: state.inputarr.filter((info)=>info.id!==action.payload)
            }
        } 
        default :
        return state; 
    }
    
    // if(action.type === 'setInputarr'){
        // return{
        //     inputarr:action.payload,
        // }
    // }
    // return state;
}
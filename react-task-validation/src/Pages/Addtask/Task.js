import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./Task.css";
import { StateContext } from '../../Context/StateContext';
import { v4 as uuidv4 } from "uuid";

function Task() {
    const { state, dispatch } = useContext(StateContext);
    const navigate = useNavigate();
    console.log('statestate', state)
    const [param] = useSearchParams();

    const id = param.get("id");
    console.log(id)
    let getid = state.inputarr.findIndex(info => info.id === id);
    console.log(getid);
    // const [inputarr, setInputarr] = useState([]);
    // const [inputdata, setInputdata] = useState({
    //     TaskName: state.inputarr[getid]?.TaskName,
    //     Description: state.inputarr[getid]?.Description
    // });
    const[TaskName,settaskname]=useState(state.inputarr[getid]?.title || "");
    const[Description,setdescription]=useState(state.inputarr[getid]?.describe || "")




    function changehandle(value) {
        if(value.target.name === 'TaskName'){
            settaskname(value.target.value);
    }
    else if(value.target.name === 'Description'){
        setdescription(value.target.value);
    }
    }
    // let { TaskName, Description } = inputdata;
    function changhandle(value) {
       
       value.preventDefault();
        if(id){
            const data={
                id:id,
               title:TaskName,
               describe:Description,
            };
            settaskname("");
            setdescription("");
            dispatch({type:"updatetask", payload : data});
            navigate('/Home')
        }
        else{
            const data={
                id:uuidv4(),
                title:TaskName,
               describe:Description,

    
            };
            settaskname("");
            setdescription("");
            dispatch({ type: 'Addtask', payload:[...state.inputarr,data]});
            navigate("/Home");
            console.log(data);
           
           
        }
    }
    return (
        <div className='task'>

            <input type="text" autoComplete='off' name='TaskName' value={TaskName} className="input" onChange={changehandle} placeholder="Enter Task Name" />
            <textarea type="text" autoComplete='off' name='Description' value={Description} className="input" onChange={changehandle} placeholder=" Description" />
            <button onClick={changhandle}>Add task</button>

        </div>
    )
}

export default Task


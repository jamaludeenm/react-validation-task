import React, { useContext, useState } from 'react';
import { useNavigate,useSearchParams} from 'react-router-dom';
import "./Task.css";
import { StateContext } from '../../Context/StateContext';
import { v4 as uuidv4 } from "uuid";

function Task () {
    const { state, dispatch } = useContext(StateContext);
    const navigate = useNavigate();
    console.log('statestate', state)
    const [inputarr, setInputarr] = useState([]);
    const [inputdata, setInputdata] = useState({ TaskName: "", Description: "" });
    const [param] = useSearchParams();
    const id =param.get("id");
    console.log(id);
   
    let getid =state.inputarr.findIndex(info=>info.id===id);
    console.log(getid);
    function changehandle(e) {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })
    }
    let { TaskName, Description } = inputdata;
    function changhandle() {
            dispatch({ type: 'setInputarr', payload: [...state.inputarr, { id: uuidv4(), TaskName, Description, completed: false }] });
            navigate("/Home");
            console.log(inputarr);
            console.log(inputdata);
            setInputdata({ TaskName: "", Description: "" })
    }
    return (
        <div className='task'>

            <input type="text" autoComplete='off' name='TaskName' value={inputdata.TaskName} className="input" onChange={changehandle} placeholder="Enter Task Name" />
            <textarea type="text" autoComplete='off' name='Description' value={inputdata.Description} className="input" onChange={changehandle} placeholder=" Description" />
            <button onClick={changhandle}>Add task</button>

        </div>
    )
}

export default Task


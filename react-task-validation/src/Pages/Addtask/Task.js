import React, { useContext, useState } from 'react';
import { Form, useNavigate, useSearchParams } from 'react-router-dom';
import "./Task.scss";
import { StateContext } from '../../Context/StateContext';
import { v4 as uuidv4 } from "uuid";
import { Button,Checkbox,FormControlLabel } from "@mui/material";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {Favorite,FavoriteBorder} from "@mui/icons-material"

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
    const [TaskName, settaskname] = useState(state.inputarr[getid]?.title || "");
    const [Description, setdescription] = useState(state.inputarr[getid]?.describe || "")
    const [selectedDate, setselectedDate] = useState(state.inputarr[getid]?.date || "")
    const [completed,setCompleted]= useState(false)
    const [priortize,setPriortize]=useState(false);




    function changehandle(value) {
        if (value.target.name === 'TaskName') {
            settaskname(value.target.value);
        }
        else if (value.target.name === 'Description') {
            setdescription(value.target.value);
        } else if (value.target.name === 'selectedDate') {
            setselectedDate(value.target.value);}
        
    }
    // let { TaskName, Description } = inputdata;
    function changhandle(value) {

        value.preventDefault();
        if (id) {
            const data = {
                id: id,
                title: TaskName,
                describe: Description,
                date: selectedDate,
                completed:completed,
                priority:priortize,
            };
            settaskname("");
            setdescription("");
            setselectedDate("");
            setCompleted("");
            setPriortize("");
            dispatch({ type: "updatetask", payload: data });
            navigate('/Home')
        }
        else {
            const data = {
                id: uuidv4(),
                title: TaskName,
                describe: Description,
                date: selectedDate,
                completed:completed,
                priority:priortize,


            };
            settaskname("");
            setdescription("");
            setselectedDate("");
            setCompleted("");
            setPriortize("")
            dispatch({ type: 'Addtask', payload: [...state.inputarr, data] });
            navigate("/Home");
            console.log(data);
        }

    }
    return (
        <div className='task'>
            <ValidatorForm>
                <h2 style={{ marginBottom: "20px" }}>Adding Form</h2>
                <TextValidator
                    label="TaskName"
                    type="text"
                    onChange={changehandle}
                    name='TaskName'
                    value={TaskName}
                    autoComplete='off'
                />
                <br />
                <TextValidator
                    label="Description"
                    type="text"
                    onChange={changehandle}
                    name='Description'
                    value={Description}
                    autoComplete='off'
                />
                <br />
                <TextValidator
                  style={{marginBottom:"-12px",width:"100%"}}
                    type="date"
                    onChange={changehandle}
                    name='selectedDate'
                    value={selectedDate}
                    autoComplete='off'
                />
                <br />
                <FormControlLabel style={{paddingLeft:"5px"}} control={<Checkbox checked={priortize} onChange={() => setPriortize(!priortize)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                label="Prioritize"/>
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={changhandle}
                // disabled={submitted}
                >
                    Add Task
                </Button>
            </ValidatorForm>
           
        </div>
    )
}

export default Task


import React, { useContext, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../Home/logo.png'
import "./Task.scss";
import { StateContext } from '../../Context/StateContext';
import { v4 as uuidv4 } from "uuid";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    const [completed, setCompleted] = useState(false)
    const [priortize, setPriortize] = useState(false);




    function changehandle(value) {
        if (value.target.name === 'TaskName') {
            settaskname(value.target.value);
        }
        else if (value.target.name === 'Description') {
            setdescription(value.target.value);
        } else if (value.target.name === 'selectedDate') {
            setselectedDate(value.target.value);
        }

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
                completed: completed,
                priority: priortize,
            };
            settaskname("");
            setdescription("");
            setselectedDate("");
            setCompleted("");
            setPriortize("");
            dispatch({ type: "updatetask", payload: data });
            toast.success('Edited Succesfully', {
                icon:"⏫",
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            // navigate('/Home');
        }
        else {
            const data = {
                id: uuidv4(),
                title: TaskName,
                describe: Description,
                date: selectedDate,
                completed: completed,
                priority: priortize,


            };
            settaskname("");
            setdescription("");
            setselectedDate("");
            setCompleted("");
            setPriortize("")
            dispatch({ type: 'Addtask', payload: [...state.inputarr, data] });
                toast.success(' Task added succesfully', {
                    icon: "✅",
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            console.log(data);
        }

    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
                <div className="container-fluid">
                    <span class="navbar-brand p-0">
                        <img src={logo} height="48" alt="Gpmuthu" />
                    </span>
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav ">
                          <Link class="nav-item nav-link me-5" to={"/Home"}> Home </Link>
                            <span class="nav-item nav-link active me-5 ms-5">Add Task</span>
                            
                        </div>
                    </div>
                </div>
            </nav>
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
                        style={{ marginBottom: "-12px", width: "100%" }}
                        type="date"
                        onChange={changehandle}
                        name='selectedDate'
                        value={selectedDate}
                        autoComplete='off'
                    />
                    <br />
                    <FormControlLabel style={{ paddingLeft: "5px" }} control={<Checkbox checked={priortize} onChange={() => setPriortize(!priortize)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                        label="Prioritize" />
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
            <ToastContainer/>
        </div>
    )
}

export default Task


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import "./Home.css"
import { StateContext } from '../../Context/StateContext';
import { useNavigate,createSearchParams } from 'react-router-dom';

const Home = ({inputarr,setInputarr}) => {

    const navigate = useNavigate();
    const { state,dispatch } = useContext(StateContext);
    console.log(state);

    const handledelete = ({id}) =>{
        dispatch({type:"handledelete",payload:id})
        console.log(id);
    };

    const handlecomplete = (id) =>{
        dispatch({type:"handlecomplete",payload:id})
        console.log(id)
    }

    const handleedit =  ({id}) =>{
        navigate({
            pathname:"/Task",
            search:createSearchParams({
              id:id,
            }).toString()
          }) 

    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light p-0">
                <div class="container-fluid">
                    <span class="navbar-brand p-0">
                        <img src={logo} height="48" alt="Gpmuthu" />
                    </span>
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav ">
                            <span class="nav-item nav-link active me-5 ms-5">Home</span>
                            <Link class="nav-item nav-link me-5" to={"/Task"}> Add task </Link>

                            <span class="nav-item nav-link me-5">Messages</span>
                            <span class="nav-item nav-link me-5 ">Reports</span>
                        </div>

                    </div>
                </div>
            </nav>
            <table style={{ marginTop: "30px" }} border={1} width="30%" cellPadding={10}>
                <tbody>
                    <tr>
                        <th>TaskName</th>
                        <th>Description</th>
                    </tr>
                    {
                        state.inputarr?.map(
                            (item,info) => {
                                return (
                                    <tr key={info.id}>
                                        <td>{item.title}</td>
                                        <td>{item.describe}</td>
                                        <td>
                                            <input type="checkbox" checked={item.completed} onClick={() =>handlecomplete(item) } className="button-complete task-button p-1 " style={{borderRadius:"3px"}}/>
                                        </td>
                                        <td>
                                            <button onClick={() =>handleedit(item) } className='button-edit task-button p-1' style={{borderRadius:"3px"}}>
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() =>handledelete(item) } className='button-delete task-button p-1' style={{borderRadius:"3px"}}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Home



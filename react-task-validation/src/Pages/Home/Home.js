import React, { useContext, useState } from 'react';
import logo from './logo.png';
import "./Home.scss"
import { StateContext } from '../../Context/StateContext';
import { useNavigate, createSearchParams, Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { TableContainer, Table, TableBody, TableCell, Paper, TableRow, TableHead, Checkbox, Button } from '@mui/material';

const Home = () => {

    const navigate = useNavigate();
    const { state, dispatch } = useContext(StateContext);
    const [logout, setLogout] = useState(false);
    const [order, setOrder] = useState("ASC")
    console.log(state);


    const handledelete = ({ id }) => {
        dispatch({ type: "handledelete", payload: id })
        console.log(id);
    };

    const handlecomplete = (item) => {
        dispatch({ type: "handlecomplete", payload: item })
        console.log(item)
    }

    const handleedit = ({ id }) => {
        navigate({
            pathname: "/Task",
            search: createSearchParams({
                id: id,
            }).toString()
        })

    }
    React.useEffect(() => {
        if (!localStorage.getItem('auth')) navigate('/')
    }, [logout]);

    const logouthandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('auth');
        setLogout(true);
    }

    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...state.inputarr].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            console.log('sort', sorted)
            dispatch({ type: "sorting", payload: sorted });
            setOrder("DSC");
        } if (order === "DSC") {
            const sorted = [...state.inputarr].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            console.log('sort', sorted)
            dispatch({ type: "sorting", payload: sorted });
            setOrder("ASC");
        }

    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
                <div className="container-fluid">
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
                        </div>
                    </div>
                </div>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <button class="nav-item mr-3 nav-link p-3" onClick={logouthandler} href="{% url 'logout' %}" style={{ backgroundColor: '#e85c29' }}>Logout</button >
            </nav>
            {/* <table style={{ marginTop: "30px" }} border={1} width="30%" cellPadding={10}>
                <tbody>
                    <tr>
                        <th>TaskName</th>
                        <th>Description</th>
                    </tr>
                    {
                        state.inputarr?.map(
                            (item, info) => {
                                return (
                                    <tr key={info.id}>
                                        <td>{item.title}</td>
                                        <td>{item.describe}</td>
                                        <td>
                                            <input type="checkbox" checked={item.completed} onClick={() => handlecomplete(item)} className="button-complete task-button p-1 " style={{ borderRadius: "3px" }} />
                                        </td>
                                        <td>
                                            <button onClick={() => handleedit(item)} className='button-edit task-button p-1' style={{ borderRadius: "3px" }}>
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => handledelete(item)} className='button-delete task-button p-1' style={{ borderRadius: "3px" }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table> */}
            <TableContainer component={Paper} style={{ marginTop: "30px" }}>
                <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => sorting("title")}><b>TaskName</b></TableCell>
                            <TableCell onClick={() => sorting("describe")}><b>Description</b></TableCell>
                            <TableCell onClick={() => sorting("date")}><b>Date</b></TableCell>
                            <TableCell ><b>priority</b></TableCell>
                            <TableCell ><b>Completed</b></TableCell>
                            <TableCell ><b>Edit</b></TableCell>
                            <TableCell ><b>Delete</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.inputarr?.map((item, info) => (
                            <TableRow key={info.id}>
                                <TableCell component="th" scope="row">
                                    {item.title}
                                </TableCell>
                                <TableCell >{item.describe}</TableCell>
                                <TableCell >{item.date}</TableCell>
                                <TableCell>{item.priority ? <Favorite style={{ color: "#e10000" }} /> : <FavoriteBorder />}</TableCell>
                                <TableCell ><Checkbox
                                    checked={item.completed}
                                    onClick={() => handlecomplete(item)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                /></TableCell>
                                <TableCell><Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    onClick={() => handleedit(item)}
                                >
                                    Edit
                                </Button></TableCell>
                                <TableCell><Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    onClick={() => handledelete(item)}
                                >Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Home



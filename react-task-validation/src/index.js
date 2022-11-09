import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Pages/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReducer } from 'react';
import Home from './Pages/Home/Home';
import Task from './Pages/Addtask/Task';
import { StateContext } from './Context/StateContext';
import { IntialState, StateReducer } from './Context/reducer';

function Routercomponent() {
const [state,dispatch] =useReducer(StateReducer,IntialState);
console.log('state',state);
  return (
    <StateContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='Home' element={<Home />}></Route>
          <Route path='Task' element={<Task />}></Route>
          {/* <Route path='Product' element={}></Route>
           <Route path='*' element={<div>Not found</div>}></Route> */}

          <Route></Route>
        </Routes>
      </BrowserRouter>
    </StateContext.Provider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Routercomponent />);



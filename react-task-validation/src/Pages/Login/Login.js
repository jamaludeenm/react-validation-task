import React, { useState,useEffect } from 'react';
import "./Login.scss";
import Keys from './credentials.json';
import { useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {

  const [username, setusername] = useState('');
  const [password, setpwd] = useState('');
  const [error, seterror] = useState("");
   const navigate = useNavigate();
  const gotoHome = () => {
    navigate("Home");
  }


  const handleInputChange = (e) => {
    if (e.target.value === "") {
      seterror("Inavlid");
    } else { seterror(""); }
    if (e.target.name === 'username') {
      setusername(e.target.value);
    } else {
      setpwd(e.target.value);
    }
  }
  useEffect(() =>{
    if(localStorage.getItem('auth'))  navigate('Home')
    },[]);
     
  const handleSubmit = (e) => {
    e.preventDefault();

    Keys.find((item) => {
      
      if (item.username === username && item.password === password) {
        localStorage.setItem('auth',true)
         return gotoHome();
      } else if (item.username !== username || item.password !== password) {
        return seterror("username or password is wrong");
      } else if (item.username === '' || item.password === '') {
        return seterror("Invalid");
      }
      else {
        return seterror("");
      }
    });

  }

    return (

      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-content">
            <h3 className="form-title">Log In</h3>
            <div className="form-group mt-3">
              <label>username</label>
              <input
                type="text" name="username" onChange={handleInputChange}
                className="form-control mt-1"
                placeholder="Enter username"
                autoComplete="off"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password" name="password" onChange={handleInputChange}
                className="form-control mt-1"
                placeholder="Enter password"
                autoComplete="off"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <input type="submit" className="btn btn-primary"
              />
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="##">password?</a>
            </p>
          </div>
          <h2>{error}</h2>
        </form><br />
      </div>
    )
  }
  export default Login

import React, {useState} from 'react';
import logoImg from "@assets/imgs/logo/logo.png";
import {Link, useNavigate} from 'react-router-dom';
import { Switch } from 'antd';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const IDSave = (checked : boolean) => {
    console.log(checked);
  }

  const Login = () => {
    navigate('/home');
  }

  return(
    <>
      <div className="form-header">
        <img src={logoImg} alt="로고" />
        <h2>Sign in</h2>
        <span>Welcome to Kams</span>
      </div>
      <div className="form-body">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="on" placeholder="password"/>
        <div className="switch">
          <Switch
            onChange={IDSave}
          />Save ID
        </div>
        <button className="login-btn" onClick={Login}>Login</button>
      </div>
      <div className="form-footer">
        Need an account? <Link to="/join">Sign up here</Link>
      </div>
    </>
  )
}

export default Login;
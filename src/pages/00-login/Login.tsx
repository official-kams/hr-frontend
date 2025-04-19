import React, {useState} from 'react';
import logoImg from "@assets/imgs/logo/logo.png";
import {Link, useNavigate} from 'react-router-dom';
import { Switch } from 'antd';
import {
  validateEmail,
  validatePassword,
} from "@utils/regex";
import * as gateway from "@components/gateway/Gateway";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwVisible, setPwVisible] = useState(false);

  const IDSave = (checked : boolean) => {
    console.log(checked);
  }

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const Login = async () => {
    const newErrors: typeof errors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(email)){
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    } else if (!password) {
      newErrors.password = "비밀번호를 입력해 주세요.";
    } else if (!validatePassword(password)) {
      newErrors.password = "문자, 숫자, 특수문자 중 2가지 이상을 입력해야 합니다.";
    }

    setErrors(newErrors);

    // 모든 항목이 통과했는지 확인
    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (!hasError) {
      // 로그인 로직
      const payload = {
        userEmail: email,
        password: password,
      }

      try {
        const response = await gateway.post("/auth/login", payload);

        if (response.status === 200) {
          if (response.data.code === "0000") {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            navigate('/home');
          } else if (response.data.code === "9998") {
            alert("아이디와 비밀번호를 확인 해주세요.");
          }
        }
      } catch (e) {
        console.error(e);
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  }

  const pwToggle = () => {
    setPwVisible((prev) => !prev);
  }

  return(
    <>
      <div className="form-header">
        <img src={logoImg} alt="로고" />
        <h2>Sign in</h2>
        <span>Welcome to Kams</span>
      </div>
      <div className="form-body">
        <div className="form-control">
          <input value={email} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && <span className="invalid-text">{errors.email}</span>}
        </div>
        <div className="form-control">
          <div className="input-box">
            <input value={password} type={pwVisible ? "text" : "password"}
                   onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={pwToggle} className={!pwVisible ? "show" : "hide"}/>
          </div>
          {errors.password && <span className="invalid-text">{errors.password}</span>}
        </div>
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
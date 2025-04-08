import React, { useState, useEffect } from 'react';
import logoImg from "@assets/imgs/logo/logo.png";
import { Link } from 'react-router-dom';
import {
  validateEmail,
  validatePhoneNumber,
  formatPhoneNumber,
  validatePassword,
  validatePasswordMatch
} from "@utils/regex";

const Join = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [pwVisible, setPwVisible] = useState(false);
  const [pwVisible2, setPwVisible2] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    password2: ""
  });

  const SignUp = () => {
    const newErrors: typeof errors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      password2: ""
    };

    if (!firstName) {
      newErrors.firstName = "이름을 입력해 주세요.";
    } else if (!lastName) {
      newErrors.lastName = "성을 입력해 주세요.";
    } else if (!phoneNumber) {
      newErrors.phoneNumber = "휴대전화번호를 입력해 주세요.";
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "올바른 휴대전화 형식이 아닙니다.";
    } else if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(email)){
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    } else if (!password) {
      newErrors.password = "비밀번호를 입력해 주세요.";
    } else if (!validatePassword(password)) {
      newErrors.password = "문자, 숫자, 특수문자 중 2가지 이상을 입력해야 합니다.";
    } else if (!password2) {
      newErrors.password2 = "비밀번호 검증을 입력해 주세요.";
    } else if (!validatePasswordMatch(password, password2)) {
      newErrors.password2 = "비밀번호와 입력된 비밀번호가 일치하지 않습니다.";
    } else if (password !== password2) {
      newErrors.password2 = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);

    // 모든 항목이 통과했는지 확인
    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (!hasError) {
      // 회원가입 처리 로직

    }
  }

  const handlePhoneNumberChange = (e : any) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setPhoneNumber(rawValue.slice(0, 11));
  };

  const pwToggle = () => {
    setPwVisible((prev) => !prev);
  }

  const pwToggle2 = () => {
    setPwVisible2((prev) => !prev);
  }

  return(
    <>
      <div className="form-header">
        <img src={logoImg} alt="로고" />
        <h2>Get Started</h2>
        <span>Let's create your account</span>
      </div>
      <div className="form-body">
        <div className="flex">
          <div className="form-control">
            <label className="required">First Name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            {errors.firstName && <span className="invalid-text">{errors.firstName}</span>}
          </div>
          <div className="form-control">
            <label className="required">Last Name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            {errors.lastName && <span className="invalid-text">{errors.lastName}</span>}
          </div>
        </div>
        <div className="form-control">
          <label className="required">Phone Number</label>
          <input value={formatPhoneNumber(phoneNumber)} onChange={handlePhoneNumberChange}/>
          {errors.phoneNumber && <span className="invalid-text">{errors.phoneNumber}</span>}
        </div>
        <div className="form-control">
          <label className="required">E-mail</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && <span className="invalid-text">{errors.email}</span>}
        </div>
        <div className="form-control">
          <label className="required">Password</label>
          <div className="input-box">
            <input value={password} type={pwVisible ? "text" : "password"} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={pwToggle} className={!pwVisible ? "show" : "hide"}/>
          </div>
          {errors.password && <span className="invalid-text">{errors.password}</span>}
        </div>
        <div className="form-control">
          <label className="required">Re-confirm Password</label>
          <div className="input-box">
            <input value={password2} type={pwVisible2 ? "text" : "password"} onChange={(e) => setPassword2(e.target.value)}/>
            <button onClick={pwToggle2} className={!pwVisible2 ? "show" : "hide"}/>
          </div>
          {errors.password2 && <span className="invalid-text">{errors.password2}</span>}
        </div>
        <button className="login-btn" onClick={SignUp}>Sign up</button>
      </div>
      <div className="form-footer">
        Already have an account? <Link to="/">Log in</Link>
      </div>
    </>
  )
}

export default Join;
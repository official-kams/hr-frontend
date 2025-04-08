import React from "react";

interface CustomInputProps {
  id: string;
  placeholder?: string;
  label?: string;
  required? : boolean;
  type? : string ;
}

export default function CustomInput({ placeholder, id, label, required, type } : CustomInputProps){
  return(
    <>
      <div className={`custom-input ${required ? "required" : ""}`}>
        <label htmlFor={id}>{label}</label>
        <input placeholder={placeholder} id={id} type={type}/>
      </div>
    </>
  )
}
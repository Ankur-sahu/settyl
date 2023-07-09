import React from "react";

const Input = ({ type, value, onChange, name, label, errMsg, required, placeholder }) => {
    return (
        
            <div className="input-container">
                {label && <div>
                    <label htmlFor={name}>{label} {required && <sup>*</sup>}</label>
                </div>}
                <input
                    className={errMsg ? 'error-box' : 'input-field'}
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                <div>{errMsg && <div className="error-msg">{errMsg}</div>}</div>
            </div>
        
    )
}

export default Input;
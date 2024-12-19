import React, { useRef, useEffect } from "react";


const InputWithLabel = ({ id, value, onInputChange, children, type, placeholder, name }) => {
    const inputRef = useRef(null);
    useEffect(() => {
      inputRef.current?.focus();
    });
    return <>  
    <label htmlFor={id}>{children}</label>
    <input id={id} value={value} onChange={onInputChange} type={type} placeholder={placeholder} name={name} ref={inputRef} />    
  </>
};

export default InputWithLabel;

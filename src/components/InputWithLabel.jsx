import React, { useRef, useEffect } from "react";

const InputWithLabel = ({ id, value, onInputChange, type, placeholder, name, label, disabled }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        value={value}
        onChange={onInputChange}
        type={type}
        placeholder={placeholder}
        name={name}
        ref={inputRef}
        disabled={disabled}
      />
    </>
  );
};

export default InputWithLabel;
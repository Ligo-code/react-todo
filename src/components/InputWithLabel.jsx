import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

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

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputWithLabel;
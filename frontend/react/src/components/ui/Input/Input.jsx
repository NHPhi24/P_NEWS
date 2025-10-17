import React from 'react';
import './Input.scss';

const Input = ({ 
  label, 
  type = 'text',
  name,
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false,
  disabled = false,
  className = '',
  icon
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-group__label">
          {label}
          {required && <span className="input-group__required">*</span>}
        </label>
      )}
      <div className="input-group__wrapper">
        {icon && <span className="input-group__icon">{icon}</span>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`input-group__input ${error ? 'input-group__input--error' : ''} ${icon ? 'input-group__input--with-icon' : ''}`}
        />
      </div>
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
};

export default Input;
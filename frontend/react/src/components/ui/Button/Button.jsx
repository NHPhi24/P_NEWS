import React from 'react';
import './Button.scss';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  ...props 
}) => {
  const classNames = `btn btn--${variant} btn--${size} ${className} ${
    disabled || loading ? 'btn--disabled' : ''
  }`.trim()

  return (
    <button 
      className={classNames} 
      disabled={disabled || loading} 
      type={type}
      {...props}
    >
      {loading && <span className="btn__spinner"></span>}
      {children}
    </button>
  )
}

export default Button;
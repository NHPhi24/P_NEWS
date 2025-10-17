import React from 'react';
import './Loading.scss';

const Loading = ({ size = 'medium', text = 'Đang tải...' }) => {
  return (
    <div className="loading">
      <div className={`loading__spinner loading__spinner--${size}`}></div>
      {text && <p className="loading__text">{text}</p>}
    </div>
  );
};

export default Loading;

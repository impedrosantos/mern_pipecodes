import React from 'react';

export default function ErrorNotice(props) {
  return <div className="error-notice">
    <span>{props.message}</span>
    <button className="close-btn" onClick={props.clearError}>X</button>
  </div>
}
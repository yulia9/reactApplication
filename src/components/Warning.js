import React from 'react';

export default function Warning(props) {
  return (
    <div>
      <p className="warning"> {props.message} </p>
    </div>
  )
}


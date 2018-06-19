import React from 'react';

export default function Image(props) {
  return (
    <div>
      <img src={props.source}
           width={props.width}
           height={props.height}
           alt={props.title}
           title={props.title}/>
    </div>
  );
}


// @flow
import React from 'react';

type imageProps = {
    source: number;
    width: number;
    height: string;
    title:string;
};

export default function Image(props: imageProps) {
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


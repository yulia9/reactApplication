import React from 'react';

export default function (props) {
  return (
    <header>
      <h2 className="headerTitle"> {props.title} </h2>
      <h4 className="searchTitle"> {props.searchTitle} </h4>
    </header>
  )
}

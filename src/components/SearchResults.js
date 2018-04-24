import React from 'react';

export function SearchResults(props) {
  return (
    <ul className="searchResults"> {props.searchResults.length ? props.searchResults.map(n => 
      <li key={n.id}>
        <h4> { toUpperCase(n.title) } </h4>
        <p> {n.overview} </p>
      </li>) : []} 
    </ul>
  )
}

export function toUpperCase(str) {
  return str.toUpperCase();
}

import React from 'react';

function SearchResults(props) {
  return (
    <ul className="searchResults"> {props.searchResults.length ? props.searchResults.map(n => 
      <li key={n.id}>
        <h4> {n.title} </h4>
        <p> {n.overview} </p>
      </li>) : []} 
    </ul>
  )
}

export default SearchResults;
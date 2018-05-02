import React from 'react';
import { Movie } from './Movie';

export function SearchResults(props) {
  let params = {
    width: 200,
    height: 'auto',
  }
  return (
    <ul className="searchResults"> {props.results.length ? props.results.map(n => 
      <li key={n.id}>
        <Movie data={n} imgParams={params}></Movie>
      </li>) : []} 
    </ul>
  )

  function makeString (arr) {
    return arr.length && arr.length > 1 ? 
      arr.reduce((a,b) => `${a} & ${b}`) :
      (arr.length[0] || '')
  }
}

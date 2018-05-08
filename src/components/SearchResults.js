import React from 'react';
import { Movie } from './Movie';

export function SearchResults(props) {
  let params = {
    width: 200,
    height: 'auto',
  }
  return (
    <ul className="searchResults"> {props.results.length ? props.results.map(n => 
      <li className="movieBlock" key={n.id}>
        <Movie data={n} imgParams={params}></Movie>
      </li>) : []} 
    </ul>
  )
}

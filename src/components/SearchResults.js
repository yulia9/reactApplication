import React from 'react';
import { Movie } from './Movie';
import { Link } from 'react-router-dom';

export function SearchResults(props) {
  let params = {
    width: 200,
    height: 'auto',
  }
  return (
    <ul className="searchResults"> {props.results.length ? props.results.map(n => 
      <Link key={n.id} 
          to={{pathname: `/movie/${n.id}`, state: {movie: n}}}>
        <li className="movieBlock">
          <Movie data={n} imgParams={params}></Movie>
        </li>
      </Link>) : []} 
       { props.children }
    </ul>
  )
}

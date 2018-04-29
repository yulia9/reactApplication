import React from 'react';
import Image from './Image';

export function SearchResults(props) {
  return (
    <ul className="searchResults"> {props.results.length ? props.results.map(n => 
      <li key={n.id}>
        <Image width={230} 
               height={'auto'} 
               source={n.poster_path}
               title={n.title} />
        <h5> { toUpperCase(n.title) } </h5>
        <span className="searchInfo"> rating: <span> {n.vote_count} </span></span>
        <span className="searchInfo"> release date: <span>{n.release_date} </span></span>
        <p>{ makeString(n.genres) }</p>
      </li>) : []} 
    </ul>
  )

  function makeString (arr) {
    return arr.length && arr.length > 1 ? 
      arr.reduce((a,b) => `${a} & ${b}`) :
      (arr.length[0] || '')
  }
  
}

export function toUpperCase(str) {
  return str.toUpperCase();
}

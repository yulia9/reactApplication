import React from 'react';
import { Movie } from './Movie';
import { Link } from 'react-router-dom';
import { store } from '../index';
import { storage } from '../storage';
import { updateData } from '../actions/dataActions';


export function SearchResults(props) {
  const params = {
    width: 200,
    height: 'auto',
  };

  let results = store.getState().dataFetch.data;

  const storageId = props.location && props.location.search ?
    props.location.search.slice(1) : '';

  results = results.length ? results : storage.get(storageId);

  if (results.length) {
    store.dispatch(updateData(results, storageId));
  }

  return (
    <ul className="searchResults"> {results.length ? results.map(n =>
      <Link key={n.id}
          to={{ pathname: `/movie/${n.id}`, state: { movie: n } }}>
        <li className="movieBlock">
          <Movie data={n} imgParams={params}></Movie>
        </li>
      </Link>) : []}
      {props.children}
    </ul>
  );
}

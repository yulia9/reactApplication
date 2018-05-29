import React from 'react';
import { Movie } from './Movie';
import Warning from './Warning';
import { store } from '../index';
import { SearchResults } from './SearchResults';


export default function(props) {
  let params = {
    width: 400,
    height: 'auto',
  };

  function showResults() {
      if (store.getState().dataFetch.length > 0) {
          return (
              <SearchResults results={store.getState().dataFetch[store.getState().dataFetch.length-1].data}/>
          )
      }
  }

  if (props.location.state && props.location.state.movie) {
    return (
      <div>
        <Movie description={props.location.state.movie.overview} data={props.location.state.movie} imgParams={params}/>
        <hr/>
        {showResults()}
      </div>
    )
  } else {
    return (
      <Warning message='Nothing was found'/>
    )
  }
  
}
import React from 'react';
import { Movie } from './Movie';
import Warning from './Warning';
import { store } from '../index';
import { Link } from 'react-router-dom';
import { SearchResults } from './SearchResults';
import { updateData } from '../actions/dataActions';


export default function(props) {
  let params = {
    width: 400,
    height: 'auto',
  };

  function updateStore(arr) {
    store.dispatch(updateData(arr));
  }

  if (props.location.state && props.location.state.movie) {
    return (
      <div>
        <Link to={{pathname: `/`}}>
          <button onClick={updateStore([])} className="filmPageSearch btn btn-danger"> SEARCH </button>
        </Link>
        <Movie description={props.location.state.movie.overview} data={props.location.state.movie} imgParams={params}/>
        <hr/>
        <SearchResults/>
      </div>
    )
  } else {
    return (
      <Warning message='Nothing was found'/>
    )
  }
  
}
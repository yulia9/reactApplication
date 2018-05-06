import React from 'react';

export default function ResultsCount(props) {
  return props.count ?
	(<div>
      <p> <span className="moviesCount"> {props.count} </span> movies found </p>
    </div>) :
  	(<div>
      <p className="noFilms"> No films found </p>
    </div>)
}

import React from 'react';
import Image from './Image';

export function Movie({imgParams, data, description}) {
  return (
    <div>
      <Image width={imgParams.width}
             height={imgParams.height}
             source={data.poster_path}
             title={data.title}/>
      <h5> {data.title} </h5>
      <span className="searchInfo"> rating: <span> {data.vote_count} </span></span>
      <span className="searchInfo"> release date: <span>{data.release_date} </span></span>
      <p>{makeString(data.genres)}</p>
      <p> {description} </p>
    </div>
  )

  function makeString(arr) {
    return arr.length && arr.length > 1 ?
        arr.reduce((a, b) => `${a} & ${b}`) :
        (arr.length[0] || '')
  }
}

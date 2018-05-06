import React from 'react';
import Image from './Image';

export function Movie(props) {
    return (
        <div>
            <Image width={props.imgParams.width}
                   height={props.imgParams.height}
                   source={props.data.poster_path}
                   title={props.data.title}/>
            <h5> {toUpperCase(props.data.title)} </h5>
            <span className="searchInfo"> rating: <span> {props.data.vote_count} </span></span>
            <span className="searchInfo"> release date: <span>{props.data.release_date} </span></span>
            <p>{makeString(props.data.genres)}</p>
        </div>
    )

    function makeString(arr) {
        return arr.length && arr.length > 1 ?
            arr.reduce((a, b) => `${a} & ${b}`) :
            (arr.length[0] || '')
    }

}

export function toUpperCase(str) {
    return str.toUpperCase();
}

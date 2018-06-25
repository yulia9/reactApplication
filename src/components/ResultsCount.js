// @flow
import React from 'react';
import jss from 'jss';
import injectSheet from 'react-jss';

import { createSelector } from 'reselect';

const styles = {
  moviesCount: {
    color: '#d9534f',
    fontSize: '16px'
  },
  noFilms: {
    textAlign: 'center',
    color: '#555',
    fontWeight: 'light',
    fontSize: '16px'
  }
};

type resultProps = {
  count: number
};

function countValue (count) {
  createSelector(() => count,
   count => count
  )
}

const ResultsCount = function ResultsCount(props: resultProps) {
  return countValue(props.count) ?
    (<div>
      <p> <span className={props.classes.moviesCount}> {props.count} </span> movies found </p>
    </div>) :
    (<div>
      <p className={props.classes.noFilms}> No films found </p>
    </div>);
}

export default injectSheet(styles)(ResultsCount);

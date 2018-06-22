import React from 'react';
import { Link } from 'react-router-dom';
import jss from 'jss';
import injectSheet from 'react-jss';

const styles = {
  filmPageSearch: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  }
};

const PageNotFound = function ({classes}) {
  return (
    <div>
      <h4> 404 : Page not found </h4>
        <Link to={{ pathname: '/' }}>
          <button className={classes.filmPageSearch}> SEARCH </button>
        </Link>
    </div>
  );
}

export default injectSheet(styles)(PageNotFound);
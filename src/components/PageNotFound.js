import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div>
      <h4> 404 : Page not found </h4>
        <Link to={{ pathname: '/' }}>
          <button className="filmPageSearch btn btn-danger"> SEARCH </button>
        </Link>
    </div>
  );
}

import React from 'react';
import { Movie } from './Movie';
import Warning from './Warning';
import { store } from '../index';
import { Link } from 'react-router-dom';
import { SearchResults } from './SearchResults';
import { updateData } from '../actions/dataActions';
import { fetchData } from '../actions/fetchActions';

let urlForMovieRequest = "http://react-cdp-api.herokuapp.com";
let params = {
  width: 500,
  height: 'auto',
}

export default class FilmPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {movie: ''}
  }

  componentDidMount() {
    let component = this;
    store.dispatch(fetchData(urlForMovieRequest + component.props.location.pathname, true))
    .then(function() {
      let movie = store.getState().dataFetch.movie ? store.getState().dataFetch.movie : this.state.movie;
      component.setState({movie: movie}); 
    })
  }

  render() {
    return this.state.movie && this.state.movie.id ? 
      (<div>
        <Link to={{pathname: `/`}}>
          <button onClick={updateStore} className="filmPageSearch btn btn-danger"> SEARCH </button>
        </Link>
        <Movie description={this.state.movie.overview} data={this.state.movie} imgParams={params}/>
        <hr/>
        <SearchResults/>
      </div>
    ) : <Warning message='Nothing was found'/>
  }
}

function updateStore() {
  store.dispatch(updateData([]));
}
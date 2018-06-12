import React from 'react';
import { Movie } from './Movie';
import Warning from './Warning';
import { store } from '../index';
import { Link } from 'react-router-dom';
import { SearchResults } from './SearchResults';
import { updateData, updateMovie } from '../actions/dataActions';
import { fetchData } from '../actions/fetchActions';

let urlForMovieRequest = "http://react-cdp-api.herokuapp.com/movies/";
let params = {
  width: 500,
  height: 'auto',
}

export default class FilmPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { movie: this.getMovie()};
    this.url = urlForMovieRequest + this.props.match.params.id;
  }

  static fetchRequest(dispatch, match) {
    return dispatch(fetchData(urlForMovieRequest + match.params.id, true))
  }

  componentDidMount() {
    let component = this;
    store.dispatch(fetchData(component.url, true))
    .then(function() {
      let movie =  store.getState().dataFetch ? store.getState().dataFetch.movie : this.state.movie;
      component.setState({movie: movie}); 

      store.dispatch(updateMovie(''));
    })
  }

  getMovie() {
    return this.props.staticContext && this.props.staticContext.dataFetch ? 
      this.props.staticContext.dataFetch.movie : store.getState().dataFetch.movie
  }


  render() {
    return this.state.movie && this.state.movie.id ? 
      (<div>
        <Movie description={this.state.movie.overview} data={this.state.movie} imgParams={params}/>
        <hr/>
      </div>
    ) : <Warning message='Nothing was found'/>
  }
}

function updateStore() {
  store.dispatch(updateData([]));
  store.dispatch(updateMovie(''));
}
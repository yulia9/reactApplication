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
   
    if (this.props.staticContext && this.props.staticContext.dataFetch) {
       console.log('$$$props', this.props.staticContext.dataFetch.movie)
    }
    this.state = { movie: this.props.staticContext && 
      this.props.staticContext.dataFetch ? 
      this.props.staticContext.dataFetch.movie : store.getState().dataFetch.movie};
    this.url = urlForMovieRequest + this.props.location.pathname;
  }

  static fetchRequest(dispatch, url) {
    return dispatch(fetchData(urlForMovieRequest + url, true))
  }

  componentDidMount() {
    let component = this;
    store.dispatch(fetchData(component.url, true))
    .then(function() {
      let movie =  store.getState().dataFetch ? store.getState().dataFetch.movie : this.state.movie;
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
      </div>
    ) : <Warning message='Nothing was found'/>
  }
}

function updateStore() {
  store.dispatch(updateData([]));
}
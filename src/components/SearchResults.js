import React from 'react';
import { Movie } from './Movie';
import ResultsCount from './ResultsCount';
import { Link } from 'react-router-dom';
import { store } from '../index';
import { storage } from '../storage';
import { updateData, filterData, sortData } from '../actions/dataActions';
import { fetchData } from '../actions/fetchActions';

let urlForDataRequest = 'http://react-cdp-api.herokuapp.com/movies?search=';
let params = {
  width: 200,
  height: 'auto',
};

export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: this.getFilms()};
  }

  static fetchRequest(dispatch, match) {
    return dispatch(fetchData(urlForDataRequest + match.params.value))
    .then((response) => {
      let arr = [];
      if (response) {
        response.map((n, i) => {
          let date = new Date(n.release_date).getFullYear();
          arr.push(n);
          arr[i].release_date = date;
        })
      }
      return dispatch(filterData(arr, match.params.filter, match.params.value))
    })
    .then((response) => {
      return dispatch(sortData(response.data, match.params.sort))
    })
  }

  shouldComponentUpdate(props) {
    let component = this;
    store.dispatch(fetchData(urlForDataRequest + component.props.match.params.value))
    .then(function(response) {
      let results =  store.getState().dataFetch ? store.getState().dataFetch.data : this.state.results;
      
      let arr = [];
      if (response) {
        response.map((n, i) => {
          let date = new Date(n.release_date).getFullYear();
          arr.push(n);
          arr[i].release_date = date;
        })
      }
      store.dispatch(filterData(arr, component.props.match.params.filter, component.props.match.params.value))
      store.dispatch(sortData(store.getState().dataFetch.data, component.props.match.params.sort))
      results = store.getState().dataFetch.data;
      component.setState({results: results}); 
      store.dispatch(updateData(results));
    })

      return true;
    }

  getFilms() {
    return this.props.staticContext && this.props.staticContext.dataFetch ? 
      this.props.staticContext.dataFetch.data : store.getState().dataFetch.data;
  }

  render() {
    return (
      <div>
       <ResultsCount count={this.state.results.length}/>
        <ul className="searchResults"> {this.state.results.length ? this.state.results.map(n => 
          <Link key={n.id} 
              to={{pathname: `/movies/${n.id}`}}>
            <li className="movieBlock">
              <Movie data={n} imgParams={params}></Movie>
            </li>
          </Link>) : []} 
          {this.props.children}
        </ul>
      </div>
    )
  }
}

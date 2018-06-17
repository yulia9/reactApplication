import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultsCount from './ResultsCount';
import Warning from './Warning';
import Sort from './Sort';
import RadioButtons from './RadioButtons';
import { updateData, filterData, sortData } from '../actions/dataActions';
import { fetchData } from '../actions/fetchActions';
import { withRouter } from 'react-router';

const SearchParams = {
  defaultInputVal: 'Want to watch...',
  warningText: 'Fill in the search field, please!',
  urlSearchByTitle: 'http://react-cdp-api.herokuapp.com/movies?search=',
};

class Search extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      inputVal: '',
      warning: '',
    };
    this.sortVals = [
      {
        jsonName: 'release_date',
        name: 'release date',
        checked: true,
      },
      {
        jsonName: 'vote_count',
        name: 'rating',
      }];

    this.searchVals = [
      {
        jsonName: 'all',
        name: 'all',
        checked: true,
      },
      {
        jsonName: 'title',
        name: 'title',
      },
      {
        jsonName: 'genres',
        name: 'genre',
      }];

    this.updateInputVal = this.updateInputVal.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }

  updateInputVal(e) {
    this.setState({ inputVal: e.target.value });
    return this.state.inputVal;
  }

  startSearch(e, history) {
    this.storageId = Date.now();

    const component = this;
    e.preventDefault();

    if (!this.state.inputVal) {
      this.setState({ warning: SearchParams.warningText });
      component.props.dispatch(updateData([]));
      return;
    }
    this.setState({ warning: '' });


    component.props.dispatch(fetchData(SearchParams.urlSearchByTitle + this.state.inputVal))
      .then((response) => {
        const arr = [];
        if (response) {
          response.map((n, i) => {
            const date = new Date(n.release_date).getFullYear();
            arr.push(n);
            arr[i].release_date = date;
          });
        }
        component.props.dispatch(updateData(arr));

        component.searchVals.map((n) => {
          if (!!n.checked && n.name !== 'all') {
            component.props.dispatch(filterData(component.props.data, n.name, component.state.inputVal.toLowerCase()));
          }
        });
        component.sortFilms(component.sortVals.filter(n => n.checked === true)[0].jsonName);
        component.setState({ inputVal: '' });
      });
  }

  sortFilms(n) {
    const data = this.props.data;
    const storageId = window.encodeURIComponent(`Search=${Date.now()}Query`);
    this.props.dispatch(updateData([]));
    this.props.dispatch(sortData(data, n, storageId));
    this.props.history.push(`/search?${storageId}`);
  }

  inputChanged(n) {
    this.searchVals.map((l) => {
      l.name === n.name ? l.checked = true : l.checked = false;
    });
  }

  render() {
    return (
      <div>
      <h4> FIND YOUR MOVIE </h4>
        <form className="searchForm" onSubmit={this.startSearch}>
          <button className="btn btn-danger" onClick={this.startSearch}> SEARCH BY </button>
          <RadioButtons name='searchOpts'
            options={this.searchVals}
            inputChanged={this.inputChanged.bind(this)}/>
          <input className="searchInput" type="text" value={this.state.inputVal} onChange={this.updateInputVal} placeholder={SearchParams.defaultInputVal}/>
        </form>

        <Warning message={this.state.warning}/>
        <div className="sortContainer">
          <ResultsCount count={this.props.data.length}/>
          <Sort show={!!this.props.data.length}
                sortFilms={this.sortFilms.bind(this)}
                sortVals={this.sortVals}
                />
        </div>

        { this.props.children }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.dataFetch;
}


export default withRouter(connect(mapStateToProps)(Search));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchResults } from './SearchResults';
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
  constructor({props}) {
    super(props);
    this.state = {
      inputVal: '',
      warning: ''
    };
    this.sortVals = [
    {
      jsonName: 'release_date',
      name:'release date',
      checked: true
    },
    {
      jsonName: 'vote_count',
      name: 'rating',
    }];

    this.searchVals = [
    {
      jsonName: 'all',
      name: 'all',
      checked: true
    },
    {
      jsonName: 'title',
      name: 'title'
    },
    {
      jsonName: 'genres',
      name: 'genre'
    }];

    this.updateInputVal = this.updateInputVal.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.searchValue = 'default';
    this.checked = 'all';
  }
  
  updateInputVal(e) {
    this.setState({inputVal: e.target.value});
    return this.state.inputVal;
  }

  startSearch(e, history) {

    let component = this;
    e.preventDefault();

    if (!this.state.inputVal) {
      this.setState({warning: SearchParams.warningText});
      component.props.dispatch(updateData([]));
      return;
    } else {
      this.searchValue = this.state.inputVal;
      this.setState({warning:''});
    }

    component.searchVals.map(n => {
      if (!!n.checked) {
          component.checked = n.name;
        } 
    })
    component.sortFilms(component.sortVals.filter(n => n.checked === true)[0].jsonName);
    component.setState({inputVal: ''});
  }

  sortFilms(n) {
    this.props.dispatch(updateData([]));
    this.props.history.push(`/search/${this.searchValue.toLowerCase()}&${this.checked}&${n}`);
  }

  inputChanged(n) {
    this.searchVals.map(l => {
      l.name === n.name ? l.checked = true : l.checked = false;
    })
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
          <Sort sortFilms={this.sortFilms.bind(this)}
                sortVals={this.sortVals}
                />
        </div>

        { this.props.children }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return state.dataFetch;
} 


export default withRouter(connect(mapStateToProps)(Search));
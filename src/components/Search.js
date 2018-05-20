import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchResults } from './SearchResults';
import ResultsCount from './ResultsCount';
import Warning from './Warning';
import Sort from './Sort';
import RadioButtons from './RadioButtons';
import { updateData, filterData, sortData } from '../actions/dataActions';
import { fetchData } from '../actions/fetchActions';

const SearchParams = {
  defaultInputVal: 'Want to watch...',
  warningText: 'Fill in the search field, please!',
  urlSearchByTitle: 'http://react-cdp-api.herokuapp.com/movies?search=',
};

class Search extends Component {
  constructor({props, dispatch}) {
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
    this.dispatch = dispatch;
  }
  
  updateInputVal(e) {
    this.setState({inputVal: e.target.value});
    return this.state.inputVal;
  }

  startSearch(e) {
    let component = this;
    e.preventDefault();

    if (!this.state.inputVal) {
      this.setState({warning: SearchParams.warningText});
      component.dispatch(updateData([]));
      return;
    } else {
      this.setState({warning:''});
    }

    component.dispatch(fetchData(SearchParams.urlSearchByTitle + this.state.inputVal))
      .then(function(response) {

        let arr = [];
        if (response) {
          response.map((n, i) => {
            let date = new Date(n.release_date).getFullYear();
            arr.push(n);
            arr[i].release_date = date;
          })
        }
        component.dispatch(updateData(arr));

        component.searchVals.map(n => {
          if (!!n.checked && n.name !== 'all') {
            component.dispatch(filterData(component.props.data, n.name, component.state.inputVal.toLowerCase()));
          } 
        })
        component.sortFilms(component.sortVals.filter(n => n.checked === true)[0].jsonName);
        component.setState({inputVal: ''});
      })
  }

  sortFilms(n) {
    let data = this.props.data;
    this.dispatch(updateData([]));
    this.dispatch(sortData(data, n));
  }

  inputChanged(n) {
    this.searchVals.map(l => {
      l.name === n.name ? l.checked = true : l.checked = false;
    })
  }

  render() {
    return (
      <div>
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
        <SearchResults results={this.props.data}/>
      </div>
    );
  }
};

function mapStateToProps(state) {
  let props = Array.isArray(state.dataFetch) ?
    {
      data: state.dataFetch[state.dataFetch.length-1].data || [],
      loading: state.dataFetch[state.dataFetch.length-1].loading || false,
      error: state.dataFetch[state.dataFetch.length-1].error || null
    } :
    {
      data: state.dataFetch.data,
      loading: state.dataFetch.loading,
      error: state.dataFetch.error
    };
    
    return props;
} 


export default connect(mapStateToProps)(Search);
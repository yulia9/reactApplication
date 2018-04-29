import React, { Component } from 'react';
import { SearchResults } from './SearchResults';
import ResultsCount from './ResultsCount';
import Warning from './Warning';
import Sort from './Sort';
import RadioButtons from './RadioButtons';

const SearchParams = {
  defaultInputVal: 'Want to watch...',
  warningText: 'Fill in the search field, please!',
  urlSearchByTitle: 'http://react-cdp-api.herokuapp.com/movies?search=',
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      searchResults: [],
      warning: ''
    };
    this.sortVals = [
    {
      jsonName: 'vote_count',
      name: 'rating',
      checked: true
    },
    {
      jsonName: 'release_date',
      name:'release date'
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
  }

  updateInputVal(e) {
    this.setState({inputVal: e.target.value});
  }

  startSearch(e) {
    let component = this;
    e.preventDefault();

    if (!this.state.inputVal) {
      this.setState({warning: SearchParams.warningText});
      component.setState({searchResults: []});
      return;
    } else {
       this.setState({warning:''});
    }

    fetch(SearchParams.urlSearchByTitle + this.state.inputVal).
      then(function(response) {
        return response.json();
    }).then(function(response) {
      let arr = [];
      if (response && response.data) {
        response.data.map((n, i) => {
          let date = new Date(n.release_date).getFullYear();
          arr.push(n);
          arr[i].release_date = date;
        })
      }
      
      component.searchVals.map(n => {
        if (!!n.checked && n.name === 'title') {
          arr = arr.filter(n => {
            return n.title.toLowerCase().indexOf(component.state.inputVal.toLowerCase()) > -1;
            }
          )
        } else if (!!n.checked && n.name === 'genre') {
            arr = arr.filter(n => {
              let genres = n.genres.filter(g => 
                g.toLowerCase().indexOf(component.state.inputVal.toLowerCase()) > -1);
              return genres.length > 0;
            })
        }
      })
      component.setState({searchResults: arr});
      component.sortFilms(component.sortVals.filter(n => n.checked === true)[0].jsonName);
      component.setState({inputVal: ''});
    })
  }

  sortFilms(n) {
    let arr = this.state.searchResults.sort((a, b) => {
      return b[n] - a[n];
    })
    this.setState({searchResults: arr});
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
          <input className="searchInput" type="text" value={this.state.inputVal} onChange={this.updateInputVal} placeholder={SearchParams.defaultInputVal}/>
          <RadioButtons name='searchOpts'
             options={this.searchVals}
             inputChanged={this.inputChanged.bind(this)}/>
          <button className="btn btn-danger" onClick={this.startSearch}> SEARCH </button>

        </form>

        <Warning message={this.state.warning}/>
        <div className="sortContainer">
          <ResultsCount count={this.state.searchResults.length}/>
          <Sort show={!!this.state.searchResults.length}
                sortFilms={this.sortFilms.bind(this)}
                sortVals={this.sortVals}
                />
        </div>
        <SearchResults results={this.state.searchResults}/>
      </div>
    );
  }
}

export default Search;
import React, { PureComponent } from 'react';
import { SearchResults } from './SearchResults';

const SearchParams = {
  defaultInputVal: 'Want to watch...',
  warningText: 'Fill in the search field, please!',
  urlSearchByTitle: 'http://react-cdp-api.herokuapp.com/movies?search=',
};

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      searchResults: [],
      warning: ''
    };
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
        component.setState({inputVal: ''});
        return response.json();
    }).then(function(response) {
      component.setState({searchResults: response.data});
    })
  }

  render() {
    return (
      <div>
        <h4 className="searchTitle"> {this.props.searchTitle} </h4>
        <form onSubmit={this.startSearch}>
          <input className="searchInput" type="text" value={this.state.inputVal} onChange={this.updateInputVal} placeholder={SearchParams.defaultInputVal}/>
          <button className="btn btn-danger" onClick={this.startSearch}> SEARCH </button>
        </form>
        <p className="warning"> {this.state.warning} </p>
        <SearchResults searchResults={this.state.searchResults}/>
      </div>
    );
  }
}

export default Search;
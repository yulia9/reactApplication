const AppParams = {
  title: 'netflixroulettes',
  homepageUrl: '/',
  searchTitle: 'FIND YOUR MOVIE'
},
SearchParams = {
  defaultInputVal: 'Want to watch...',
  warningText: 'Fill in the search field, please!',
  urlSearchByTitle: 'http://react-cdp-api.herokuapp.com/movies?search=',
}

// Components
let Title = React.createElement(
  "a",
  {href: AppParams.homepageUrl},
  AppParams.title
);

function Header() {
  return (
    <header>
      <h2 className="headerTitle"> {Title} </h2>
    </header>
  )
}

function SearchResults(props) {
  return (
    <ul className="searchResults"> {props.searchResults.length ? props.searchResults.map(n => 
      <li key={n.id}>
        <h4> {n.title} </h4>
        <p> {n.overview} </p>
      </li>) : []} 
    </ul>
  )
}

class Search extends React.PureComponent {
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

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Search searchTitle={AppParams.searchTitle}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

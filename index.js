let AppParams = {
  title: 'netflixroulettes'
},
HeaderParams = {
  searchTitle: 'FIND YOUR MOVIE',
},
SearchParams = {
  defaultInputVal: 'Want to watch...',
  urlSearchByTitle: 'http://react-cdp-api.herokuapp.com/movies?search=',
}

let Title = React.createElement(
  "h2",
  null,
  AppParams.title
);


function Header(props) {
  return (
    <header>
      {Title}
      <Search searchTitle={HeaderParams.searchTitle}/>
    </header>
  )
}

class Search extends React.Component{
	constructor(props) {
    super(props);
    this.state = {inputVal: ''};
    this.updateInputVal = this.updateInputVal.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }

  updateInputVal(e) {
    this.setState({inputVal: e.target.value});
  }
  startSearch(e) {
	  console.log('this.state.inputVal', this.state.inputVal);
	  e.preventDefault();
    this.setState({inputVal: ''});

    fetch(SearchParams.urlSearchByTitle + this.state.inputVal).
      then(function(response) {
        return response.json();
    }).then(function(response) {
      console.log('2', response.data)
    })
  }
  render() {
    return (
      <div>
        <h4> {this.props.searchTitle} </h4>
        <form onSubmit={this.startSearch}>
          <input type="text" value={this.state.inputVal} onChange={this.updateInputVal} placeholder={SearchParams.defaultInputVal}/>
          <button onClick={this.startSearch}> SEARCH </button>
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

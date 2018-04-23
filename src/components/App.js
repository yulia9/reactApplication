import React, { Component } from 'react';
import Header from './Header';
import Search from './Search';

const AppParams = {
  title: 'netflixroulettes',
  homepageUrl: '/',
  searchTitle: 'FIND YOUR MOVIE'
};

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        <Header title={AppParams.title}/>
        <Search searchTitle={AppParams.searchTitle}/>
      </div>
    );
  }
}

export default App;
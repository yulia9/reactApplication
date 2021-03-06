import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import css from '../styles/main.css';
import Header from './Header';
import Search from './Search';
import ErrorBoundary from './ErrorBoundary';

const AppParams = {
  title: 'netflixroulettes',
  homepageUrl: '/',
  searchTitle: 'FIND YOUR MOVIE'
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <Header title={AppParams.title} searchTitle={AppParams.searchTitle}/>
        </ErrorBoundary>
        { this.props.children }
      </div>
    );
  }
}

export default App;
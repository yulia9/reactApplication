import React, { Component } from 'react';
import css from '../styles/main.css';
import Header from './Header';
import ErrorBoundary from './ErrorBoundary';

const AppParams = {
  title: 'netflixroulettes',
  homepageUrl: '/',
  searchTitle: 'FIND YOUR MOVIE',
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

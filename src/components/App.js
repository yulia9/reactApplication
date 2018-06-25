import React, { Component } from 'react';
import css from '../styles/main.css';
import Header from './Header';
import ErrorBoundary from './ErrorBoundary';

import jss from 'jss';
import injectSheet from 'react-jss';

const styles = {
  App: {
    minWidth: '550px'
  }
};

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
      <div className={this.props.classes.App}>
        <ErrorBoundary>
          <Header title={AppParams.title} searchTitle={AppParams.searchTitle}/>
        </ErrorBoundary>
        { this.props.children }
      </div>
    );
  }
}

export default injectSheet(styles)(App);

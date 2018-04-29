import React, { Component } from 'react';
import Warning from './Warning';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null, 
      errorInfo: null,
      warning1: 'Ooops.. Something went wrong...',
      warning2: 'Try to visit the site later'
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    console.log(`Error: ${error}`);
    console.log(`Error info: ${errorInfo.componentStack}`);
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <Warning message={this.state.warning1}/>
          <Warning message={this.state.warning2}/>
        </div>
      );
    }
    return this.props.children;
  }  
}
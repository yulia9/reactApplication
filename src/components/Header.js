import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header>
        <h2 className="headerTitle">{this.props.title}</h2>
      </header>
    )
  }
}

export default Header;
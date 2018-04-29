import React, { Component } from 'react';
import SortOptions from './SortOptions';

export default class Sort extends Component {
  constructor(props) {
    super(props);
    this.sortOptions = [];
  }

  componentWillMount() {
    this.props.sortVals.map((n, i) => {
      this.sortOptions[i] = n;
      i === 0 ? this.sortOptions[i].checked = true :
       this.sortOptions[i].checked = false;
    })
  }

  inputChanged(n) {
    this.sortOptions.map(l => {
      l.name === n.name ? l.checked = true : l.checked = false;
    })
  }

  clickSort() {
    this.sortOptions.map(l => {
      if (l.checked === true) {
        this.props.sortFilms(l.jsonName);
      }
    })
  }

  render() {
    return this.props.show ?
    (<div className="sort">
        <SortOptions name='sortMovies'
                     options={this.sortOptions}
                     inputChanged={this.inputChanged.bind(this)}/>
        <button className="btn" onClick={this.clickSort.bind(this)}> SORT </button>
    </div>) :
    null;
  }
}

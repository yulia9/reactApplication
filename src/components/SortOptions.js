import React, { Component } from 'react';

export default class SortOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCheck: 'opt0'
    };
    this.optionChanged = this.optionChanged.bind(this);
  }

  optionChanged(e, n) {
    this.setState({defaultCheck: e.target.value});
    this.props.inputChanged(n)
  }

  render() {
    return (
      <form className="radioButtons">
        { this.props.options.map((n,i) => 
          <label key={n.name.slice(0,2)}> {n.name}
          <input type="radio" 
                name={this.props.name}
                value={`opt${i}`}
                className='btn' 
                key={n.name.slice(0,3)}
                checked={this.state.defaultCheck === `opt${i}`}
                onChange={(e) => this.optionChanged(e, n)} 
                />
          </label>
          )
         }
      </form>
    )
  }

}

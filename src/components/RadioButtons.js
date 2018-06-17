import React, { Component } from 'react';

export default class RadioButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCheck: 'opt0',
    };
    this.optionChanged = this.optionChanged.bind(this);
  }

  optionChanged(e, n) {
    this.setState({ defaultCheck: e.target.value });
    this.props.inputChanged(n);
  }

  render() {
    return (
      <div className="radioButtons switch-container">
        <div className="checkbox switcher">
          { this.props.options.map((n, i) =>
            <label className="switch-label" key={n.name.slice(0, 2)}>
            <span className="switch-description"> {n.name} </span>
            <input type="radio"
                  name={this.props.name}
                  value={`opt${i}`}
                  key={n.name.slice(0, 3)}
                  checked={this.state.defaultCheck === `opt${i}`}
                  onChange={e => this.optionChanged(e, n)}
                  />
              <div className="bgc-toggler">
                <div className="toggler"></div>
              </div>
            </label>)
           }
        </div>
      </div>
    );
  }
}

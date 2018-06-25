// @flow
import React, { Component } from 'react';

type State = {
  defaultCheck: string,
};

type Props = {
  name: string,
  options: Array<mixed>,
  inputChanged: Function
};

export default class RadioButtons extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      defaultCheck: 'opt0',
    };
    this.optionChanged = this.optionChanged.bind(this);
  }

  optionChanged(e: {target: {value: string}}, n: string) {
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

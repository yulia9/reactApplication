import React from 'react';
import renderer from 'react-test-renderer';
import ResultsCount from '../components/ResultsCount';

describe('ResultsCount', () => {

  let props = {
    count: 0
  }

	test('Should not render template', () => {

    const component = renderer.create(
      <ResultsCount count={props.count}/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render template correctly', () => {
    props.count = 7;

    const component = renderer.create(
      <ResultsCount count={props.count}/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})

import React from 'react';
import renderer from 'react-test-renderer';
import Warning from '../components/Warning';

describe('Warning', () => {
  test('Should render template correctly', () => {
    const props = {
      message: 'Test message'
    };

    const component = renderer.create(
       <Warning message={props.message}/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})
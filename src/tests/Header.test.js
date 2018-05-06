import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/Header';

describe('Header', () => { 
  test('Should render template correctly', () => {
    const props = {
      title: 'Test title',
      searchTitle: 'Test search title'
    };

    const component = renderer.create(
      <Header title={props.title} searchTitle={props.searchTitle}/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})



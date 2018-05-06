import React from 'react';
import renderer from 'react-test-renderer';
import RadioButtons from '../components/RadioButtons';

test('Should create radiobuttons from incoming array', () => {
  const radioButtonsArr = 
    [{
    jsonName: 'date',
    name: 'date',
    checked: true
    },
    {
    jsonName: 'rating',
    name: 'rating',
    },
    {
    jsonName: 'genre',
    name: 'genre'
    }];

  const component = renderer.create(
    <RadioButtons name='radioButtons'
    options={radioButtonsArr}/>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

import RadioButtons from '../components/RadioButtons';

let radioButtons;
let radioButtonsArr;
let inputChanged;

describe('RadioButtons', () => {
  beforeEach(() => {

    radioButtonsArr =
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

    inputChanged = jest.fn();

    radioButtons = shallow(<RadioButtons
      name='radioButtons'
      options={radioButtonsArr}
      inputChanged={inputChanged}
    />);
  });

  test('Should change checked radio button', () => {

    let event = {
      target: {
        value: 'opt2'
      }
    };

    radioButtons.instance().optionChanged(event);
    expect(radioButtons.instance().state.defaultCheck).toEqual(event.target.value);
  });

  test('Should call inputChanged function with proper value', () => {

    let event = {
      target: {
        value: 'opt2'
      }
    };
    let radioButtonsObj = {
      jsonName: 'genre',
      name: 'genre',
      checked: false
    };

    radioButtons.instance().optionChanged(event, radioButtonsObj);
    expect(inputChanged).toHaveBeenCalledWith(radioButtonsObj);
  })

  test('Should create radiobuttons from incoming array', () => {

    const component = renderer.create(
      <RadioButtons
        name='radioButtons'
        options={radioButtonsArr}/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})

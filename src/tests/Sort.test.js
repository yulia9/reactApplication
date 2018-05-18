import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

import Sort from '../components/Sort';
jest.mock('../components/RadioButtons', () => 'RadioButtons');

let props;
let sort; 

describe('Sort', () => {
  beforeEach(() => {

    const radioButtonsArr = [
    {
      jsonName: 'test_date1',
      name:'test_name1'
    },
    {
      jsonName: 'test_date2',
      name: 'test_name2',
    },
    {
      jsonName: 'test_date3',
      name: 'test_name3',
    }];

    props = {
      show: 0,
      sortFilms: jest.fn(),
      sortVals: radioButtonsArr
    };

    sort = shallow(<Sort sortVals={props.sortVals} />); 

  });

  test('Should add checked:true property to the first array item and checked:false for the all next items ', 
    () => {
    expect(sort.instance().sortOptions[0].checked).toEqual(true);
    expect(sort.instance().sortOptions[1].checked).toEqual(false);
    expect(sort.instance().sortOptions[2].checked).toEqual(false);
  });

  test('Should change checked property', 
    () => {
    let item = props.sortVals[2];
    sort.instance().inputChanged(item);
    expect(sort.instance().sortOptions[0].checked).toEqual(false);
    expect(sort.instance().sortOptions[2].checked).toEqual(true);
  });

  test('sortFilms function should been called', 
    () => {
    let expectedName = props.sortVals[0].jsonName;
    sort = shallow(<Sort sortVals={props.sortVals} sortFilms={props.sortFilms}/>); 
    sort.instance().clickSort();
    expect(props.sortFilms).toHaveBeenCalledWith(expectedName);
  });

  test('Should not render template', () => {

    const component = renderer.create(
      <Sort show={props.show} sortVals={props.sortVals} sortFilms={props.sortFilms}/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render template correctly', () => {
    props.show = 5;

    const component = renderer.create(
      <Sort show={props.show} sortVals={props.sortVals} sortFilms={props.sortFilms}/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

})

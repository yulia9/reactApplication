import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

import Search from '../components/Search';

let search;

describe('Search', () => {
  beforeEach(() => {
    search = shallow(<Search />); 
    search.instance().state = {
      searchResults: [],
      inputVal: ''
    }
  });

  test('Should change checked property', () => {
    let item = search.instance().searchVals[1];
    search.instance().inputChanged(item);
    expect(search.instance().searchVals[0].checked).toEqual(false);
    expect(search.instance().searchVals[1].checked).toEqual(true);
  });

  test('Should sort array by property', () => {
    let searchResults = [
      {
      "vote_count": 5,
      "release_date": "2018-02-08",
      "genres": ["Drama","Romance"]
      },
      {
      "vote_count": 8,
      "release_date": "2018-02-07",
      "genres": ["Action","Romance"]
      }
    ];
    let sortName = "vote_count";

    search.instance().state.searchResults = searchResults;
    search.instance().sortFilms(sortName);
    expect(search.instance().state.searchResults).toEqual(
      [{
      "vote_count": 8,
      "release_date": "2018-02-07",
      "genres": ["Action","Romance"]
      }, 
      {
      "vote_count": 5,
      "release_date": "2018-02-08",
      "genres": ["Drama","Romance"]
      }]
    );
  });

  test('Should update input value', () => {
    let event = {
      target: {
        value: 'newValue'
      }
    };
    search.instance().state.inputVal = 'oldValue';
    search.instance().updateInputVal(event);
    expect(search.instance().state.inputVal).toEqual(event.target.value);
  });

  test('Should make a request and write received data', () => {
    let event = {
      preventDefault: jest.fn()
    };

    let response = {
      data: [
        {
        "id": 555,
        "title": "Test title",
        "vote_average": 555,
        "vote_count": 111,
        "release_date": "2018-02-07",
        "poster_path": "https://facebook.github.io/jest/",
        "overview": "Test overview",
        "genres": [ "Drama","Romance"]
        }
    ]};
    window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(response));
    
    search.instance().sortFilms = jest.fn();
    search.instance().state.inputVal = 'test';
    search.instance().startSearch(event);
    console.log(search.instance().state.searchResults)
    
  });

  test('Should render template correctly', () => {
    const component = renderer.create(
      <Search/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


})
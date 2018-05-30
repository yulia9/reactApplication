import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import Search from '../components/Search';

let search;
let store;
let instance;
let initialState = {};

let event = {
  preventDefault: jest.fn()
};

describe('Search', () => {

  beforeEach(() => {
    initialState = {
      dataFetch: {
        data: [],
        loading: false,
        error: null
        }
      }; 
  	store = mockStore(initialState);
    search = shallow(<Search store={store} />);
    instance = search.dive().instance();

    window.localStorage = {
      setItem: jest.fn(),
    }
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

    initialState.dataFetch.data = searchResults;
    store = mockStore(initialState);
    search = shallow(<Search store={store} />);
    instance = search.dive().instance();

    instance.sortFilms(sortName);
    expect(search.dive().instance().props.data).toEqual(
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
  });

  test('Should render template correctly', () => {
    const component = renderer.create(
      <Search store={store}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})
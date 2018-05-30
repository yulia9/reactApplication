import data from './dataFetch';
import { DATA_UPDATES } from '../actions/dataActions';
import { FETCH_STATES } from '../actions/fetchActions';

let initialState;
let dataArr;

describe('Reducer', () => {
  beforeEach(() => {
    initialState = {
      data: [],
      loading: false,
      error: null
    };
    dataArr = [{
      "vote_count": 8,
      "release_date": "2018-02-07",
      "genres": ["Action","Romance"]
      }, 
      {
      "vote_count": 5,
      "release_date": "2018-02-08",
      "genres": ["Drama","Romance"]
    }];
  })

  test('Should handle FETCH BEGIN state', () => {
    let action = {
      type: FETCH_STATES.FETCH_BEGIN,
      data: []
    };

    expect(data(initialState, action)).toEqual(
      [...initialState, 
      { data: [],
        loading: true
      }]);
  });

  test('Should handle FETCH SUCCESS state', () => {
    let action = {
      type: FETCH_STATES.FETCH_SUCCESS,
      data: dataArr
    };

    expect(data(initialState, action)).toEqual(
      [...initialState, 
      { data: dataArr,
        loading: false
      }]);
  });

  test('Should handle FETCH FAILURE state', () => {
    let action = {
      type: FETCH_STATES.FETCH_FAILURE,
      error: 'error'
    };

    expect(data(initialState, action)).toEqual(
      [...initialState, 
      { error: 'error',
        warning: true
      }]);
  });

  test('Should handle DATA UPDATE state', () => {
    let action = {
      type: DATA_UPDATES.DATA_UPDATE,
      data: dataArr
    };

    expect(data({}, action)).toEqual(
      [{ data: dataArr,
        loading: false
      }]);
  });

  test('Should handle DATA FILTER state', () => {
    let action = {
      type: DATA_UPDATES.DATA_FILTER,
      data: dataArr
    };

    expect(data({}, action)).toEqual(
      [{ data: dataArr,
        loading: false
      }]);
  });

})
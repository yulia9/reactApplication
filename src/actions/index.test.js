import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as dataActions from './dataActions';
import * as fetchActions from './fetchActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let testData;

describe('Redux: Data actions', () => {
  beforeEach(() => {
    testData = [
      {
        "title": "Test title1",
        "vote_count": 5,
        "release_date": "2018-02-07",
        "genres": [ "Drama","Romance"]
      },
      {
        "title": "Test title2",
        "vote_count": 10,
        "release_date": "2016-02-16",
        "genres": [ "Action","Romance"]
      },
    ]
  })

  test('Should update data in the store', () => {
    expect(dataActions.updateData(testData)).toEqual({
      type: dataActions.DATA_UPDATES.DATA_UPDATE,
      data: testData
    });
  });

  test('Should sort data by param', () => {

    let expectedArray = [
      { 
        "title": "Test title2",
        "vote_count": 10,
        "release_date": "2016-02-16",
        "genres": [ "Action","Romance"]
      },
      {
        "title": "Test title1",
        "vote_count": 5,
        "release_date": "2018-02-07",
        "genres": [ "Drama","Romance"]
      }
    ];
 
    expect(dataActions.sortData(testData, "vote_count")).toEqual({
      type: dataActions.DATA_UPDATES.DATA_UPDATE,
      data: expectedArray
    });
  });

  test('Should filter data by title', () => {

    let expectedArray = [
      { 
        "title": "Test title2",
        "vote_count": 10,
        "release_date": "2016-02-16",
        "genres": [ "Action","Romance"]
      }
    ];
 
    expect(dataActions.filterData(testData, "title", "title2")).toEqual({
      type: dataActions.DATA_UPDATES.DATA_FILTER,
      data: expectedArray
    });
  });

  test('Should filter data by genre', () => {

    let expectedArray = [
      {
        "title": "Test title1",
        "vote_count": 5,
        "release_date": "2018-02-07",
        "genres": ["Drama","Romance"]
      }
    ];
 
    expect(dataActions.filterData(testData, "genre", "drama")).toEqual({
      type: dataActions.DATA_UPDATES.DATA_FILTER,
      data: expectedArray
    });
  });
})

describe('Redux: async actions', () => {

  beforeEach(() => {
    testData = {
      data:[
        {
          "title": "Test title1",
          "vote_count": 5,
          "release_date": "2018-02-07",
          "genres": [ "Drama","Romance"]
        },
        {
          "title": "Test title2",
          "vote_count": 10,
          "release_date": "2016-02-16",
          "genres": [ "Action","Romance"]
        },
      ]};

    window.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return testData;
          }
        });
      });

      return p;
    });
  });

  test('Creates FETCH_SUCCESS when fetching data have been done', () => {
  
    const store = mockStore({ data: [] });
    const testUrl ='http://test.com/';

    const expectedActions = [
      { type: fetchActions.FETCH_STATES.FETCH_BEGIN,
        data: [] },
      { type: fetchActions.FETCH_STATES.FETCH_SUCCESS, 
        data: testData }
    ];

    return store.dispatch(fetchActions.fetchData(testUrl)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

})
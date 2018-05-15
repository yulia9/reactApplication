// import React from 'react';
// import renderer from 'react-test-renderer';
// import Enzyme from 'enzyme';
// import { mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// Enzyme.configure({adapter: new Adapter()});
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// import Search from '../components/Search';

// let search;
// let response;

// let event = {
//   preventDefault: jest.fn()
// };

// let store = {};

// describe('Search', () => {
// 	 const props = {
//       data: [],
//       store: {
//       	getState: jest.fn()
//       }
//     };
//   beforeEach(() => {
//     search = mount(<Search {...props} />); 
//     search.instance().state = {
//       inputVal: ''
//     };
   

//     response = {
//       data: [
//         {
//           "title": "Test title1",
//           "vote_count": 5,
//           "release_date": "2018-02-07",
//           "genres": [ "Drama","Romance"]
//         },
//         {
//           "title": "Test title2",
//           "vote_count": 10,
//           "release_date": "2016-02-16",
//           "genres": [ "Action","Romance"]
//         },
//       ]
//     };

//     window.fetch = jest.fn().mockImplementation(() => {
//       var p = new Promise((resolve, reject) => {
//         resolve({
//           json: function() {
//             return response;
//           }
//         });
//       });

//       return p;
//     });

//   });

//   test('Should change checked property', () => {
//     let item = search.instance().searchVals[1];
//     search.instance().inputChanged(item);
//     expect(search.instance().searchVals[0].checked).toEqual(false);
//     expect(search.instance().searchVals[1].checked).toEqual(true);
//   });

//   test('Should sort array by property', () => {
//     let searchResults = [
//       {
//       "vote_count": 5,
//       "release_date": "2018-02-08",
//       "genres": ["Drama","Romance"]
//       },
//       {
//       "vote_count": 8,
//       "release_date": "2018-02-07",
//       "genres": ["Action","Romance"]
//       }
//     ];
//     let sortName = "vote_count";

//     search.instance().props.data = searchResults;
//     search.instance().sortFilms(sortName);
//     expect(search.instance().props.data).toEqual(
//       [{
//       "vote_count": 8,
//       "release_date": "2018-02-07",
//       "genres": ["Action","Romance"]
//       }, 
//       {
//       "vote_count": 5,
//       "release_date": "2018-02-08",
//       "genres": ["Drama","Romance"]
//       }]
//     );
//   });

//   test('Should update input value', () => {
//     let event = {
//       target: {
//         value: 'newValue'
//       }
//     };
//     search.instance().state.inputVal = 'oldValue';
//     search.instance().updateInputVal(event);
//     expect(search.instance().state.inputVal).toEqual(event.target.value);
//   });

//   // test('Should make a request for searching by GENRE and save result array',() => {
//   //   let expectedArray = [
//   //     {
//   //       title: 'Test title1',
//   //       vote_count: 5,
//   //       release_date: 2018,
//   //       genres: [ 'Drama', 'Romance' ]
//   //     }
//   //   ];

//   //   search.instance().searchVals = [
//   //     {
//   //       jsonName: 'all',
//   //       name: 'all',
//   //     },
//   //     {
//   //       jsonName: 'title',
//   //       name: 'title'
//   //     },
//   //     {
//   //       jsonName: 'genres',
//   //       name: 'genre',
//   //       checked: true
//   //     }];

//   //   search.instance().sortFilms = jest.fn();
//   //   search.instance().state.inputVal = 'Drama';


//   //   return search.instance().startSearch(event).
//   //     then(()=> {
//   //       expect(search.instance().state.searchResults).toEqual(expectedArray);
//   //     });
//   // });

//   // test('Should make a request for searching by TITLE and save result array',() => {
//   //   let expectedArray = [
//   //     {
//   //       "title": "Test title1",
//   //       "vote_count": 5,
//   //       "release_date": 2018,
//   //       "genres": [ "Drama","Romance"]
//   //     },
//   //     {
//   //       "title": "Test title2",
//   //       "vote_count": 10,
//   //       "release_date": 2016,
//   //       "genres": [ "Action","Romance"]
//   //     },
//   //   ];

//   //   search.instance().searchVals = [
//   //     {
//   //       jsonName: 'all',
//   //       name: 'all',
//   //     },
//   //     {
//   //       jsonName: 'title',
//   //       name: 'title',
//   //       checked: true
//   //     },
//   //     {
//   //       jsonName: 'genres',
//   //       name: 'genre',
//   //     }];

//   //   search.instance().sortFilms = jest.fn();
//   //   search.instance().state.inputVal = 'Test';

//   //   return search.instance().startSearch(event).
//   //     then(()=> {
//   //       expect(search.instance().state.searchResults).toEqual(expectedArray);
//   //     });
//   // });

//   test('Should render template correctly', () => {
//     const component = renderer.create(
//       <Search/>,
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });


// })
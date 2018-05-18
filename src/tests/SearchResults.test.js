import React from 'react';
import renderer from 'react-test-renderer';
import { SearchResults } from '../components/SearchResults';

let searchResults;
let props = {
  results: []
};

describe('SearchResults', () => {
  test('Should not render template', () => {

    const component = renderer.create(
      <SearchResults results={props.results}/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render template correctly', () => {

    props.results = [
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
    ]

    const component = renderer.create(
      <SearchResults results={props.results}/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})



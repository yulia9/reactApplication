import React from 'react';
import renderer from 'react-test-renderer';
import { Movie } from '../components/Movie';

let data;
let imgParams;
describe('Movie', () => {
  data = {
    "id": 555,
    "title": "Test title",
    "vote_average": 555,
    "vote_count": 111,
    "release_date": "2018-02-07",
    "poster_path": "https://facebook.github.io/jest/",
    "overview": "Test overview",
    "genres": [ "Drama","Romance"]
  };
  imgParams = {
    width: 500,
    height: 300
  };
  
	test('Should render template correctly', () => {

    const component = renderer.create(
      <Movie data={data} imgParams={imgParams}/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

})

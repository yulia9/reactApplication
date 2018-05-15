import React from 'react';
import renderer from 'react-test-renderer';
import Image from '../components/Image';

describe('Image', () => {
  test('Should render template correctly', () => {
    const props = {
      src: 'https://facebook.github.io/jest/',
      width: 'auto', 
      height: 1000, 
      alt: 'Test Title',
      title: 'Test Title'
    };

    const component = renderer.create(
      <Image 
        width={props.width}
        height={props.height}
        source={props.src}
        title={props.title}/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})
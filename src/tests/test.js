import React from 'react';
import { toUpperCase } from '../components/SearchResults';

test('transforms text to UpperCase', () => {
  expect(toUpperCase('hello')).toEqual('HELLO');
});
import React from 'react';
import { toUpperCase } from '../components/Movie';

test('transforms text to UpperCase', () => {
  expect(toUpperCase('hello')).toEqual('HELLO');
});
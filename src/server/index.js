import express from 'express';
import React from 'react';
import handleRender from './template';

console.log('Initializing server application...');

const server = express();
const port = 8000;
const assets = express.static('build')

server.use(assets);
server.get('*', handleRender)

server.listen(port, function() {
  console.log(`Server started on port ${port}`);
})

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, Routers } from '../index';
import App from '../components/App';
import Header from '../components/Header';
import Search from '../components/Search';
import PageNotFound from '../components/PageNotFound';
import { SearchResults } from '../components/SearchResults';


function renderPage (html, preloadedState) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>App</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    
  </head>
  <body>
    <div id="app"> ${html} </div>
    <script src="/js/bundle.js"></script>
    <script>
      window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
  </body>
  </html>
  `
}
function handleRender (req, res) {
  const context = {};
  const store = configureStore();

  console.log(req.url)

  const app = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Routers/>
      </StaticRouter>
    </Provider>
  );

  const html = renderToString(app);
  const state = store.getState();
  res.send(renderPage(html, state));
}

export default handleRender;
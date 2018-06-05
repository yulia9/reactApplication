import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { configureStore, routers } from '../index';
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
  console.log(req.url);

  const store = configureStore();
  const branch = matchRoutes(routers, req.url);

  const promises = branch.map(({ route, match }) => {
    const { fetchRequest } = route.component;

    if (!(fetchRequest instanceof Function)) {
      return Promise.resolve(null);
    }

    return fetchRequest(store.dispatch, req.url)
  })

  return Promise.all(promises)
    .then(() => {
      const state = store.getState();
      const context = state;
      const app = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routers)}
          </StaticRouter>
        </Provider>
      );

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
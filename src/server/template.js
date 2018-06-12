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
    
    <style>
      * {
        box-sizing: border-box;
      }
      #app {
        min-width: 550px;
      }
      body {
        padding: 10px;
        animation: emersion 0.5s;
      }
      a:hover {
        text-decoration: none;
      }
      .headerTitle {
        margin: 15px 0 30px;
        color: #d9534f;
      }
      .searchInput {
        display: block;
        width: 100%;
        height: 34px;
        border-radius: 5px;
      }
      .searchTitle {
        color: #777;
        margin-bottom: 15x;
        font-weight: bold;
      }
      .searchResults {
        display: flex;
        flex-wrap: wrap;
        margin-top: 25px;
        padding: 0;
        list-style: none;
        justify-content: center;
      }
      .searchResults p {
        font-style: italic;
        margin: 0;
        padding-bottom:10px;
        font-size: 12px;
      }
      .searchResults h5 {
        font-weight: bold;
      }
      .searchResults li {
        padding: 10px 10px;
        width: 270px;
        text-align: center;
        animation: emersion 1s;
      }
      .warning {
        font-weight: bolder;
        font-size: 16px;
        margin-top: 15px;
        font-style: italic;
        color: #d9534f;
        text-align: center;
      }
      .searchInfo {
        font-weight: bold;
        margin: 0 5px;
      }
      .searchInfo span {
        color: #d9534f;
      }
      .sortContainer {
        display: flex;
        justify-content: space-between;
      }
      .sortContainer p {
        font-weight: bold;
      }
      .sort {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        height: 30px;
        margin-right: 15px;
      }
      .sort button:hover {
        border: 1px solid #d9534f;
      }
      .searchForm .radioButtons {
        position: absolute;
        top: 35px;
        right: 70px;
      }
      .sort .radioButtons{
        position: absolute;
        top: 35px;
        right: 200px;
      }
      .sort button {
        position: absolute;
        top: 5px;
        right: 130px;
      }
      .searchForm button {
        position: absolute;
        top: 5px;
        right: 10px;
      }
      .moviesCount {
        color: #d9534f;
        font-size: 16px;
      }
      .noFilms {
        text-align: center;
        color: #555;
        font-weight: light;
        font-size: 16px;
      }

      @keyframes emersion {
        from {opacity: 0}
        to {opacity: 1}
      }

      //Switcher
      .switch-container { 
        color: #757575; 
        font-size: 16px;
        width: 180px; 
      } 
      .switch-description { 
        position: absolute; 
        left: 50px; 
        min-width: 50px; 
      } 
      .switch-description:hover, .switch-description:active {
        color: #d9534f;
        font-weight: bold;
      }
      .bgc-toggler { 
        cursor: default; 
        transition: all 0.3s ease-in-out; 
      } 
      .toggler { 
        border: 1px solid lightgrey; 
        border-radius: 50%; 
        cursor: default; 
      } 
      .switch-label { 
        left: 0; 
        padding: 0; 
        vertical-align: middle; 
      } 
      .switch-label input { 
        display: none; 
      } 
      .switcher :first-child .bgc-toggler { 
        position: relative; 
        display: inline-block; 
        width: 20px; 
        height: 60px; 
        background: #d9534f; 
        border-radius: 50px; 
      } 
      .switcher :last-child, .switcher :nth-child(2) { 
        position: absolute; 
        background: none; 
      } 
      .switcher :nth-child(2) .switch-description { 
        top: 20px; 
      } 
      .switcher :last-child .switch-description { 
        top: 40px; 
      } 
      .switcher :first-child input:checked + .bgc-toggler > .toggler { 
        top: 0; 
        width: 20px; 
        height: 20px; 
        position: absolute; 
        display: block; 
        background: #fff; 
        transition: all 0.3s ease-in-out; 
      } 
      .switcher :nth-child(2) input:checked + .bgc-toggler > .toggler { 
        width: 20px; 
        height: 20px; 
        position: absolute; 
        display: block; 
        background: #fff; 
        top: 20px; 
        transition: all 0.3s ease-in-out; 
      } 
      .switcher :last-child input:checked + .bgc-toggler > .toggler { 
        width: 20px; 
        height: 20px; 
        position: absolute; 
        display: block; 
        background: #fff; 
        top: 40px; 
        transition: all 0.3s ease-in-out; 
      }

      .filmPageSearch {
        position: absolute;
        top: 20px;
        right: 20px;
      }
    </style>
    
  </head>
  <body>
    <div id="app"> ${html} </div>
    <script>
      window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="/js/bundle.js"></script>
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

    return fetchRequest(store.dispatch, match)
  })

  return Promise.all(promises)
    .then(() => {
      const state = store.getState();
      const context = state;
      const app = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App> 
              <Search/>       
              {renderRoutes(routers)}
            </App>
          </StaticRouter>
        </Provider>
      );

      const html = renderToString(app);
      res.send(renderPage(html, state));
    })
}

export default handleRender;
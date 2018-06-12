import * as React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import App from './components/App';
import { renderRoutes } from 'react-router-config';

export function configureStore (initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

import PageNotFound from './components/PageNotFound';
import Search from './components/Search';
import Welcome from './components/Welcome';
import Header from './components/Header';
import FilmPage from './components/FilmPage'; 
import { SearchResults } from './components/SearchResults'; 
let store = {};

export let routers = [
  { 
    path: "/",
    exact: true,
    component: Welcome
  },
  { 
    path: "/search/:value&:filter&:sort",
    component: SearchResults
  },
  { 
    path: "/movies/:id",
    component: FilmPage
  },
  { 
    path: "*",
    component: PageNotFound
  }
];

// Prevent this part from working when is running
if (typeof window !== 'undefined') {

    store = configureStore(window.PRELOADED_STATE);
    delete window.PRELOADED_STATE;

    hydrate((
      <Provider store={store}>
        <Router>
          <App> 
            <Search/>      
            {renderRoutes(routers)}
          </App>
        </Router>
      </Provider>
      ), document.getElementById('app')
    )
}

export { store };

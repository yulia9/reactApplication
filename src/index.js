import * as React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import App from './components/App';

export function configureStore (initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

import PageNotFound from './components/PageNotFound';
import Search from './components/Search';
import Header from './components/Header';
import FilmPage from './components/FilmPage'; 
import { SearchResults } from './components/SearchResults'; 
let store = {};

// Prevent this part from working when is running
if (typeof window !== 'undefined') {
  store = configureStore(window.PRELOADED_STATE);
  delete window.PRELOADED_STATE;

  hydrate((
    <Provider store={store}>
      <Router>       
        <App>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/search">
              <Search>
                <Route component={SearchResults}/>
              </Search>
            </Route>
            <Route path="/movie/:id" component={FilmPage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </App>
      </Router>
    </Provider>
    ), document.getElementById('app')
  )

}

export { store };

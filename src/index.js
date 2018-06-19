import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import App from './components/App';

import PageNotFound from './components/PageNotFound';
import Search from './components/Search';
import FilmPage from './components/FilmPage';
import { SearchResults } from './components/SearchResults';

export const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  (
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
  ), document.getElementById('app'),
);

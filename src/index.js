import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import App from './components/App';


export const store = createStore(rootReducer, applyMiddleware(thunk));

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')
// );



import PageNotFound from './components/PageNotFound';
import Search from './components/Search';
import Header from './components/Header';

ReactDOM.render((
  <Provider store={store}>
    <Router>
        <App>
          <Switch>
          <Route exact path="/" component={Header} />
      	  <Route exact path="/" component={Search} />
      	  <Route path="*" component={PageNotFound} />
          </Switch>
        </App>
    </Router>
  </Provider>
  ), document.getElementById('app')
)
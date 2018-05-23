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
import Movie from './components/Movie';

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App}/>
    	  <Route path="/movie" component={Movie} />
    	  <Route path="/*" component={PageNotFound} />
      </div>
    </Router>
  </Provider>
  ), document.getElementById('app')
)
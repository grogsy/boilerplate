import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';

// Import css file to be bundled by webpack
import '../public/index.css';

import store from './reducer/store';

import ExampleComponent from './components/example';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route component={ExampleComponent} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);

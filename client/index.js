import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import css file to be bundled by webpack
import '../public/index.css';

import store from './reducer/store';

import ExampleComponent from './components/example';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <p>Hello, Boiler!</p>
      <ExampleComponent />
    </div>
  </Provider>,
  document.getElementById('app')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ToDosStore from './stores/ToDosStore';
import './index.css';

import { register } from '../../lib';

const store = new ToDosStore();

register({ store });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

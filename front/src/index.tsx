import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import './index.css';
import App from './App';

axios.defaults.baseURL = "http://15.165.235.110:8080";

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
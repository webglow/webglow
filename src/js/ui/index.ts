import { render } from 'react-dom';
import { createElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './main';

const domContainer = document.querySelector('#react-container');
render(createElement(Router, null, createElement(Main)), domContainer);

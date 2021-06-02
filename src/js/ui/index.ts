import { render } from 'react-dom';
import { createElement } from 'react';
import Main from './main';

const domContainer = document.querySelector('#react-container');
render(createElement(Main), domContainer);

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import IndexApp from './containers';
import './reset.css';

const div = document.createElement('div');
div.setAttribute('id', 'app');
div.setAttribute('style', 'height:100%');
document.body.appendChild(div);

const mountNode = document.getElementById('app');

render(
    <AppContainer>
        <IndexApp />
    </AppContainer>,
    mountNode,
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}

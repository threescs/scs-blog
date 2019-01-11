import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router/immutable';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import IndexApp from './containers';
import rootReducer from './store/reducers/index';

const history = createBrowserHistory();

const initialState = Immutable.Map();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeEnhancer(
    applyMiddleware(routerMiddleware(history), thunk),
  ),
);

const div = document.createElement('div');
div.setAttribute('id', 'app');
div.setAttribute('style', 'height:100%');
document.body.appendChild(div);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <IndexApp />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
);

// render(IndexApp);
if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
registerServiceWorker();

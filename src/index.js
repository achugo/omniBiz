import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import  thunk  from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App';
import root from './reducers /root'


const store = createStore(root, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.querySelector('#root'))



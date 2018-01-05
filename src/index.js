import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import myReducers from './reducers/index';
// Store
import {createStore} from 'redux';
import { Provider } from 'react-redux';


const store = createStore(
    myReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
<Provider store={store}>
    <App/>
</Provider>, 
document.getElementById('root'));
registerServiceWorker();

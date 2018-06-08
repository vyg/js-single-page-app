import React from 'react';
import ReactDOM from 'react-dom';
import './to-do.css';
import './index.css';
import App from './App';
import ToDo from './ToDo';
import registerServiceWorker from './registerServiceWorker';

const todo = new ToDo('.to-do');
console.log(todo);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

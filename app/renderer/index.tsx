import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './styles.less';

const App = () => <Router />;

ReactDOM.render(<App />, document.getElementById('app'));
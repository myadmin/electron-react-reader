import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import BookDetail from './components/BookDetail';
import './styles.less';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} />
                <Route path="/bookDetail" component={BookDetail} />
            </Switch>
        </Router>
    )
}

export default App;
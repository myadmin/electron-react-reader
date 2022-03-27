import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import './styles.less';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={BookList} />
                <Route path="/bookDetail" exact component={BookDetail} />
            </Switch>
        </Router>
    )
}

export default App;
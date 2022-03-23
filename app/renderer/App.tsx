import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Title from './title';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Title text='可视化简历平台' />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
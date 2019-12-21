import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Redux
//import { Provider } from 'react-redux'; //combine react and redux
//import store from './store';

const App = () => {
    return (
        //  <Provider>
        <Router>
            <Switch>
                <div className="App">
                    <h1>Test</h1>
                </div>
            </Switch>
        </Router>
        //</Provider>
    );
};

export default App;

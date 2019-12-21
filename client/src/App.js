import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Layout/Landing';
import Alert from './components/Layout/Alert';
import Navbar from './components/Layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

// Redux
import { Provider } from 'react-redux'; //combine react and redux
import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Alert />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;

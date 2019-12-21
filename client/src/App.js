import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import Questions from './components/questions/Questions';
import Students from './components/students/Students';
import './App.css';
import PrivateRoute from './components/routing/PrivateRoute';
import AskQuestion from './components/questions/AskQuestion';

// Redux
import { Provider } from 'react-redux'; //combine react and redux
import store from './store';
import EditProfile from './components/profile/EditProfile';

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
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route exact path="/questions" component={Questions} />
                    <Route exact path="/students" component={Students} />
                    <Route exact path="/ask-question" component={AskQuestion} />
                    <PrivateRoute
                        exact
                        path="/edit-profile"
                        component={EditProfile}
                    />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;

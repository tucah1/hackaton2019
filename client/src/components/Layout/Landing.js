import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const Landing = ({ auth }) => {
    if (auth.isAuthenticated) {
        return <Redirect to="/questions" />;
    }
    return (
        <Fragment>
            <div className="heading">
                <div className="welcome">
                    <div className="welcomeInner">
                        <h1>InfoQueue</h1>
                        <h3 style={{ marginBottom: '30px' }}>
                            Join our comunity and find new oppurtunities
                        </h3>
                        <div className="form">
                            <Link className="btnLogin" to="/login">
                                Log In
                            </Link>
                            <Link className="btnRegister" to="/register">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapSateToProps = state => ({
    auth: state.auth
});

export default connect(mapSateToProps, {})(Landing);

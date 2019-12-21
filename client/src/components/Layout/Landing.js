import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

const Landing = props => {
    return (
        <Fragment>
            <div className="heading">
                <div class="welcome">
                    <div class="welcomeInner">
                        <h1>InfoQueue</h1>
                        <p>Join our comunity and find new oppurtunities.</p>
                        <div class="form">
                            <Link class="btnLogin" to="/login">
                                Log In
                            </Link>
                            <Link class="btnRegister" to="/register">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Landing;

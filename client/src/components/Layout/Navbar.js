import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

const Navbar = ({ logout, history }) => {
    return (
        <Fragment>
            <div class="navigation">
                <div class="logo">
                    <img id="logo" src="img/skeri.png" />
                    <h2 id="logoText">InfoQueue</h2>
                </div>
                <ul class="links">
                    <li>
                        <Link id="files" href="#">
                            <span data-hover="">Files</span>
                        </Link>
                    </li>
                    <li>
                        <Link id="questions" to="/questions">
                            <span data-hover="">Question</span>
                        </Link>
                    </li>
                    <li>
                        <Link id="ask" to="/ask-question">
                            <span data-hover="">Ask</span>
                        </Link>
                    </li>
                    <li>
                        <Link id="ask" to="/students">
                            <span data-hover="">Students</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={logout} to="/">
                            <i className="fas fa-sign-out-alt"></i>{' '}
                            <span className="hide-sm">Logout</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/edit-profile">
                            <span className="hide-sm">Edit</span>
                        </Link>
                    </li>
                </ul>
                <div class="loginRegister">
                    <Link
                        to="/link"
                        id="loginBtn"
                        type="submit"
                        name="login"
                        value="Login"
                    />
                    <input
                        id="RegisterBtn"
                        type="submit"
                        name="register"
                        value="Register"
                    />
                </div>
                <div class="menu">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(null, { logout })(Navbar);

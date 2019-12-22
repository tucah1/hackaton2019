import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

const Navbar = ({
    logout,
    history,
    auth: { isAuthenticated, loading, user }
}) => {
    const authLinks = (
        <ul class="links">
            <li>
                <Link to="/ask-question">
                    <span>Ask</span>
                </Link>
            </li>
            <li>
                <Link to="/questions">
                    <span>Questions</span>
                </Link>
            </li>
            <li>
                <Link to="/students">
                    <span>Students</span>
                </Link>
            </li>

            <li>
                <Link onClick={logout} to="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul class="links">
            <li>
                <Link to="/questions">
                    <span>Questions</span>
                </Link>
            </li>
            <li>
                <Link to="/students">
                    <span>Students</span>
                </Link>
            </li>
            <li>
                <Link to="/register">
                    <span>Register</span>
                </Link>
            </li>
            <li>
                <Link to="/login">
                    <span>Login</span>
                </Link>
            </li>
        </ul>
    );
    return (
        <Fragment>
            <nav className="navigation">
                <Link to="/" class="logo">
                    <i
                        class="fas fa-user-graduate"
                        style={{
                            color: 'white'
                        }}
                    ></i>
                    <h2 id="logoText">InfoQueue</h2>
                </Link>
                {!loading && (
                    <Fragment>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Fragment>
                )}
            </nav>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

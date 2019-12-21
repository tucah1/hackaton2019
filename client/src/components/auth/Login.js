import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/questions" />;
    }
    return (
        <Fragment>
            <div class="logBody">
                <div class="regForm">
                    <form class="register" onSubmit={e => onSubmit(e)}>
                        <h2>Login</h2>
                        <div class="rowF">
                            <div class="colF">
                                <div class="inputBox">
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span class="textF">Email</span>
                                    <span class="lineF"></span>
                                </div>
                            </div>
                        </div>
                        <div class="rowF">
                            <div class="colF">
                                <div class="inputBox">
                                    <input
                                        type="password"
                                        name="password"
                                        minLength="6"
                                        value={password}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span class="textF">Password</span>
                                    <span class="lineF"></span>
                                </div>
                            </div>
                        </div>
                        <div class="rowF">
                            <div class="colF">
                                <div class="btnCont">
                                    <input
                                        type="submit"
                                        name="login"
                                        value="LogIn"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="redirect">
                        <Link to="/register">
                            Don't have an account? Register!
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapSateteToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapSateteToProps, { login })(Login);

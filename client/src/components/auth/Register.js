import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, auth: { isAuthenticated } }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        university: '',
        faculty: '',
        department: ''
    });

    const {
        name,
        email,
        password,
        password2,
        username,
        university,
        faculty,
        department
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            console.log(formData);

            register({
                name,
                username,
                email,
                password,
                university,
                faculty,
                department
            });
        }
    };

    //Redirect if is logged in
    if (isAuthenticated) {
        return <Redirect to="/questions" />;
    }

    return (
        <Fragment>
            <div className="regBody">
                <div className="regForm">
                    <form className="register" onSubmit={e => onSubmit(e)}>
                        <h2>Register</h2>
                        <div className="rowF">
                            <div className="colF">
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span className="textF">Name</span>
                                    <span className="lineF"></span>
                                </div>
                            </div>
                            <div className="colF">
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span className="textF">Username</span>
                                    <span className="lineF"></span>
                                </div>
                            </div>
                        </div>
                        <div className="rowF">
                            <div className="colF">
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span className="textF">Email</span>
                                    <span className="lineF"></span>
                                </div>
                            </div>
                            <div className="colF">
                                <div className="inputBox">
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span className="textF">Password</span>
                                    <span className="lineF"></span>
                                </div>
                            </div>
                        </div>

                        <div className="rowF">
                            <div className="colF">
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        name="university"
                                        value={university}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span className="textF">University</span>
                                    <span className="lineF"></span>
                                </div>
                            </div>

                            <div className="colF">
                                <div className="inputBox">
                                    <input
                                        type="password"
                                        name="password2"
                                        value={password2}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span className="textF">
                                        Confirm Password
                                    </span>
                                    <span className="lineF"></span>
                                </div>
                            </div>
                        </div>

                        <div className="rowF">
                            <div className="colF">
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        name="faculty"
                                        value={faculty}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span className="textF">Faculty</span>
                                    <span className="lineF"></span>
                                </div>
                            </div>
                            <div className="colF">
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        name="department"
                                        value={department}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span className="textF">Department</span>
                                    <span className="lineF"></span>
                                </div>
                            </div>
                        </div>
                        <div className="rowF">
                            <div className="colF">
                                <div className="btnCont">
                                    <input
                                        type="submit"
                                        name="register"
                                        value="Register"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="redirect">
                        <Link href="/login">Have and account? Log In!</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Register.propTypes = {
    auth: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { setAlert, register })(Register);

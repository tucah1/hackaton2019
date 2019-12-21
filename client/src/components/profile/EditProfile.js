import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
    profile: { profile, loading },
    editProfile,
    getCurrentProfile
}) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        university: '',
        faculty: '',
        department: ''
    });
    const { name, username, email, university, department, faculty } = formData;

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            name: loading || !profile.name ? '' : profile.name,
            username: loading || !profile.username ? '' : profile.username,
            email: loading || !profile.email ? '' : profile.email,
            university:
                loading || !profile.university ? '' : profile.university,
            faculty: loading || !profile.faculty ? '' : profile.faculty,
            department: loading || !profile.department ? '' : profile.department
        });
    }, [loading, getCurrentProfile]);

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        editProfile(formData);
    };

    return (
        <Fragment>
            <div class="profile">
                <div class="containerE">
                    <form class="profileEdit" onSubmit={e => onSubmit(e)}>
                        <h2>Edit profile</h2>
                        <div class="rowF">
                            <div class="colF">
                                <div class="inputBox">
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span class="textF">Name</span>
                                    <span class="lineF"></span>
                                </div>
                            </div>
                            <div class="colF">
                                <div class="inputBox">
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span class="textF">Username</span>
                                    <span class="lineF"></span>
                                </div>
                            </div>
                        </div>
                        <div class="rowF">
                            <div class="colF">
                                <div class="inputBox">
                                    <input
                                        type="text"
                                        name="university"
                                        value={university}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span class="textF">University</span>
                                    <span class="lineF"></span>
                                </div>
                            </div>
                        </div>
                        <div class="rowF">
                            <div class="colF">
                                <div class="inputBox">
                                    <input
                                        type="text"
                                        name="faculty"
                                        value={faculty}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span class="textF">Faculty</span>
                                    <span class="lineF"></span>
                                </div>
                            </div>
                            <div class="colF">
                                <div class="inputBox">
                                    <input
                                        type="text"
                                        name="department"
                                        value={department}
                                        required="required"
                                        onChange={e => onChange(e)}
                                    />
                                    <span class="textF">Department</span>
                                    <span class="lineF"></span>
                                </div>
                            </div>
                        </div>
                        <input
                            type="submit"
                            name="edit"
                            value="Submit changes"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
    EditProfile
);

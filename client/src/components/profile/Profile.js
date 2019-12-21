import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Profile = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    match
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner></Spinner>
            ) : (
                <Fragment>
                    <div class="profile">
                        <div class="container">
                            <div class="innerProfile">
                                <div class="personal">
                                    <img src={profile.avatar} />
                                    <div class="labels">
                                        <label id="name">{profile.name}</label>
                                        <label id="usern">
                                            {profile.usernmae}
                                        </label>
                                    </div>
                                </div>
                                <div class="info">
                                    <label class="profileLab">
                                        {profile.university}
                                    </label>
                                    <label class="profileLab">
                                        {profile.faculty}
                                    </label>
                                    <label class="profileLab">
                                        {profile.department}
                                    </label>
                                    <div class="profileButtons">
                                        {auth.isAuthenticated &&
                                            auth.loading === false &&
                                            auth.user._id === profile._id && (
                                                <Link to="/edit-profile">
                                                    Edit Profile
                                                </Link>
                                            )}
                                        {auth.isAuthenticated &&
                                            auth.loading === false &&
                                            auth.user._id !== profile._id && (
                                                <Link
                                                    to={`/profile/messages/${profile._id}`}
                                                >
                                                    Send Message
                                                </Link>
                                            )}
                                        {auth.isAuthenticated &&
                                            auth.loading === false &&
                                            auth.user._id === profile._id && (
                                                <Link to="/edit-profile">
                                                    Delete Profile
                                                </Link>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);

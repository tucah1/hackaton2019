import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Search from '../layout/SearchUser';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Students = ({ search, getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles(search.user);
    }, [getProfiles, search.user]);
    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div className="all">
                        <h1>Connect with others</h1>
                        <br />
                        <Search
                            text2={'Search for student...'}
                            className="all-search"
                        />
                        <div className="profileL">
                            <div className="containerLX">
                                {profiles.map(prof => (
                                    <div className="rowF">
                                        <div className="containerL">
                                            <img src={prof.avatar} />
                                            <div className="personal">
                                                <div className="labels">
                                                    <label id="name">
                                                        <Link
                                                            to={`/profile/${prof._id}`}
                                                        >
                                                            {prof.name}
                                                        </Link>
                                                    </label>
                                                    <br />
                                                    <label id="usern">
                                                        <Link
                                                            to={`/profile/${prof._id}`}
                                                        >
                                                            @{prof.username}
                                                        </Link>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Students.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    search: state.search,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Students);

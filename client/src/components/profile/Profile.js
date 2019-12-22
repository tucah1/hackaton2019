import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById, deleteAccount } from '../../actions/profile';
import {
    getQandA,
    deletePost,
    addLikeQuestion,
    removeLikeQuestion,
    addLikeAnswer,
    removeLikeAnswer
} from '../../actions/post';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

const Profile = ({
    getProfileById,
    getQandA,
    addLikeQuestion,
    removeLikeQuestion,
    addLikeAnswer,
    removeLikeAnswer,
    profile: { profile, loading },
    auth,
    match,
    post: { qa },
    deletePost,
    deleteAccount,
    history
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
        getQandA(match.params.id, qa);
    }, [getProfileById, match.params.id, qa]);
    return (
        <Fragment>
            {profile === null ||
            auth.user === null ||
            qa === null ||
            loading ? (
                <Spinner></Spinner>
            ) : (
                <div className="profile">
                    <div className="container">
                        <div className="insideContainer">
                            <div className="profileNav">
                                {auth.isAuthenticated &&
                                    auth.loading === false &&
                                    auth.user._id === profile._id && (
                                        <Fragment>
                                            <Link to="/edit-profile">Edit</Link>
                                            <button
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => {
                                                    deleteAccount(history);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </Fragment>
                                    )}
                            </div>
                            <img src={profile.avatar} />
                            <div className="labels">
                                <label id="name">{profile.name}</label>
                                <label id="usern">{profile.username}</label>
                            </div>
                            <hr />
                            <div className="info">
                                <label className="profileLab">
                                    {profile.university}
                                </label>
                                <label className="profileLab">
                                    {profile.faculty}
                                </label>
                                <label className="profileLab">
                                    {profile.department}
                                </label>
                            </div>
                            <div className="points">
                                <span>Popularity: </span>
                                <span>{profile.popularity}</span>
                            </div>
                        </div>
                    </div>
                    <div className="myQuestions">
                        <h2>User questions</h2>
                        {qa.q.map(q => (
                            <div className="containerDown">
                                <h3>{q.title}</h3>
                                <p>{q.text}</p>
                                <div className="details">
                                    <span>{q.name}</span>
                                    <span>
                                        <Moment format="DD.MM.YYYY  HH:mm">
                                            {q.date}
                                        </Moment>
                                    </span>
                                    {auth.isAuthenticated &&
                                        auth.loading === false &&
                                        auth.user._id === q.user && (
                                            <button
                                                onClick={() => {
                                                    deletePost(q._id, history);
                                                }}
                                            >
                                                X
                                            </button>
                                        )}
                                </div>
                                <div className="likeDislike">
                                    <button
                                        onClick={() => addLikeQuestion(q._id)}
                                        type="button"
                                        style={{
                                            background: 'white',
                                            marginLeft: '10px',
                                            border: 'none'
                                        }}
                                    >
                                        <i className="fas fa-thumbs-up" />{' '}
                                        <span>
                                            {q.likes.length > 0 && (
                                                <span>{q.likes.length}</span>
                                            )}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            removeLikeQuestion(q._id)
                                        }
                                        type="button"
                                        style={{
                                            background: 'white',
                                            marginLeft: '10px',
                                            border: 'none'
                                        }}
                                    >
                                        <i className="fas fa-thumbs-down" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br />
                    <div className="myAnswers">
                        <h2>User answers</h2>
                        {qa.a.map(a => (
                            <div className="containerDown">
                                <p>{a.text}</p>
                                <div className="details">
                                    <span>{a.name}</span>
                                    <span>
                                        <Moment format="DD.MM.YYYY  HH:mm">
                                            {a.date}
                                        </Moment>
                                    </span>
                                </div>
                                <div className="likeDislike">
                                    <button
                                        onClick={() =>
                                            addLikeAnswer(a.qId, a._id)
                                        }
                                        type="button"
                                        style={{
                                            background: 'white',
                                            marginLeft: '10px',
                                            border: 'none'
                                        }}
                                    >
                                        <i className="fas fa-thumbs-up" />{' '}
                                        <span>
                                            {a.likes.length > 0 && (
                                                <span>{a.likes.length}</span>
                                            )}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            removeLikeAnswer(a.qId, a._id)
                                        }
                                        type="button"
                                        style={{
                                            background: 'white',
                                            marginLeft: '10px',
                                            border: 'none'
                                        }}
                                    >
                                        <i className="fas fa-thumbs-down" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    removeLikeQuestion: PropTypes.func.isRequired,
    addLikeQuestion: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, {
    getProfileById,
    getQandA,
    deletePost,
    removeLikeQuestion,
    addLikeQuestion,
    addLikeAnswer,
    removeLikeAnswer,
    deleteAccount
})(Profile);

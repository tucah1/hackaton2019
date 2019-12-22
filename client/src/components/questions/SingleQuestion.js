import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getPost,
    deletePost,
    addComment,
    deleteComment,
    addLikeQuestion,
    removeLikeQuestion,
    addLikeAnswer,
    removeLikeAnswer
} from '../../actions/post';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const SingleQuestion = ({
    getPost,
    deletePost,
    addComment,
    deleteComment,
    addLikeQuestion,
    removeLikeQuestion,
    removeLikeAnswer,
    addLikeAnswer,
    post: { post, loading },
    match,
    auth,
    history
}) => {
    const [text, setText] = useState('');

    useEffect(() => {
        getPost(match.params.id, post);
    }, [getPost, match.params.id, post]);

    return (
        <Fragment>
            {loading || post === null || auth.user === null ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div className="profile">
                        <div className="containerOQ">
                            <div className="insideContainerOQ">
                                <h3>{post.title}</h3>
                                <p>{post.text}</p>
                                <div className="likeDislikeOQ">
                                    <button
                                        onClick={e => addLikeQuestion(post._id)}
                                        type="button"
                                        style={{
                                            background: 'white',
                                            marginLeft: '10px',
                                            border: 'none'
                                        }}
                                    >
                                        <i className="fas fa-thumbs-up" />{' '}
                                        <span>
                                            {post.likes.length > 0 && (
                                                <span>{post.likes.length}</span>
                                            )}
                                        </span>
                                    </button>
                                    <button
                                        onClick={e =>
                                            removeLikeQuestion(post._id)
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
                                <div className="detailsOQ">
                                    <span>{post.name} </span>
                                    <span>
                                        <Moment format="DD.MM.YYYY  HH:mm">
                                            {post.date}
                                        </Moment>
                                    </span>
                                    {!auth.loading &&
                                        post.user === auth.user._id && (
                                            <button
                                                onClick={() =>
                                                    deletePost(
                                                        post._id,
                                                        history
                                                    )
                                                }
                                                type="button"
                                            >
                                                <i className="fas fa-times" />
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>

                        <h2>Comments</h2>
                        <br />
                        {auth.isAuthenticated && (
                            <div className="containerDown">
                                <h3>Give an answer</h3>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        addComment(post._id, { text });
                                        setText('');
                                    }}
                                >
                                    <textarea
                                        className="classTextarea"
                                        name="text"
                                        placeholder="Answer..."
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                    ></textarea>
                                    <input
                                        type="submit"
                                        className="btn btn-dark my-1"
                                        value="Submit"
                                        id="blue"
                                    />
                                </form>
                            </div>
                        )}

                        {post.answers.map(ans => (
                            <div className="containerDown">
                                <h3>{ans.title} </h3>
                                <p>{ans.text} </p>
                                <div className="likeDislikeOQ">
                                    <button
                                        onClick={e =>
                                            addLikeAnswer(post._id, ans._id)
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
                                            {ans.likes.length > 0 && (
                                                <span>{ans.likes.length}</span>
                                            )}
                                        </span>
                                    </button>
                                    <button
                                        onClick={e =>
                                            removeLikeAnswer(post._id, ans._id)
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
                                <div className="details">
                                    <span>{ans.name} </span>
                                    <span>
                                        <Moment format="DD.MM.YYYY  HH:mm">
                                            {ans.date}
                                        </Moment>
                                    </span>
                                    {auth.isAuthenticated &&
                                        auth.user._id === ans.user && (
                                            <button
                                                onClick={() => {
                                                    deleteComment(
                                                        post._id,
                                                        ans._id
                                                    );
                                                }}
                                            >
                                                Delete
                                            </button>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

SingleQuestion.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, {
    getPost,
    deletePost,
    addComment,
    deleteComment,
    removeLikeQuestion,
    addLikeAnswer,
    removeLikeAnswer,
    addLikeQuestion
})(SingleQuestion);

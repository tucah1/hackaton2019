import React, { Fragment, useEffect } from 'react';
import Search from '../layout/SearchUser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getPosts,
    addLikeQuestion,
    removeLikeQuestion
} from '../../actions/post';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Questions = ({
    getPosts,
    addLikeQuestion,
    removeLikeQuestion,
    post: { posts, loading },
    search,
    profile
}) => {
    useEffect(() => {
        getPosts(search.user);
    }, [getPosts, search.user]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="Questions">
                <div className="containerQL">
                    <h1>Posts & Questions</h1>
                    <br />
                    <Search
                        text2={'e.g. ius algorithms data-structures professor'}
                    />
                    <br />
                    <br />
                    {posts.map(post => (
                        <div className="rowF">
                            <div className="containerQ">
                                <Link to={`/questions/${post._id}`}>
                                    <h3>{post.title}</h3>
                                </Link>

                                <p>{post.text}</p>
                                <div className="likeDislike">
                                    <button
                                        onClick={() =>
                                            addLikeQuestion(post._id)
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
                                            {post.likes.length > 0 && (
                                                <span>{post.likes.length}</span>
                                            )}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
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
                                <div className="details">
                                    <div className="one">
                                        {post.tags.map(tag => (
                                            <span key={tag._id}>{tag.tag}</span>
                                        ))}
                                    </div>
                                    <div className="two">
                                        <span>{post.name}</span>
                                        <span>
                                            <Moment format="DD.MM.YYYY  HH:mm">
                                                {post.date}
                                            </Moment>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

Questions.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    addLikeQuestion: PropTypes.func.isRequired,
    removeLikeQuestion: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    search: state.search,
    profile: state.profile
});

export default connect(mapStateToProps, {
    getPosts,
    addLikeQuestion,
    removeLikeQuestion
})(Questions);

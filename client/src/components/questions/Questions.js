import React, { Fragment, useEffect } from 'react';
import Search from '../layout/SearchUser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

const Questions = ({ getPosts, post: { posts, loading }, search }) => {
    useEffect(() => {
        getPosts(search.user);
    }, [getPosts, search.user]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div class="Questions">
                <div class="containerQL">
                    <h1>Posts & Questions</h1>
                    <br />
                    <Search
                        text2={'e.g. ius algorithms data-structures professor'}
                    />
                    <br />
                    <br />
                    {posts.map(post => (
                        <div class="rowF">
                            <div class="containerQ">
                                <h3>{post.title}</h3>
                                <p>{post.text}</p>
                                <div class="details">
                                    <span>{post.name}</span>
                                    <Moment format="DD.MM.YYYY  HH:mm">
                                        {post.date}
                                    </Moment>
                                </div>
                                <div class="likeDislike">
                                    <i class="fas fa-thumbs-up"></i>
                                    <i class="fas fa-thumbs-down"></i>
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
    search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    search: state.search
});

export default connect(mapStateToProps, { getPosts })(Questions);

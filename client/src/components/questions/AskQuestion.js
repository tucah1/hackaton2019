import React from 'react';
import PropTypes from 'prop-types';

const AskQuestion = props => {
    return (
        <div>
            <div class="QuestionsF">
                <div class="containerQFL">
                    <h1>New Post</h1>
                    <form class="newPostForm">
                        <label>Title:</label>
                        <input type="text" name="title" placeholder="Subject" />
                        <label>Question:</label>
                        <textarea></textarea>
                    </form>
                </div>
            </div>
        </div>
    );
};

AskQuestion.propTypes = {};

export default AskQuestion;

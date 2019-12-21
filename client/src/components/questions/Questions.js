import React, { Fragment } from 'react';
import Search from '../layout/SearchUser';

const Questions = () => {
    return (
        <Fragment>
            <div class="Questions">
                <div class="containerQL">
                    <h1>Posts & Questions</h1>
                    <br />
                    <Search text2={'Search for developer...'} />
                    <br />
                    <br />
                    <div class="rowF">
                        <div class="containerQ">
                            <h3>Here question title</h3>
                            <p>Here some question text</p>
                            <div class="details">
                                <span>user</span>
                                <span>date</span>
                            </div>
                            <div class="likeDislike">
                                <i class="fas fa-thumbs-up"></i>
                                <i class="fas fa-thumbs-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Questions;

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setUser } from '../../actions/search';
import { connect } from 'react-redux';

const SearchUser = ({ setUser, text2 }) => {
    const [text, setText] = useState('');
    useEffect(() => {
        setUser(text);
    }, [setUser, text]);

    return (
        <div className="">
            <form
                className="search"
                onSubmit={e => {
                    e.preventDefault();
                    setText(e.target.value);
                }}
            >
                <input
                    type="text"
                    placeholder={text2}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </form>
        </div>
    );
};

SearchUser.propTypes = {
    setUser: PropTypes.func.isRequired
};

export default connect(null, { setUser })(SearchUser);

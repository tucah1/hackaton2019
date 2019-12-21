import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
    return (
        <Fragment>
            <div class="navigation">
                <div class="logo">
                    <img id="logo" src="img/skeri.png" />
                    <h2 id="logoText">InfoQueue</h2>
                </div>
                <ul class="links">
                    <li>
                        <Link id="files" href="#">
                            <span data-hover="">Files</span>
                        </Link>
                    </li>
                    <li>
                        <Link id="questions" href="#">
                            <span data-hover="">Question</span>
                        </Link>
                    </li>
                    <li>
                        <Link id="ask" href="#">
                            <span data-hover="">Ask</span>
                        </Link>
                    </li>
                </ul>
                <div class="loginRegister">
                    <Link
                        to="/link"
                        id="loginBtn"
                        type="submit"
                        name="login"
                        value="Login"
                    />
                    <input
                        id="RegisterBtn"
                        type="submit"
                        name="register"
                        value="Register"
                    />
                </div>
                <div class="menu">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default Navbar;

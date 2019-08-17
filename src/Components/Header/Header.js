import React, {useState, useRef, useEffect} from "react";
import {Link} from "@reach/router";
import posed, {PoseGroup} from "react-pose";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import SearchBox from "./../SearchBox/SearchBox";
import tryLogout from "../Fetch/logout";
import tryGettingUser from "../Fetch/getUser";
import userProfilePic from "./../../user.png";
import "./header.css";

const Menu = posed.div({
    enter: {y: 0, opacity: 1, transition: {duration: 300}},
    exit: {y: 100, opacity: 0, transition: {duration: 300}}
});

const Header = () => {
    const [menuVisible, changeMenuVisible] = useState(false);
    const [userMenu, changeUserMenu] = useState(false);
    const hamRef = useRef();
    const [name, changeName] = useState("");
    const [loggedIn, changeLoggedIn] = useState(name === "" ? false : true);

    useEffect(() => {
        const getUser = async () => {
            const user = await tryGettingUser();

            if (user[0] === true) {
                changeName(user[1].user.username);
                changeLoggedIn(true);
            }
        };

        if (localStorage.getItem("authToken") !== null) {
            getUser();
        }
    });

    const handleLogout = async () => {
        const logoutSuccessfull = await tryLogout();

        if (logoutSuccessfull) {
            changeLoggedIn(true);
            window.location.href = "https://flixi.netlify.com";
            console.log("Logged Out");
        } else {
            changeLoggedIn(false);
            console.log("Can't Logout");
        }
    };

    return (
        <header className="header-wrapper">
            <div className="header">
                <Link to="/">
                    <div className="logo">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            viewBox="0 0 69.648 39.065"
                        >
                            <g
                                fill="#ff5252"
                                fillOpacity="1"
                                stroke="none"
                                strokeWidth="0.265"
                                aria-label="FLIX"
                                fontFamily="ShadowW90-Gothic"
                                fontSize="50.8"
                                fontStretch="normal"
                                fontStyle="normal"
                                fontVariant="normal"
                                fontWeight="normal"
                                letterSpacing="0"
                                wordSpacing="0"
                                style={{lineHeight: "1.25"}}
                            >
                                <path
                                    style={{
                                        InkscapeFontSpecification:
                                            "ShadowW90-Gothic"
                                    }}
                                    d="M-103.776 88.572h-6.807v4.877h2.387l3.861 3.455v5.842h-6.248v15.85h-6.553l-3.302-3.303V79.53h12.852l3.81 3.404zm-4.318-3.911v-4.318h-11.48v34.442h4.825V98.834h6.096V94.16h-6.096v-9.5zM-85.517 118.595H-99.03l-3.251-3.302V79.53h6.248l3.81 3.454v25.908h2.845l3.86 3.455zm-4.318-3.81v-5.08h-6.706V80.343h-4.877v34.442zM-74.368 118.595h-6.604l-3.251-3.302V79.53h6.4l3.455 3.404zm-4.166-3.81V80.343h-4.826v34.442zM-50.79 118.595h-7.67l-2.846-3.302-.61-1.88-1.27 5.182h-6.806l-3.607-3.302 6.197-17.983-5.69-17.78h7.214l3.404 3.15.711-3.15h6.655l3.556 3.556-5.69 16.51zm-4.267-3.81l-6.4-18.135 5.587-16.307h-5.283l-2.642 11.074-2.895-11.074h-5.284l5.487 16.916-5.995 17.526h5.385l2.896-13.259 3.708 13.26z"
                                    transform="translate(120.438 -79.53)"
                                />
                            </g>
                        </svg>
                    </div>
                </Link>

                <SearchBox />

                {loggedIn && (
                    <section
                        className="profile-pic"
                        onClick={() => changeUserMenu(!userMenu)}
                    >
                        <LazyLoadImage
                            alt="profile pic"
                            effect="blur"
                            src={`https://prab-flix-api.herokuapp.com/user/${name}/avatar`}
                            className="profile-pic-image"
                            placeholderSrc={userProfilePic}
                            onError={e => (e.target.src = userProfilePic)}
                        />
                    </section>
                )}

                {!loggedIn && (
                    <section className="user-sec">
                        <button className="btn">Sign Up</button>
                        <button className="btn btn-login">Login</button>
                    </section>
                )}

                <svg
                    className="ham hamRotate ham4"
                    viewBox="0 0 100 100"
                    onClick={e => {
                        hamRef.current.classList.toggle("active");
                        menuVisible
                            ? changeMenuVisible(false)
                            : changeMenuVisible(true);
                    }}
                    ref={hamRef}
                >
                    <path
                        className="line top"
                        d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
                    />
                    <path className="line middle" d="m 70,50 h -40" />
                    <path
                        className="line bottom"
                        d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
                    />
                </svg>
            </div>
            <PoseGroup>
                {userMenu && (
                    <Menu key="menu" className="menu user-menu">
                        <div className="menu-wrap">
                            <ul className="menu-main">
                                {loggedIn && (
                                    <Link
                                        to={`/user/${name}`}
                                        onClick={e => {
                                            userMenu
                                                ? changeUserMenu(false)
                                                : changeUserMenu(true);
                                        }}
                                    >
                                        <li>
                                            <h1 className="menu-item">
                                                Watchlist
                                            </h1>
                                        </li>
                                    </Link>
                                )}
                                {loggedIn && (
                                    <li
                                        onClick={e => {
                                            userMenu
                                                ? changeUserMenu(false)
                                                : changeUserMenu(true);
                                            handleLogout();
                                        }}
                                    >
                                        <h1 className="menu-item">Sign Out</h1>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </Menu>
                )}
            </PoseGroup>
            <PoseGroup>
                {menuVisible && (
                    <Menu key="menu" className="menu general-menu">
                        <div className="menu-wrap">
                            <ul className="menu-main">
                                <Link
                                    to="/"
                                    onClick={e => {
                                        hamRef.current.classList.toggle(
                                            "active"
                                        );
                                        menuVisible
                                            ? changeMenuVisible(false)
                                            : changeMenuVisible(true);
                                    }}
                                >
                                    <li>
                                        <h1 className="menu-item">Home</h1>
                                    </li>
                                </Link>
                                <Link
                                    to="./../movie"
                                    onClick={e => {
                                        hamRef.current.classList.toggle(
                                            "active"
                                        );
                                        menuVisible
                                            ? changeMenuVisible(false)
                                            : changeMenuVisible(true);
                                    }}
                                >
                                    <li>
                                        <h1 className="menu-item">Movies</h1>
                                    </li>
                                </Link>
                                <Link
                                    to="./../tv"
                                    onClick={e => {
                                        hamRef.current.classList.toggle(
                                            "active"
                                        );
                                        menuVisible
                                            ? changeMenuVisible(false)
                                            : changeMenuVisible(true);
                                    }}
                                >
                                    <li>
                                        <h1 className="menu-item">TV-Shows</h1>
                                    </li>
                                </Link>
                                <Link
                                    to="./../search"
                                    onClick={e => {
                                        hamRef.current.classList.toggle(
                                            "active"
                                        );
                                        menuVisible
                                            ? changeMenuVisible(false)
                                            : changeMenuVisible(true);
                                    }}
                                >
                                    <li>
                                        <h1 className="menu-item">Search</h1>
                                    </li>
                                </Link>
                                {!loggedIn && (
                                    <Link
                                        to="./../login"
                                        onClick={e => {
                                            hamRef.current.classList.toggle(
                                                "active"
                                            );
                                            menuVisible
                                                ? changeMenuVisible(false)
                                                : changeMenuVisible(true);
                                        }}
                                    >
                                        <li>
                                            <h1 className="menu-item">Login</h1>
                                        </li>
                                    </Link>
                                )}
                                {!loggedIn && (
                                    <Link
                                        to="./../register"
                                        onClick={e => {
                                            hamRef.current.classList.toggle(
                                                "active"
                                            );
                                            menuVisible
                                                ? changeMenuVisible(false)
                                                : changeMenuVisible(true);
                                        }}
                                    >
                                        <li>
                                            <h1 className="menu-item">
                                                Sign Up
                                            </h1>
                                        </li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </Menu>
                )}
            </PoseGroup>
        </header>
    );
};

export default Header;

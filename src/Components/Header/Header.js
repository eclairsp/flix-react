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
            window.location.reload();
            console.log("Logged Out");
        } else {
            changeLoggedIn(false);
            console.log("Can't Logout");
        }
    };

    return (
        <header className="header-wrapper">
            <div className="header">
                <Link to="/" className="logo-position">
                    <div className="logo">
                        <svg viewBox="0 0 83.348 39.065">
                            <g
                                aria-label="FLIX"
                                style={{
                                    lineHeight: 1.25
                                }}
                                fontWeight={400}
                                fontSize={50.8}
                                fontFamily="ShadowW90-Gothic"
                                letterSpacing={0}
                                wordSpacing={0}
                                strokeWidth={0.265}
                                fill="#ff5252"
                            >
                                <path
                                    d="M16.662 9.042H9.855v4.877h2.388l3.86 3.455v5.842H9.856v15.85H3.302L0 35.762V0h12.852l3.81 3.404zm-4.318-3.911V.813H.864v34.442H5.69V19.304h6.096V14.63H5.69v-9.5zM34.921 39.065H21.408l-3.251-3.302V0h6.248l3.81 3.454v25.908h2.845l3.861 3.455zm-4.318-3.81v-5.08h-6.706V.813h-4.876v34.442zM46.07 39.065h-6.604l-3.251-3.302V0h6.4l3.455 3.404zm-4.166-3.81V.813h-4.826v34.442zM69.648 39.065h-7.67l-2.845-3.302-.61-1.88-1.27 5.182h-6.807l-3.607-3.302 6.198-17.983L47.347 0h7.214l3.403 3.15.712-3.15h6.654l3.556 3.556-5.69 16.51zm-4.267-3.81l-6.4-18.135L64.567.813h-5.283l-2.641 11.074L53.748.813h-5.283l5.486 16.916-5.994 17.526h5.385l2.895-13.259 3.709 13.26z"
                                    style={{
                                        InkscapeFontSpecification:
                                            "ShadowW90-Gothic"
                                    }}
                                />
                                <path
                                    d="M80.217 38.979h-6.604l-3.252-3.302V-.087h6.401l3.455 3.404zm-4.166-3.81V.726h-4.826V35.17z"
                                    style={{
                                        lineHeight: 1.25,
                                        InkscapeFontSpecification:
                                            "ShadowW90-Gothic"
                                    }}
                                />
                            </g>
                        </svg>
                    </div>
                </Link>

                <SearchBox />

                {loggedIn && !menuVisible && (
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
                        <Link to="./../register">
                            <h1
                                className="menu-item user-btn"
                                aria-label="Sign Up button"
                            >
                                Sign Up
                            </h1>
                        </Link>
                        <Link to="./../login">
                            <h1
                                className="menu-item user-btn"
                                aria-label="Login button"
                            >
                                Login
                            </h1>
                        </Link>
                    </section>
                )}

                {!userMenu && (
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
                )}
            </div>
            <PoseGroup>
                {userMenu && (
                    <Menu key="menu" className="menu user-menu">
                        <div className="menu-wrap">
                            <ul className="menu-main">
                                {loggedIn && (
                                    <Link
                                        to={`/user/${name}`}
                                        onClick={() => {
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
                                        onClick={() => {
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
                                    onClick={() => {
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
                                    onClick={() => {
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
                                    onClick={() => {
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
                                    onClick={() => {
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
                                        onClick={() => {
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
                                        onClick={() => {
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

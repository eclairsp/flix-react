import React, {useState, useRef, useEffect} from "react";
import {Link} from "@reach/router";
import posed, {PoseGroup} from "react-pose";
import flixLogo from "../../FLIX.svg";
import SearchBox from "./../SearchBox/SearchBox";
import tryLogout from "../Fetch/logout";
import tryGettingUser from "../Fetch/getUser";
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

        getUser();
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
                        <img src={flixLogo} className="logo" alt="flix-logo" />
                    </div>
                </Link>

                <SearchBox />

                {name !== "" && (
                    <section
                        className="profile-pic"
                        onClick={() => changeUserMenu(!userMenu)}
                    >
                        <img
                            src={`https://prab-flix-api.herokuapp.com/user/${name}/avatar`}
                            alt="profile pic"
                            className="profile-pic-image"
                        />
                        {userMenu && (
                            <ul className="profile-pic-options">
                                {loggedIn && (
                                    <Link to={`/user/${name}`}>
                                        <li>Watchlist</li>
                                    </Link>
                                )}
                                {loggedIn && (
                                    <li onClick={() => handleLogout()}>
                                        Sign out
                                    </li>
                                )}
                            </ul>
                        )}
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
                {menuVisible && (
                    <Menu key="menu" className="menu">
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
                            </ul>
                        </div>
                    </Menu>
                )}
            </PoseGroup>
        </header>
    );
};

export default Header;

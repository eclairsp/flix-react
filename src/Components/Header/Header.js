import React, {useState, useRef} from "react";
import {Link} from "@reach/router";
import posed, {PoseGroup} from "react-pose";
import flixLogo from "../../FLIX.svg";
import SearchBox from "./../SearchBox/SearchBox";
import "./header.css";

const Menu = posed.div({
    enter: {y: 0, opacity: 1, transition: {duration: 300}},
    exit: {y: 100, opacity: 0, transition: {duration: 300}}
});

const Top = props => {
    const [menuVisible, changeMenuVisible] = useState(false);
    const hamRef = useRef();
    return (
        <header className="header-wrapper">
            <div className="header">
                <Link to="/">
                    <div className="logo">
                        <img src={flixLogo} className="logo" alt="flix-logo" />
                    </div>
                </Link>
                <SearchBox />
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

export default Top;

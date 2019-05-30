import React, {useRef} from "react";
import {Link} from "@reach/router";
import flixLogo from "../../FLIX.svg";
import SearchBox from "./../SearchBox/SearchBox";
import "./header.css";

const Top = props => {
    const menuRef = useRef();
    const hamRef = useRef();
    return (
        <header className="header-wrapper">
            {/* <div className="menu">
                    <svg className="svg-icon-menu svg-icon" viewBox="0 0 20 20">
                        <path
                            fill="none"
                            d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
                                    c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
                                    s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
                                    c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
                        />
                    </svg>
                </div> */}
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
                        menuRef.current.classList.toggle("menu-active");
                        hamRef.current.classList.toggle("active");
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
            <div className="menu" ref={menuRef}>
                <div className="menu-wrap">
                    <ul className="menu-main">
                        <Link
                            to="/"
                            onClick={e => {
                                menuRef.current.classList.toggle("menu-active");
                                hamRef.current.classList.toggle("active");
                            }}
                        >
                            <li>
                                <h1 className="menu-item">Home</h1>
                            </li>
                        </Link>
                        <Link
                            to="./../movie"
                            onClick={e => {
                                menuRef.current.classList.toggle("menu-active");
                                hamRef.current.classList.toggle("active");
                            }}
                        >
                            <li>
                                <h1 className="menu-item">Movies</h1>
                            </li>
                        </Link>
                        <Link
                            to="./../search"
                            onClick={e => {
                                menuRef.current.classList.toggle("menu-active");
                                hamRef.current.classList.toggle("active");
                            }}
                        >
                            <li>
                                <h1 className="menu-item">Search</h1>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Top;

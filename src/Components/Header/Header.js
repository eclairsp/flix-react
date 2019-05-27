import React from "react";
import flixLogo from "../../FLIX.svg";
import "./header.css";

const Top = props => {
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
                <div className="logo">
                    <img src={flixLogo} className="logo" alt="flix-logo" />
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search any Movie, TV-Show, Celeb"
                        className="search-input"
                    />
                    <button className="search-btn">
                        <svg
                            className="svg-icon-search svg-icon"
                            viewBox="0 0 20 20"
                        >
                            <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Top;

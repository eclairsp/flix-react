import React from "react";
import {Link} from "@reach/router";
import john from "./../../john-300.jpg";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "./search.css";

const Search = props => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    return (
        <section className="search-results">
            <h1 className="heading result-heading home-heading color-orange">
                Search results for {props.query}
            </h1>
            <div className="results-search-wrapper">
                <div className="results-search">
                    {arr.map((val, index) => {
                        return (
                            <Link
                                to={"./../../movie/" + index}
                                key={index}
                                className="card card-res"
                            >
                                <div>
                                    <LazyLoadImage
                                        alt="ppster"
                                        effect="blur"
                                        src={john}
                                    />
                                    <div className="data">
                                        <h3 className="card-movie-name">
                                            John wick {val}
                                        </h3>
                                        <h4 className="card-release-date">
                                            24 May, 2019
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Search;

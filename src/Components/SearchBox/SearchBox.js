import React, {Component} from "react";
import posed, {PoseGroup} from "react-pose";
import {navigate, Link} from "@reach/router";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import search45 from "./../../search-45.png";
import "./search-box.css";

const configInput = {
    off: {
        opacity: 1,
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        borderBottomLeftRadius: "10px"
    },
    on: {
        opacity: 1,
        borderBottomRightRadius: "0",
        borderBottomLeftRadius: "0"
    }
};

const configBtn = {
    off: {
        opacity: 1,
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "0"
    },
    on: {
        opacity: 1,
        borderBottomRightRadius: "0"
    }
};

const Result = posed.div({
    enter: {opacity: 1, transition: {duration: 300}},
    exit: {opacity: 0, transition: {duration: 300}}
});

const Input = posed.input(configInput);
const Btn = posed.button(configBtn);

class SearchBox extends Component {
    state = {
        inputBorder: false,
        resultVisible: false,
        placeholder: "Search any Movie, TV-Show, Celeb",
        query: "",
        resultHead: [],
        resultSecHead: [],
        resultLastHead: [],
        resultImg: [],
        resultId: []
    };

    componentDidMount() {
        document.addEventListener("click", () => {
            this.setState({
                inputBorder: false,
                resultVisible: false
            });
        });
    }

    searchMovie = query => {
        let urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=74d9bb95f2c26a20a3f908c481d10af3&query=${query}&sort_by=popularity.asc`;

        fetch(urlSearch)
            .then(res => res.json())
            .then(data => {
                delete data.page;
                delete data.total_results;
                let head = [];
                let secHead = [];
                let lastHead = [];
                let img = [];
                let id = [];
                data.results.map(val => {
                    if (val.media_type === "movie") {
                        head.push(val.title);
                        secHead.push(val.release_date);
                        lastHead.push("movie");
                        img.push(val.poster_path);
                        id.push(val.id);
                    } else if (val.media_type === "tv") {
                        head.push(val.name);
                        secHead.push(val.first_air_date);
                        lastHead.push("TV");
                        img.push(val.poster_path);
                        id.push(val.id);
                    } else if (val.media_type === "person") {
                        head.push(val.name);
                        secHead.push(
                            val.known_for[0] === null ||
                                val.known_for[0] === undefined
                                ? ""
                                : `known for, ${val.known_for[0].title}`
                        );
                        lastHead.push("celeb");
                        img.push(val.profile_path);
                        id.push(val.id);
                    }
                    return null;
                });

                this.setState({
                    resultHead: head.slice(0, 5),
                    resultSecHead: secHead.slice(0, 5),
                    resultLastHead: lastHead.slice(0, 5),
                    resultImg: img.slice(0, 5),
                    resultId: id.slice(0, 5)
                });
            });
    };

    handleQueryChange = e => {
        if (e.target.value === "") {
            this.setState({
                inputBorder: false,
                resultVisible: false,
                placeholder: "Search any Movie, TV-Show, Celeb",
                query: ""
            });
        } else {
            this.setState({
                inputBorder: true,
                resultVisible: true,
                placeholder: "Search any Movie, TV-Show, Celeb",
                query: e.target.value
            });
            this.searchMovie(e.target.value);
        }
    };

    handleBtnClick = () => {
        if (this.state.query === "") {
            this.setState({placeholder: "Enter something!!"});
        } else {
            this.setState({
                placeholder: "Search any Movie, TV-Show, Celeb"
            });
            navigate(`./../search/${this.state.query}`);
        }
    };

    handleSuggestClick = index => {
        if (this.state.resultLastHead[index] === "movie") {
            navigate(`./../movie/${this.state.resultId[index]}`);
        } else if (this.state.resultLastHead[index] === "TV") {
            if (window.location.href.includes("season")) {
                navigate(`./../../../../tv/${this.state.resultId[index]}`);
            } else {
                navigate(`./../tv/${this.state.resultId[index]}`);
            }
        }
    };

    render() {
        return (
            <div className="search-container">
                <Input
                    type="text"
                    placeholder={this.state.placeholder}
                    className="search-input"
                    onChange={e => this.handleQueryChange(e)}
                    pose={this.state.inputBorder ? "on" : "off"}
                />
                <Btn
                    className="search-btn"
                    onClick={() => this.handleBtnClick()}
                    pose={this.state.inputBorder ? "on" : "off"}
                >
                    <svg
                        className="svg-icon-search svg-icon"
                        viewBox="0 0 20 20"
                    >
                        <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z" />
                    </svg>
                </Btn>
                <PoseGroup>
                    {this.state.resultVisible && (
                        <Result key="results" className="result">
                            <ul>
                                {this.state.resultHead.map((val, index) => {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                this.handleSuggestClick(index)
                                            }
                                        >
                                            <div className="result-card">
                                                <LazyLoadImage
                                                    src={
                                                        this.state.resultImg[
                                                            index
                                                        ] === null
                                                            ? search45
                                                            : `http://image.tmdb.org/t/p/w45/${
                                                                  this.state
                                                                      .resultImg[
                                                                      index
                                                                  ]
                                                              }`
                                                    }
                                                    alt={val}
                                                    className="result-img"
                                                    placeholderSrc={search45}
                                                    effec="blur"
                                                    onError={e =>
                                                        (e.target.src = search45)
                                                    }
                                                />
                                                <div className="result-info">
                                                    <h5 className="result-text">
                                                        {val}
                                                    </h5>
                                                    <h5 className="result-text">
                                                        {this.state.resultSecHead[
                                                            index
                                                        ].includes("known for,")
                                                            ? this.state
                                                                  .resultSecHead[
                                                                  index
                                                              ]
                                                            : new Date(
                                                                  this.state.resultSecHead[
                                                                      index
                                                                  ]
                                                              ).toDateString()}
                                                    </h5>
                                                    <h5 className="result-text">
                                                        {
                                                            this.state
                                                                .resultLastHead[
                                                                index
                                                            ]
                                                        }
                                                    </h5>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                                <li>
                                    <Link
                                        to={`./../search/${this.state.query}`}
                                        className="all-text"
                                    >
                                        View all
                                    </Link>
                                </li>
                            </ul>
                        </Result>
                    )}
                </PoseGroup>
            </div>
        );
    }
}

export default SearchBox;

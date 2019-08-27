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
        background: "#101010"
    },
    on: {
        opacity: 1,
        background: "#000"
    }
};

const configBtn = {
    off: {
        opacity: 1,
        background: "transparent"
    },
    on: {
        opacity: 1,
        background: "#000"
    }
};

const Result = posed.div({
    enter: {opacity: 1, transition: {duration: 300}},
    exit: {opacity: 0, transition: {duration: 300}}
});

const Input = posed.input(configInput);
const Btn = posed.button(configBtn);

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputBorder: false,
            resultVisible: false,
            placeholder: "Search any Movie, TV-Show, Celeb",
            query: "",
            resultHead: [],
            resultSecHead: [],
            resultLastHead: [],
            resultImg: [],
            resultId: [],
            cache:
                localStorage.getItem("cache") === null ||
                localStorage.getItem("cache") === undefined
                    ? {}
                    : JSON.parse(localStorage.getItem("cache")),
            activeElement: 0
        };

        this.searchListRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("click", () => {
            this.setState({
                inputBorder: false,
                resultVisible: false
            });
        });
    }

    searchMovie = async query => {
        let urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=74d9bb95f2c26a20a3f908c481d10af3&query=${query}`;

        const res = await fetch(urlSearch);
        return await res.json();
    };

    setResults = data => {
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
                    val.known_for[0] === null || val.known_for[0] === undefined
                        ? ""
                        : `known for, ${val.known_for[0].title}`
                );
                lastHead.push("celeb");
                img.push(val.profile_path);
                id.push(val.id);
            }
            return null;
        });

        // 5 because, only want to display five results in suggestions of search
        this.setState({
            resultHead: head.slice(0, 5),
            resultSecHead: secHead.slice(0, 5),
            resultLastHead: lastHead.slice(0, 5),
            resultImg: img.slice(0, 5),
            resultId: id.slice(0, 5)
        });
    };

    cache = query => {
        if (this.state.cache[query]) {
            this.setResults(this.state.cache[query]);
        } else {
            this.searchMovie(query).then(data => {
                this.setState(prevState => ({
                    cache: {
                        // object that we want to update
                        ...prevState.cache, // keep all other key-value pairs
                        [query]: data // update the value of specific key
                        // use [query] it will make the key value of query, i.e. the typed words instead of "query"
                    }
                }));
                localStorage.setItem("cache", JSON.stringify(this.state.cache));
                this.setResults(data);
            });
        }
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
                query: e.target.value,
                activeElement: 0
            });
            this.cache(e.target.value);
        }
    };

    // On input change, call the cache fucntion.
    // cache function will check if query is found in cache.
    // if yes set the states no need for fetch.
    // if no fetch the results, save in cache, set the states
    // reduces fetch for typos.

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

    handleKeyboardPress = e => {
        let keyPressed = e.keyCode || e.which;
        if (keyPressed === 13) {
            this.setState({
                inputBorder: false,
                resultVisible: false,
                activeElement: 0
            });
            navigate(`./../search/${this.state.query}`);
        } else if (keyPressed === 40 && this.searchListRef.current !== null) {
            if (this.state.activeElement <= 4) {
                if (this.state.activeElement !== 0) {
                    this.searchListRef.current.children[
                        this.state.activeElement - 1
                    ].children[0].classList.remove("search-result-active");
                }

                this.searchListRef.current.children[
                    this.state.activeElement
                ].children[0].classList.add("search-result-active");

                this.setState({
                    activeElement:
                        this.state.activeElement === 4
                            ? 4
                            : this.state.activeElement + 1
                });
                console.log(this.state.activeElement);
            }
        } else if (keyPressed === 38 && this.searchListRef.current !== null) {
            if (this.state.activeElement <= 4 && this.state.activeElement > 0) {
                if (this.state.activeElement !== 0) {
                    this.searchListRef.current.children[
                        this.state.activeElement
                    ].children[0].classList.remove("search-result-active");
                }

                this.searchListRef.current.children[
                    this.state.activeElement - 1
                ].children[0].classList.add("search-result-active");
            }

            console.log(this.state.activeElement);

            this.setState({
                activeElement:
                    this.state.activeElement === 4
                        ? 3
                        : this.state.activeElement - 1
            });
        }
    };

    render() {
        return (
            <div className="search-container">
                <Input
                    placeholder={this.state.placeholder}
                    className="search-input"
                    onChange={e => this.handleQueryChange(e)}
                    onKeyDown={e => this.handleKeyboardPress(e)}
                    pose={this.state.inputBorder ? "on" : "off"}
                    aria-label="Input what you want to search?"
                />
                <Btn
                    className="search-btn"
                    onClick={() => this.handleBtnClick()}
                    pose={this.state.inputBorder ? "on" : "off"}
                    aria-label="Search Button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-icon-search svg-icon"
                        viewBox="0 0 512 512"
                    >
                        <path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z" />
                    </svg>
                </Btn>
                <PoseGroup>
                    {this.state.resultVisible && (
                        <Result key="results" className="result">
                            <ul ref={this.searchListRef}>
                                {this.state.resultHead.map((val, index) => {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                this.handleSuggestClick(index)
                                            }
                                            // className="search-result-active"
                                        >
                                            <div className="result-card">
                                                <LazyLoadImage
                                                    src={
                                                        this.state.resultImg[
                                                            index
                                                        ] === null
                                                            ? search45
                                                            : `https://image.tmdb.org/t/p/w45/${this.state.resultImg[index]}`
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

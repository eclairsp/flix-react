import React from "react";
import {navigate} from "@reach/router";
import posed, {PoseGroup} from "react-pose";
import {Helmet} from "react-helmet";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import celeb154 from "./../../celeb-154.png";
import "./user.css";
import "./../Search/search.css";
import removeFav from "../Fetch/removeFav";
import Notify from "../Notification/Notify";

const Item = posed.li();

const Hom = posed.div({
    enter: {y: 0, opacity: 1, delay: 300},
    exit: {
        y: 100,
        opacity: 0,
        transition: {duration: 200}
    }
});

class User extends React.Component {
    state = {
        username: this.props.username,
        resultHead: [],
        resultSecHead: [],
        resultLastHead: [],
        resultImg: [],
        resultId: [],
        areFav:
            sessionStorage.getItem("favs") !== null ||
            JSON.parse(sessionStorage.getItem("favs")).length === 0
                ? false
                : true,
        addToWatchlistLoading: false,
        clickedId: "",
        notification: {
            show: false,
            message: ""
        }
    };

    componentDidMount() {
        this.fetchFavs();
    }

    Fav = async (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            addToWatchlistLoading: true,
            clickedId: this.state.resultId[index].toString()
        });
        const isRemoved = await removeFav(
            this.state.resultId[index].toString(),
            this.state.resultLastHead[index]
        );
        if (isRemoved) {
            this.notify("Removed from your watchlist!");
            this.fetchFavs();
            this.setState({
                addToWatchlistLoading: false,
                clickedId: ""
            });
        }
    };

    notify = message => {
        this.setState({
            notification: {
                show: true,
                message: message
            }
        });
        setTimeout(() => {
            this.setState({
                notification: {
                    show: false,
                    message: ""
                }
            });
        }, 2000);
    };

    fetchFavs = () => {
        let favs = JSON.parse(sessionStorage.getItem("favs"));
        this.setState({
            resultHead: [],
            resultSecHead: [],
            resultLastHead: [],
            resultImg: [],
            resultId: [],
            areFav: false
        });

        favs.forEach(val => {
            switch (val.type) {
                case "movie":
                    const urlMovie = `https://api.themoviedb.org/3/movie/${
                        val.tmdbID
                    }?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US`;

                    this.fetchInfo(urlMovie, "movie");
                    break;

                case "tv":
                    const urlTV = `https://api.themoviedb.org/3/tv/${
                        val.tmdbID
                    }?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US`;

                    this.fetchInfo(urlTV, "tv");
                    break;
                default:
                    break;
            }
        });
    };

    fetchInfo = (url, type) => {
        fetch(url)
            .then(res => res.json())
            .then(val => {
                if (type === "movie") {
                    this.setState({
                        resultHead: [...this.state.resultHead, val.title],
                        resultSecHead: [
                            ...this.state.resultSecHead,
                            val.release_date
                        ],
                        resultLastHead: [...this.state.resultLastHead, "movie"],
                        resultImg: [...this.state.resultImg, val.poster_path],
                        resultId: [...this.state.resultId, val.id],
                        areFav: true
                    });
                } else if (type === "tv") {
                    this.setState({
                        resultHead: [...this.state.resultHead, val.name],
                        resultSecHead: [
                            ...this.state.resultSecHead,
                            val.first_air_date
                        ],
                        resultLastHead: [...this.state.resultLastHead, "tv"],
                        resultImg: [...this.state.resultImg, val.poster_path],
                        resultId: [...this.state.resultId, val.id],
                        areFav: true
                    });
                }
                return null;
            });
    };

    handleCardClick = index => {
        if (this.state.resultLastHead[index] === "movie") {
            navigate(`./../movie/${this.state.resultId[index]}`);
        } else if (this.state.resultLastHead[index] === "TV") {
            navigate(`./../tv/${this.state.resultId[index]}`);
        }
    };

    render() {
        return (
            <Hom>
                {this.state.areFav && (
                    <section className="search-results">
                        <Helmet>
                            <title>{`Search results for "${
                                this.props.query
                            }" | FLIX`}</title>
                        </Helmet>
                        <h1 className="heading result-heading home-heading color-orange">
                            {`Watchlist of ${this.props.username}`}
                        </h1>
                        <div className="results-search-wrapper">
                            <div className="results-search">
                                <PoseGroup>
                                    {this.state.resultHead.map((val, index) => {
                                        return (
                                            <Item
                                                className="card-after-result"
                                                onClick={() =>
                                                    this.handleCardClick(index)
                                                }
                                                key={this.state.resultId[index]}
                                            >
                                                {this.state
                                                    .addToWatchlistLoading &&
                                                this.state.resultId[
                                                    index
                                                ].toString() ===
                                                    this.state.clickedId ? (
                                                    <div className="spinner-user">
                                                        <div className="double-bounce1" />
                                                        <div className="double-bounce2" />
                                                    </div>
                                                ) : (
                                                    // <span
                                                    //     className="remove"
                                                    //     role="img"
                                                    //     aria-label="love"
                                                    //     onClick={async e =>
                                                    //         this.Fav(e, index)
                                                    //     }
                                                    // >
                                                    //     &#128155;
                                                    // </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                        width="40"
                                                        height="40"
                                                        fill="#f9a602"
                                                        aria-label="love"
                                                        className="remove"
                                                        onClick={async e =>
                                                            this.Fav(e, index)
                                                        }
                                                    >
                                                        <path d="M170.718 216.482L141.6 245.6l93.6 93.6 208-208-29.118-29.118L235.2 279.918l-64.482-63.436zM422.4 256c0 91.518-74.883 166.4-166.4 166.4S89.6 347.518 89.6 256 164.482 89.6 256 89.6c15.6 0 31.2 2.082 45.764 6.241L334 63.6C310.082 53.2 284.082 48 256 48 141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208h-41.6z" />
                                                    </svg>
                                                )}
                                                <LazyLoadImage
                                                    className="result-full-img"
                                                    src={
                                                        this.state.resultImg[
                                                            index
                                                        ] === null
                                                            ? celeb154
                                                            : `https://image.tmdb.org/t/p/w154/${
                                                                  this.state
                                                                      .resultImg[
                                                                      index
                                                                  ]
                                                              }`
                                                    }
                                                    alt={val}
                                                    placeholderSrc={celeb154}
                                                    effect="blur"
                                                    onError={e =>
                                                        (e.target.src = celeb154)
                                                    }
                                                />
                                                <div className="result-full-info">
                                                    <h3 className="heading color-orange card-after-result-head">
                                                        {val}
                                                    </h3>
                                                    <h3 className="heading">
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
                                                    </h3>
                                                    <h3 className="heading">
                                                        {
                                                            this.state
                                                                .resultLastHead[
                                                                index
                                                            ]
                                                        }
                                                    </h3>
                                                </div>
                                            </Item>
                                        );
                                    })}
                                </PoseGroup>
                            </div>
                        </div>
                    </section>
                )}
                {!this.state.areFav && (
                    <>
                        <Helmet>
                            <title>{this.props.username}'s profile</title>
                        </Helmet>

                        <LoadingAnimation
                            message="Your favourites will show up here"
                            animation={false}
                        />
                    </>
                )}
                <Notify
                    notify={this.state.notification.show}
                    message={this.state.notification.message}
                />
            </Hom>
        );
    }
}

export default User;

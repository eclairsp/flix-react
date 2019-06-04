import React, {useState, useEffect, useRef} from "react";
import {Link} from "@reach/router";
import {LazyLoadImage} from "react-lazy-load-image-component";
import MovieSlider from "./../../Components/MovieSlider/MovieSlider";
import poster342 from "./../../poster-342.png";
import backdrop300 from "../../backdrop-300.png";
import celeb154 from "./../../celeb-154.png";
import LoadingAnimation from "./../LoadingAnimation/LoadingAnimation";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./../MovieInfo/movie-info.css";
import "./tv-info.css";

const TvInfo = props => {
    const [tvInfo, changeTvInfo] = useState([]);
    const [videoSrc, changeVideoSrc] = useState([]);
    const [cast, changeCast] = useState([]);
    const [similar, changeSimilar] = useState([]);
    const [loaded, changeLoaded] = useState(false);
    const backgroundRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            let urlMovie = `https://api.themoviedb.org/3/tv/${
                props.tvId
            }?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US`;
            let urlVideo = `https://api.themoviedb.org/3/tv/${
                props.tvId
            }/videos?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US`;
            let urlCast = `
            https://api.themoviedb.org/3/tv/${
                props.tvId
            }/credits?api_key=74d9bb95f2c26a20a3f908c481d10af3`;
            let urlSimilar = `https://api.themoviedb.org/3/tv/${
                props.tvId
            }/similar?api_key=74d9bb95f2c26a20a3f908c481d10af3&language=en-US&page=1`;

            fetch(urlMovie)
                .then(res => res.json())
                .then(data => {
                    changeTvInfo(data);
                    if (
                        (backgroundRef.current !== undefined ||
                            backgroundRef.current !== null) &&
                        window.innerWidth > 600
                    ) {
                        setTimeout(
                            (backgroundRef.current.style.backgroundImage = `linear-gradient(270deg, rgba(0, 0, 0, 0.7) 40%, rgba(16, 16, 16, 0.5) 80%, rgba(16, 16, 16, 0.3) 90%), url(https://image.tmdb.org/t/p/original/${
                                data.backdrop_path
                            })`),
                            400
                        );
                    }
                });

            fetch(urlVideo)
                .then(res => res.json())
                .then(data => {
                    changeVideoSrc(data.results);
                });

            fetch(urlCast)
                .then(res => res.json())
                .then(data => {
                    delete data.id;
                    changeCast(data);
                });

            fetch(urlSimilar)
                .then(res => res.json())
                .then(data => {
                    changeSimilar(data.results);
                });

            changeLoaded(true);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loaded && (
                <>
                    <div className="center-details" ref={backgroundRef}>
                        <section className="details-1">
                            <div className="car">
                                <div className="poster">
                                    <LazyLoadImage
                                        className="poster-main"
                                        src={
                                            tvInfo.poster_path === null
                                                ? poster342
                                                : `https://image.tmdb.org/t/p/w342/${
                                                      tvInfo.poster_path
                                                  }`
                                        }
                                        alt={`${tvInfo.name} poster`}
                                        placeholderSrc={poster342}
                                        effect="blur"
                                        onError={e =>
                                            (e.target.src = poster342)
                                        }
                                    />
                                </div>
                                <article className="movie-main-info">
                                    <h1 className="heading heading-details color-orange">
                                        {tvInfo.name}
                                    </h1>
                                    <h2 className="heading heading-details">
                                        {new Date(
                                            tvInfo.first_air_date
                                        ).toDateString()}
                                    </h2>
                                    <h2 className="heading heading-details">
                                        Overview,
                                    </h2>
                                    <p className="synopsis">
                                        {tvInfo.overview}
                                    </p>
                                    <h2 className="heading heading-details">
                                        IMDB: 7.1/10
                                    </h2>
                                    <h2 className="heading heading-details">
                                        Rotten Tomatoes: 81%
                                    </h2>
                                </article>
                            </div>
                        </section>
                    </div>
                    <section className="season">
                        <Link
                            to={`./../season/${props.tvId}/${tvInfo.name}/${
                                tvInfo.number_of_seasons
                            }`}
                            className="season-link"
                        >
                            <h1 className="all-season color-orange">
                                Season Information
                            </h1>
                        </Link>
                    </section>
                    <div className="center-next">
                        <section className="movie-main-details">
                            <div className="cast-crew">
                                <h1 className="heading color-orange">
                                    Cast and Crew
                                </h1>
                                <h2 className="heading">
                                    Created By,{" "}
                                    {tvInfo.created_by === undefined
                                        ? "not found"
                                        : tvInfo.created_by.map(val => {
                                              return val.name + " | ";
                                          })}
                                </h2>
                                <div className="cast">
                                    <MovieSlider>
                                        {cast.cast === undefined
                                            ? "not found"
                                            : cast.cast.map((val, index) => {
                                                  return (
                                                      <div
                                                          className="card card-r"
                                                          key={index}
                                                      >
                                                          <div>
                                                              <LazyLoadImage
                                                                  className="image"
                                                                  src={
                                                                      val.profile_path ===
                                                                      null
                                                                          ? celeb154
                                                                          : `https://image.tmdb.org/t/p/w154/${
                                                                                val.profile_path
                                                                            }`
                                                                  }
                                                                  alt={val.name}
                                                                  placeholderSrc={
                                                                      celeb154
                                                                  }
                                                                  effect="blur"
                                                                  onError={e =>
                                                                      (e.target.src = celeb154)
                                                                  }
                                                              />
                                                          </div>
                                                          <div>
                                                              <h4 className="cast-name">
                                                                  {val.name}
                                                              </h4>
                                                              <h5 className="cast-name">
                                                                  {
                                                                      val.character
                                                                  }
                                                              </h5>
                                                          </div>
                                                      </div>
                                                  );
                                              })}
                                    </MovieSlider>
                                </div>
                            </div>
                            <div className="trailer">
                                <h1 className="heading color-orange">Videos</h1>
                                <div className="video-slider">
                                    <MovieSlider type="full">
                                        {videoSrc === undefined
                                            ? "no videos found"
                                            : videoSrc
                                                  .reverse()
                                                  .map((val, index) => {
                                                      return (
                                                          <div
                                                              className="video-card"
                                                              key={index}
                                                          >
                                                              <div className="video">
                                                                  <iframe
                                                                      title={`${
                                                                          val.name
                                                                      } trailer`}
                                                                      src={`https://www.youtube-nocookie.com/embed/${
                                                                          val.key
                                                                      }`}
                                                                      frameBorder="0"
                                                                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                                      allowFullScreen
                                                                  />
                                                              </div>
                                                          </div>
                                                      );
                                                  })}
                                    </MovieSlider>
                                </div>
                            </div>
                            <div className="all-movie-details">
                                <h1 className="heading color-orange">
                                    Details
                                </h1>
                                <article className="details-main">
                                    <div className="rating">
                                        <h3 className="heading">Seasons</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {tvInfo.number_of_seasons}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="genres">
                                        <h3 className="heading">Genres</h3>
                                        <div className="tags">
                                            {tvInfo.genres === undefined
                                                ? "no genre found"
                                                : tvInfo.genres.map(
                                                      (val, index) => {
                                                          return (
                                                              <div
                                                                  key={index}
                                                                  className="genre__tag"
                                                              >
                                                                  {val.name}
                                                              </div>
                                                          );
                                                      }
                                                  )}
                                        </div>
                                    </div>
                                    <div className="production">
                                        <h3 className="heading">
                                            Production Companies
                                        </h3>
                                        <div className="tags">
                                            {tvInfo.production_companies ===
                                            undefined
                                                ? "no genre found"
                                                : tvInfo.production_companies.map(
                                                      (val, index) => {
                                                          return (
                                                              <div
                                                                  key={index}
                                                                  className="genre__tag"
                                                              >
                                                                  {val.name}
                                                              </div>
                                                          );
                                                      }
                                                  )}
                                        </div>
                                    </div>
                                    <div className="runtime">
                                        <h3 className="heading">
                                            Total episodes
                                        </h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {tvInfo.number_of_episodes}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="budget">
                                        <h3 className="heading">Type</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {tvInfo.type}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-office">
                                        <h3 className="heading">Status</h3>
                                        <div className="tags">
                                            <div className="genre__tag">
                                                {tvInfo.status}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </section>
                    </div>

                    <section className="recommendations home-width">
                        <div className="recommend-heading-wrapper">
                            <h1 className="heading recommend-heading color-orange">
                                Similar TV-Shows
                            </h1>
                        </div>
                        <MovieSlider>
                            {similar === undefined
                                ? "not found"
                                : similar.map((val, index) => {
                                      return (
                                          <Link
                                              to={"./../../tv/" + val.id}
                                              key={index}
                                              className="card"
                                              onClick={window.scrollTo(0, 0)}
                                          >
                                              <div>
                                                  <LazyLoadImage
                                                      src={
                                                          val.backdrop_path ===
                                                          null
                                                              ? backdrop300
                                                              : `https://image.tmdb.org/t/p/w300/${
                                                                    val.backdrop_path
                                                                }`
                                                      }
                                                      alt="poster"
                                                      className="card-image"
                                                      placeholderSrc={
                                                          backdrop300
                                                      }
                                                      effec="blur"
                                                      onError={e =>
                                                          (e.target.src = backdrop300)
                                                      }
                                                  />
                                                  <div className="data">
                                                      <h3 className="card-movie-name">
                                                          {val.name}
                                                      </h3>
                                                      <h4 className="card-release-date">
                                                          {new Date(
                                                              val.first_air_date
                                                          ).toDateString()}
                                                      </h4>
                                                  </div>
                                              </div>
                                          </Link>
                                      );
                                  })}
                        </MovieSlider>
                    </section>
                </>
            )}
            {!loaded && (
                <LoadingAnimation animation={true} message="LOADING..." />
            )}
        </>
    );
};

export default TvInfo;

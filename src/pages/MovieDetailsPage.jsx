import React, { Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/api';
import NoPoster from 'assets/no-poster-available.jpg';
import { Loader } from 'components/Loader/Loader';
import { BackLink } from 'components/BackLink/BackLink';

const MovieDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieData, setMovieData] = useState([]);
  const { movieId } = useParams();
  // console.log(movieId);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getMovieDetails(movieId);
        // console.log(data);
        setMovieData(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [movieId]);

  const Vote = movieData?.vote_average
    ? `${(movieData?.vote_average * 10).toFixed(0)}%`
    : 'Without vote';
  const Genres = movieData?.genres?.map(genre => genre.name).join(', ');

  return (
    <>
      {isLoading && <Loader />}

      {error && !isLoading && (
        <h2 style={{ textAlign: 'center' }}>
          Try again. Something went wrong!
        </h2>
      )}

      {!error && !isLoading && movieData && (
        <div>
          <BackLink to={backLinkLocationRef.current} children={'Go back'} />
          <div>
            <img
              src={
                movieData?.poster_path
                  ? `https://image.tmdb.org/t/p/original${movieData?.poster_path}`
                  : NoPoster
              }
              alt={movieData?.title || movieData?.original_title}
              width="200"
            />
          </div>
          <div>
            <h2>{movieData?.title || movieData?.original_title}</h2>
            <p>User score: {Vote}</p>
            {movieData?.overview?.length > 0 && (
              <>
                <h3>Overview</h3>
                <p>{movieData?.overview}</p>
              </>
            )}
            {movieData?.genres?.length > 0 && (
              <>
                <h4>Genres</h4>
                <p>{Genres}</p>
              </>
            )}
          </div>
        </div>
      )}
      <>
        <h2>Additional information</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="cast" state={{ from: location }}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" state={{ from: location }}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </nav>
      </>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
export default MovieDetailsPage;

import { Loader } from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesCast } from 'services/api';
import NoPoster from 'assets/no-poster-available.jpg';

const Cast = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  // console.log(movieId);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getMoviesCast(movieId);
        // console.log(data);
        setCast(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [movieId]);

  return (
    <>
      {/* Перевіряємо, чи відбувається завантаження */}
      {isLoading && <Loader />}
      {/* Перевіряємо, чи є помилка */}
      {error && !isLoading && cast.length === 0 && (
        <h2 style={{ textAlign: 'center' }}>
          Try again. Something went wrong!
        </h2>
      )}{' '}
      {!error && !isLoading && cast.length > 0 ? (
        <ul>
          {cast.map(cast => (
            <li key={cast.id}>
              <img
                src={
                  cast?.profile_path
                    ? `https://image.tmdb.org/t/p/original${cast?.profile_path}`
                    : NoPoster
                }
                alt={cast.name || cast.original_name}
                width="200"
              />
              <p>{cast.name || cast.original_name} </p>
              {cast?.character && <p>{cast?.character}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <h2>We don't have any cast for this movie</h2>
      )}
    </>
  );
};
export default Cast;

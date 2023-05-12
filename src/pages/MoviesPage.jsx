import { BackLink } from 'components/BackLink/BackLink';
import { Loader } from 'components/Loader/Loader';
import { MoviesGallery } from 'components/MoviesGallery/MoviesGallery';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getMovieByQuery } from 'services/api';

const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  const getMovieByValue = async value => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { results } = await getMovieByQuery(value);
      console.log(results);
      if (results.length === 0) {
        setMovies([]);
      }
      setMovies(results);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const results = await getMovieByQuery(value);
        console.log(results);
        setMovies(results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [value, query, location.state?.from]);

  const updateQueryString = e => {
    const value = e.target.value;
    if (value === '') {
      setSearchParams({});
      return;
    }
    setSearchParams({ query: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    setValue(e.target.elements.query.value);
    const value = e.target.elements.query.value;
    getMovieByValue(value);
  };

  return (
    <>
      <BackLink to={backLinkLocationRef.current} children={'Go back'} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={query}
          placeholder="search movies..."
          onChange={updateQueryString}
        />
        <button type="submit">Search</button>
      </form>
      {/* Перевіряємо, чи відбувається завантаження */}
      {isLoading && <Loader />}

      {/* Перевіряємо, чи є помилка */}
      {error && !isLoading && (
        <h2 style={{ textAlign: 'center' }}>
          Try again. Something went wrong!
        </h2>
      )}

      {!error && !isLoading && movies.length > 0 && (
        <MoviesGallery movies={movies} />
      )}
    </>
  );
};
export default MoviesPage;

import { Loader } from 'components/Loader/Loader';
import { MoviesGallery } from 'components/MoviesGallery/MoviesGallery';
import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/api';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { results } = await getTrendingMovies();
        // console.log(results);
        setMovies(results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
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
export default HomePage;

import { Loader } from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesReviews } from 'services/api';

const Reviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  // console.log(movieId);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getMoviesReviews(movieId);
        // console.log(data);
        setReviews(data);
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
      {error && !isLoading && reviews.length === 0 && (
        <h2 style={{ textAlign: 'center' }}>
          Try again. Something went wrong!
        </h2>
      )}{' '}
      {!error && !isLoading && reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>{review.author} </p>
              <p>{review.content} </p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>We don't have any reviews for this movie</h2>
      )}
    </>
  );
};
export default Reviews;

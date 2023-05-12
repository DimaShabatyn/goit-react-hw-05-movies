import { MoviesGalleryItem } from 'components/MoviesGalleryItem/MoviesGalleryItem';
import React from 'react';
import { List } from './MoviesGallery.styled';
import { useLocation } from 'react-router-dom';

export const MoviesGallery = ({ movies }) => {
  const location = useLocation();
  return (
    <List>
      {movies.map(movie => (
        <MoviesGalleryItem
          movie={movie}
          key={movie.id}
          state={{ from: location }}
        />
      ))}
    </List>
  );
};

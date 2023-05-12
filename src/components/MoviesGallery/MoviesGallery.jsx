import { MoviesGalleryItem } from 'components/MoviesGalleryItem/MoviesGalleryItem';
import React from 'react'
import { List } from './MoviesGallery.styled';

export const MoviesGallery = ({ movies }) => {
    // console.log(movies);
  return (
    <List>
    {movies.map(movie => <MoviesGalleryItem movie={movie} key={movie.id}/>)}
  </List>
  )
};

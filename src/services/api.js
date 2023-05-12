import axios from 'axios';
const API_KEY = '7f0dad748ff7b4eb073bc2aebbf95174';
// 713704

export async function getTrendingMovies() {
  try {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&include_adult=false`
    );
    return data;
  } catch (error) {
    throw new Error('Oops, we don`t have any movies');
  }
}

export async function getMovieDetails(movieId) {
  try {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error('Oops, we don`t have any movies');
  }
}

export async function getMovieByQuery(query) {
  try {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1&include_adult=false`
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error('Oops, we don`t have any movies');
  }
}

export const getMoviesCast = async (movieId) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    // console.log(data.cast);
    return data.cast;
  } catch (error) {
    throw new Error('Oops, there is no cast movie');
  }
};

export const getMoviesReviews = async (movieId) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
    );
    // console.log(data.results);
    return data.results;
  } catch (error) {
    throw new Error('Oops, we don`t have any reviews');
  }
};
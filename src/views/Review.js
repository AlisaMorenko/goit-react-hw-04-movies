import movieAPI from '../services/review-api';
import { useState, useEffect } from 'react';

export default function Review({ movieId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    movieAPI.fetchMovies(movieId).then(setReviews);
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, movie has no reviews...</p>
      )}
    </>
  );
}

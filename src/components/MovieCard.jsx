import React from "react";
import { IMG_URL } from "../utils/constants";

export default function MovieCard({ movie }) {
  const posterPath = movie.poster_path 
    ? `${IMG_URL}${movie.poster_path}` 
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <img
        className="movie-img"
        src={posterPath}
        alt={movie.title}
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-meta">Release: {movie.release_date || "N/A"}</p>
        <p className="movie-meta">Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
      </div>
    </div>
  );
}
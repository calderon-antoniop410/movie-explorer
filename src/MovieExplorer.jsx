import { useState, useEffect, useCallback } from "react";
import "./MovieExplorer.css"; 
import { API_KEY, BASE_URL } from "./utils/constants";
import { applySort } from "./utils/helpers";
import MovieCard from "./components/MovieCard";

export default function MovieExplorer() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      const data = await res.json();
      setTotalPages(data.total_pages);
      setMovies(applySort(data.results, sortOption));
    } finally {
      setLoading(false);
    }
  }, [sortOption]);

  const searchMovies = useCallback(async (q, page) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${q}&page=${page}`);
      const data = await res.json();
      setTotalPages(data.total_pages);
      setMovies(applySort(data.results, sortOption));
    } finally {
      setLoading(false);
    }
  }, [sortOption]);

  useEffect(() => {
    if (query) searchMovies(query, currentPage);
    else fetchMovies(currentPage);
  }, [currentPage, query, fetchMovies, searchMovies]);

  useEffect(() => {
    if (sortOption === "") {
      if (query) searchMovies(query, currentPage);
      else fetchMovies(currentPage);
    } else {
      setMovies(prev => applySort(prev, sortOption));
    }
  }, [sortOption]);

  return (
    <div className="page-container">
      <header className="header">
        <h1 className="header-title">🎬 Movie Explorer</h1>
      </header>

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search for a movie..."
          onChange={(e) => { 
            setQuery(e.target.value.trim()); 
            setCurrentPage(1); 
          }}
        />
        <select 
          className="sort-select" 
          onChange={(e) => setSortOption(e.target.value)} 
          value={sortOption}
        >
          <option value="">Sort By</option>
          <option value="releaseup">Release Date (Asc)</option>
          <option value="releasedown">Release Date (Desc)</option>
          <option value="ratingup">Rating (Asc)</option>
          <option value="ratingdown">Rating (Desc)</option>
        </select>
      </div>

      <main>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : movies.length === 0 ? (
          <p className="loading-text">No movies found.</p>
        ) : (
          <div className="movie-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>

      <div className="pagination">
        <button 
          className="page-btn" 
          onClick={() => setCurrentPage(p => p - 1)} 
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button 
          className="page-btn" 
          onClick={() => setCurrentPage(p => p + 1)} 
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
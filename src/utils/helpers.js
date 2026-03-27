export function applySort(movies, sortOption) {
  const sorted = [...movies];
  if (sortOption === "releaseup") {
    sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  } else if (sortOption === "releasedown") {
    sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } else if (sortOption === "ratingup") {
    sorted.sort((a, b) => a.vote_average - b.vote_average);
  } else if (sortOption === "ratingdown") {
    sorted.sort((a, b) => b.vote_average - a.vote_average);
  }
  return sorted;
}
import { MovieData, MovieDetails } from '../models/movie-list-model';

export class DataMapper {
  public static mapMovieDetailsToMovieData(details: MovieDetails): MovieData {
    return {
      adult: details.adult,
      backdrop_path: details.backdrop_path,
      genre_ids: details.genres.map((genre) => genre.id),
      id: details.id,
      original_language: details.original_language,
      original_title: details.original_title,
      overview: details.overview,
      popularity: details.popularity,
      poster_path: details.poster_path,
      release_date: details.release_date,
      title: details.title,
      video: details.video,
      vote_average: details.vote_average,
      vote_count: details.vote_count,
    };
  }
}

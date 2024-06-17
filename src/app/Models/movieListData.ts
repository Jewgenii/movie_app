import { MovieData } from "./movieData";

export interface MovieListData {
  name: string;
  isReadOnly: boolean;
  movies: MovieData[];
}

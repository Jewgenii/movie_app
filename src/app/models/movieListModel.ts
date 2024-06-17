import { MovieModel } from "./movieModel";

export interface MovieListModel {
  name: string;
  isReadOnly: boolean;
  movies: MovieModel[];
}

import { MovieData } from "./movieData";

export interface MovieListData {
  name: string;
  isAbleToModify: boolean;
  movies: MovieData[];
}

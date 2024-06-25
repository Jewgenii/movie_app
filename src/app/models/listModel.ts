import { MovieModel } from "./movieModel";

export class ListModel {
  public id!: number;
  public title: string | undefined;
  public movies: Array<MovieModel> | undefined;
}

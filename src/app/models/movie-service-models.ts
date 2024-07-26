export interface ResponseResult {
  success: boolean;
  status_code: string;
  status_message: string;
}

export interface DeleteSessionResult extends ResponseResult {

}

export interface TokenResultBase extends ResponseResult {
  expires_at: Date;
}

export interface TokenResult extends TokenResultBase {
  request_token: string;
}

export interface SessionResult extends TokenResultBase {
  guest_session_id: string;
}

export interface CreateSessionResult extends ResponseResult {
  session_id: string;
}

export interface ValidateWithLogin {
  username: string;
  password: string;
  request_token: string;
}

export interface AccountDetails {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface Avatar {
  gravatar: Gravatar;
  tmdb: Tmdb;
}

export interface Tmdb {
  avatar_path: null;
}

export interface Gravatar {
  hash: string;
}

export interface ValidateWithLoginResult extends ResponseResult {
  expires_at: string;
  request_token: string;
}

export interface PostMovieToList {
  media_id: number;
  media_type: string;
  favorite: boolean;
}

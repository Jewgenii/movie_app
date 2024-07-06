interface ResponseBase {
  success: boolean;
  expires_at: Date;
}

export interface TokenResponse extends ResponseBase {
  request_token: string;
}

export interface SessionResponse extends ResponseBase {
  guest_session_id: string;
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

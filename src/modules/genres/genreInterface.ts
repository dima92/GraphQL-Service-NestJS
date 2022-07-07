interface GenreInterface {
  description?: string;
  country?: string;
  year?: string;
}

export interface NewGenreInterface extends GenreInterface {
  name: string;
}

export interface UpdateGenreInterface extends GenreInterface {
  name?: string;
}

interface AlbumInterface {
  released?: number;
  artistsIds?: string[];
  bandsIds?: string[];
  trackIds?: string[];
  genresIds?: string[];
  image?: string;
}

export interface NewAlbumInterface extends AlbumInterface {
  name: string;
}

export interface UpdateAlbumInterface extends AlbumInterface {
  name?: string;
}

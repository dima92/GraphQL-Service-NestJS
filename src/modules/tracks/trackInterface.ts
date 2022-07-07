interface TrackInterface {
  albumId?: string;
  artistsIds?: string[];
  bandsIds?: string[];
  duration?: number;
  released?: number;
  genresIds?: string[];
}

export interface NewTrackInterface extends TrackInterface {
  title: string;
}

export interface UpdateTrackInterface extends TrackInterface {
  title?: string;
}

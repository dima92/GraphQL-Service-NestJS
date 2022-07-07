interface BandInterface {
  origin?: string;
  membersId?: Member[];
  website?: string;
  genresIds?: string[];
}

interface Member {
  artist: string;
  instrument: string;
  years: number[];
}

export interface NewBandInterface extends BandInterface {
  name: string;
}

export interface UpdateBandInterface extends BandInterface {
  name?: string;
}

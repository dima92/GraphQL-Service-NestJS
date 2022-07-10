interface BandInterface {
  origin?: string;
  members?: MemberInterface[];
  website?: string;
  genresIds?: string[];
}

export interface MemberInterface {
  id: string;
  instrument: string;
  years: number[];
}

export interface NewBandInterface extends BandInterface {
  name: string;
}

export interface UpdateBandInterface extends BandInterface {
  name?: string;
}

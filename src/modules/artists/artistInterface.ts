interface ArtistInterface {
  birthDate?: string;
  birthPlace?: string;
  country?: string;
  bandsIds?: string[];
  instruments?: string[];
}

export interface NewArtistInterface extends ArtistInterface {
  firstName: string;
  secondName: string;
}

export interface UpdateArtistInterface extends ArtistInterface {
  firstName?: string;
  secondName?: string;
}

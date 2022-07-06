import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistsService {
  baseUrl = process.env.ARTISTS_URL;

  getArtistById(id: string) {}

  getAllArtists(limit: number, offset: number) {
    return Promise.resolve(undefined);
  }
}

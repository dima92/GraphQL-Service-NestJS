import { Injectable } from '@nestjs/common';

@Injectable()
export class GenresService {
  baseUrl = process.env.GENRES_URL;

  getGenreById(id: string) {}

  getAllGenres(limit: number, offset: number) {
    return Promise.resolve(undefined);
  }
}

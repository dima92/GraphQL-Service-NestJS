import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { NewGenreInterface, UpdateGenreInterface } from '../genreInterface';

@Injectable()
export class GenresService {
  baseUrl = process.env.GENRES_URL;

  constructor(private readonly httpService: HttpService) {}

  getGenreById = async (id: string) => {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}/${id}`,
    );
    return {
      ...data,
      id: data._id,
    };
  };

  getAllGenres = async (limit: number, offset: number) => {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}?limit=${limit}&offset=${offset}`,
    );
    return {
      ...data,
      items: data.items.map((item) => {
        return { ...item, id: item._id };
      }),
    };
  };

  createGenre = async (newGenre: NewGenreInterface, context) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.post(
      this.baseUrl,
      newGenre,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };

  updateGenre = async (
    id: string,
    updatedGenre: UpdateGenreInterface,
    context: any,
  ) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.put(
      `${this.baseUrl}/${id}`,
      updatedGenre,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };
}

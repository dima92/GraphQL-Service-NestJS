import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { NewArtistInterface, UpdateArtistInterface } from '../artistInterface';

@Injectable()
export class ArtistsService {
  baseUrl = process.env.ARTISTS_URL;

  constructor(private readonly httpService: HttpService) {}

  getArtistById = async (id: string) => {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}/${id}`,
    );
    return {
      ...data,
      id: data._id,
    };
  };

  getAllArtists = async (limit: number, offset: number) => {
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

  createArtist = async (newArtist: NewArtistInterface, context) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.post(
      this.baseUrl,
      newArtist,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };

  updateArtist = async (
    id: string,
    updatedArtist: UpdateArtistInterface,
    context: any,
  ) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.put(
      `${this.baseUrl}/${id}`,
      updatedArtist,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };

  deleteArtist = async (id: string, context: any) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.delete(
      `${this.baseUrl}/${id}`,
      {
        headers: {
          authorization,
        },
      },
    );
    return data;
  };
}

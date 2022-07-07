import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UpdateAlbumInterface, NewAlbumInterface } from '../albumInterface';

@Injectable()
export class AlbumsService {
  baseUrl = process.env.ALBUMS_URL;

  constructor(private readonly httpService: HttpService) {}

  getAlbumById = async (id: string) => {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}/${id}`,
    );
    return {
      ...data,
      id: data._id,
    };
  };

  getAllAlbums = async (limit = 10, offset = 0) => {
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

  createAlbum = async (newAlbum: NewAlbumInterface, context) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.post(
      this.baseUrl,
      newAlbum,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };

  updateAlbum = async (
    id: string,
    updatedAlbum: UpdateAlbumInterface,
    context: any,
  ) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.put(
      `${this.baseUrl}/${id}`,
      updatedAlbum,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };
}

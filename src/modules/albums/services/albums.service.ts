import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

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
}

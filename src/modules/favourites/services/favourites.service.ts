import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FavouritesService {
  baseUrl = process.env.FAVOURITES_URL;

  constructor(private readonly httpService: HttpService) {}

  getAllFavourites = async (context) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.get(this.baseUrl, {
      headers: {
        authorization,
      },
    });
    return data;
  };

  addToFavourites = async (type: string, id: string, context: any) => {
    const { authorization } = context.req.headers;
    if (!authorization) return null;
    const { data } = await this.httpService.axiosRef.put(
      `${this.baseUrl}/add`,
      { type: type, id },
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };
}

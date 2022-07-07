import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BandsService {
  baseUrl = process.env.BANDS_URL;

  constructor(private readonly httpService: HttpService) {}

  getBandById = async (id: string) => {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}/${id}`,
    );
    return { ...data, id: data._id };
  };

  getAllBands = async (limit: number, offset: number) => {
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

  getMembers(band) {
    return Promise.resolve(undefined);
  }
}

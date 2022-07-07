import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { NewBandInterface, UpdateBandInterface } from '../bandInterface';

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

  createBand = async (newBand: NewBandInterface, context) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.post(
      this.baseUrl,
      newBand,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };

  updateBand = async (
    id: string,
    updatedBand: UpdateBandInterface,
    context: any,
  ) => {
    const { authorization } = context.req.headers;
    if (!authorization) return;
    const { data } = await this.httpService.axiosRef.put(
      `${this.baseUrl}/${id}`,
      updatedBand,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };

  deleteBand = async (id: string, context: any) => {
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

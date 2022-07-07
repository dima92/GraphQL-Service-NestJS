import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { NewTrackInterface, UpdateTrackInterface } from '../trackInterface';

@Injectable()
export class TracksService {
  baseUrl = process.env.TRACKS_URL;

  constructor(private readonly httpService: HttpService) {}

  getTrackById = async (id: string) => {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}/${id}`,
    );
    return {
      ...data,
      id: data._id,
    };
  };

  getAllTracks = async (limit: number, offset: number) => {
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

  createTrack = async (newTrack: NewTrackInterface, context) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.post(
      this.baseUrl,
      newTrack,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };

  editTrack = async (
    id: string,
    updatedTrack: UpdateTrackInterface,
    context: any,
  ) => {
    const { authorization } = context.req.headers;
    const { data } = await this.httpService.axiosRef.put(
      `${this.baseUrl}/${id}`,
      updatedTrack,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };
}

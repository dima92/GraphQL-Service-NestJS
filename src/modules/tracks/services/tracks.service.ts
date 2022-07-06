import { Injectable } from '@nestjs/common';

@Injectable()
export class TracksService {
  baseUrl = process.env.TRACKS_URL;

  getTrackById(id: string) {}

  getAllTracks(limit: number, offset: number) {
    return Promise.resolve(undefined);
  }
}

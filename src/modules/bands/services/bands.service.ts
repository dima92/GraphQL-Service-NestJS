import { Injectable } from '@nestjs/common';

@Injectable()
export class BandsService {
  baseUrl = process.env.BANDS_URL;

  getBandById(id: string) {}

  getAllBands(limit: number, offset: number) {
    return Promise.resolve(undefined);
  }

  getMembers(band) {
    return Promise.resolve(undefined);
  }
}

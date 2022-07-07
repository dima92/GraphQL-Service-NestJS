import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MemberInterface } from '../bandInterface';
import { ArtistsService } from '../../artists/services/artists.service';
import { RequestService } from '../../common/services/requestService';

@Injectable()
export class BandsService extends RequestService {
  baseUrl = process.env.BANDS_URL;

  constructor(
    httpService: HttpService,
    private readonly artistsService: ArtistsService,
  ) {
    super(httpService);
  }

  getMembers = async (member: MemberInterface) => {
    const { firstName, secondName, middleName } =
      await this.artistsService.getById(member.id);
    return {
      firstName,
      secondName,
      middleName,
      instrument: member.instrument,
      years: member.years,
    };
  };
}

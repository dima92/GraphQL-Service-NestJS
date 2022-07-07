import { Injectable } from '@nestjs/common';
import { RequestService } from '../../common/services/requestService';

@Injectable()
export class TracksService extends RequestService {
  baseUrl = process.env.TRACKS_URL;
}

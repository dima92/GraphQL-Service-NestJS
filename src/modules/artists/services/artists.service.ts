import { Injectable } from '@nestjs/common';
import { RequestService } from '../../common/services/requestService';

@Injectable()
export class ArtistsService extends RequestService {
  baseUrl = process.env.ARTISTS_URL;
}

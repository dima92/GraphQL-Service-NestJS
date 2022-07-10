import { Injectable } from '@nestjs/common';
import { RequestService } from '../../common/services/requestService';

@Injectable()
export class AlbumsService extends RequestService {
  baseUrl = process.env.ALBUMS_URL;
}

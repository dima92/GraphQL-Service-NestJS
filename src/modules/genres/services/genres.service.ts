import { Injectable } from '@nestjs/common';
import { RequestService } from '../../common/services/requestService';

@Injectable()
export class GenresService extends RequestService {
  baseUrl = process.env.GENRES_URL;
}

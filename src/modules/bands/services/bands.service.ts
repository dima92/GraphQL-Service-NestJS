import { Injectable } from '@nestjs/common';
import { RequestService } from '../../common/services/requestService';

@Injectable()
export class BandsService extends RequestService {
  baseUrl = process.env.BANDS_URL;
}

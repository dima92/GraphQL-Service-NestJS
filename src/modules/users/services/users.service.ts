import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  baseUrl = process.env.USERS_URL;

  getJWT(email: string, password: string) {
    return Promise.resolve(undefined);
  }
}

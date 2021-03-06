import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  baseUrl = process.env.USERS_URL;

  constructor(private readonly httpService: HttpService) {}

  getJWT = async (email: string, password: string) => {
    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/login`,
      {
        email,
        password,
      },
    );
    return data;
  };

  registerUser = async (user: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }) => {
    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/register`,
      user,
    );
    return { ...data, id: data._id };
  };
}

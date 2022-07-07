import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RequestService {
  baseUrl!: string;

  constructor(private readonly httpService: HttpService) {}

  getAll = async (limit: number, offset: number) => {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}?limit=${limit}&offset=${offset}`,
    );
    return {
      ...data,
      items: data.items.map((item) => {
        return { ...item, id: item._id };
      }),
    };
  };

  getById = async (id: string) => {
    const { data } = await this.httpService.axiosRef.get(
      `${this.baseUrl}/${id}`,
    );
    return {
      ...data,
      id: data._id,
    };
  };

  createItem = async <T>(newItem: T, context) => {
    const { authorization } = context.req.headers;
    if (!authorization) return null;
    const { data } = await this.httpService.axiosRef.post(
      this.baseUrl,
      newItem,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };

  updateItem = async <T>(id: string, updatedItem: T, context: any) => {
    const { authorization } = context.req.headers;
    if (!authorization) return null;
    const { data } = await this.httpService.axiosRef.put(
      `${this.baseUrl}/${id}`,
      updatedItem,
      {
        headers: {
          authorization,
        },
      },
    );
    return { ...data, id: data._id };
  };

  deleteItem = async (id: string, context: any) => {
    const { authorization } = context.req.headers;
    if (!authorization) return null;
    const { data } = await this.httpService.axiosRef.delete(
      `${this.baseUrl}/${id}`,
      {
        headers: {
          authorization,
        },
      },
    );
    return data;
  };
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumsService {
  baseUrl = process.env.ALBUMS_URL;

  getAlbumById(id: string) {
    return Promise.resolve(undefined);
  }

  getAllAlbums(limit = 10, offset = 0) {
    return {
      items: [
        {
          _id: '62bca833d0a55e09d2cac9b2',
          name: 'Neighborhoods',
          released: 201122,
          artistsIds: [],
          bandsIds: ['62af1b671227452682233fe0'],
          trackIds: [],
          genresIds: [],
          __v: 0,
        },
        {
          _id: '62bca8c1d0a55e09d2cac9b9',
          name: 'Neighborhoods',
          released: 201122,
          artistsIds: [],
          bandsIds: [],
          trackIds: [],
          genresIds: [],
          __v: 0,
        },
        {
          _id: '62bca8c3d0a55e09d2cac9bb',
          name: 'Neighborhoods',
          released: 201122,
          artistsIds: [],
          bandsIds: [],
          trackIds: [],
          genresIds: [],
          __v: 0,
        },
        {
          _id: '62bcb2dfd0a55e09d2cac9c1',
          name: 'Check',
          released: 201122,
          artistsIds: [],
          bandsIds: ['62af1b671227452682233fe0'],
          trackIds: [],
          genresIds: [],
          __v: 0,
        },
      ],
      offset: 0,
      limit: 5,
      total: 4,
    };
  }
}

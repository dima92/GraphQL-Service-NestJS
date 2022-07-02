import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumsService {
  getAlbumById(id: string) {
    return Promise.resolve(undefined);
  }

  getAllAlbums() {
    return Promise.resolve(undefined);
  }
}

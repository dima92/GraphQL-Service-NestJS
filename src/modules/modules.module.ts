import { Module } from '@nestjs/common';
import { AlbumsService } from './albums/services/albums.service';
import { ArtistsService } from './artists/services/artists.service';
import { BandsService } from './bands/services/bands.service';
import { GenresService } from './genres/services/genres.service';
import { TracksService } from './tracks/services/tracks.service';

@Module({
  providers: [
    AlbumsService,
    ArtistsService,
    BandsService,
    GenresService,
    TracksService,
    AlbumsResolver,
    ArtistsResolver,
    BandsResolver,
    GenresResolver,
    TracksResolver,
  ],
})
export class ModulesModule {}

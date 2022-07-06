import { Module } from '@nestjs/common';
import { AlbumsResolver } from './albums/resolvers/albums.resolver';
import { AlbumsService } from './albums/services/albums.service';
import { ArtistsService } from './artists/services/artists.service';
import { BandsService } from './bands/services/bands.service';
import { GenresService } from './genres/services/genres.service';
import { TracksService } from './tracks/services/tracks.service';
import { BandsResolver } from './bands/resolvers/bands.resolver';
import { GenresResolver } from './genres/resolvers/genres.resolver';
import { TracksResolver } from './tracks/resolvers/tracks.resolver';
import { ArtistsResolver } from './artists/resolvers/artists.resolver';

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

import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AlbumsService } from '../services/albums.service';
import { ArtistsService } from '../../artists/services/artists.service';
import { BandsService } from '../../bands/services/bands.service';
import { TracksService } from '../../tracks/services/tracks.service';
import { GenresService } from '../../genres/services/genres.service';
import { UpdateAlbumInterface, NewAlbumInterface } from '../albumInterface';

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
    private readonly tracksService: TracksService,
    private readonly genresService: GenresService,
  ) {}

  @Query()
  async album(@Args('id') id: string) {
    return this.albumsService.getAlbumById(id);
  }

  @Query()
  @Query()
  async albums(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.albumsService.getAllAlbums(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() album) {
    const { artistsIds } = album;
    return await Promise.all(
      artistsIds.map((id: string) => {
        return this.artistsService.getArtistById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() album) {
    const { bandsIds } = album;
    return await Promise.all(
      bandsIds.map((id: string) => {
        return this.bandsService.getBandById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async tracks(@Parent() album) {
    const { tracksIds } = album;
    return await Promise.all(
      tracksIds.map((id: string) => {
        return this.tracksService.getTrackById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() album) {
    const { genresIds } = album;
    return await Promise.all(
      genresIds.map((id: string) => {
        return this.genresService.getGenreById(id);
      }),
    );
  }

  @Mutation()
  async createAlbum(
    @Args('newAlbum') newAlbum: NewAlbumInterface,
    @Context() context: any,
  ) {
    return this.albumsService.createAlbum(newAlbum, context);
  }

  @Mutation()
  async updateAlbum(
    @Args('id') id: string,
    @Args('updatedAlbum') updatedAlbum: UpdateAlbumInterface,
    @Context() context: any,
  ) {
    return this.albumsService.updateAlbum(id, updatedAlbum, context);
  }
}

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
    return this.albumsService.getById(id);
  }

  @Query()
  @Query()
  async albums(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.albumsService.getAll(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() album) {
    const { artistsIds } = album;
    return await Promise.all(
      artistsIds.map((id: string) => {
        return this.artistsService.getById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() album) {
    const { bandsIds } = album;
    return await Promise.all(
      bandsIds.map((id: string) => {
        return this.bandsService.getById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async tracks(@Parent() album) {
    const { tracksIds } = album;
    return await Promise.all(
      tracksIds.map((id: string) => {
        return this.tracksService.getById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() album) {
    const { genresIds } = album;
    return await Promise.all(
      genresIds.map((id: string) => {
        return this.genresService.getById(id);
      }),
    );
  }

  @Mutation()
  async createAlbum(
    @Args('newAlbum') newAlbum: NewAlbumInterface,
    @Context() context: any,
  ) {
    return this.albumsService.createItem<NewAlbumInterface>(newAlbum, context);
  }

  @Mutation()
  async updateAlbum(
    @Args('id') id: string,
    @Args('album') updatedAlbum: UpdateAlbumInterface,
    @Context() context: any,
  ) {
    return this.albumsService.updateItem<UpdateAlbumInterface>(
      id,
      updatedAlbum,
      context,
    );
  }

  @Mutation()
  async deleteAlbum(@Args('id') id: string, @Context() context: any) {
    return this.albumsService.deleteItem(id, context);
  }
}

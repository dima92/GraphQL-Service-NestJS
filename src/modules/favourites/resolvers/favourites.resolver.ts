import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FavouritesService } from '../services/favourites.service';
import { ArtistsService } from '../../artists/services/artists.service';
import { BandsService } from '../../bands/services/bands.service';
import { TracksService } from '../../tracks/services/tracks.service';
import { GenresService } from '../../genres/services/genres.service';

@Resolver('Favourites')
export class FavouritesResolver {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
    private readonly tracksService: TracksService,
    private readonly genresService: GenresService,
  ) {}

  @Query()
  async favourites(@Context() context: any) {
    return this.favouritesService.getAllFavourites(context);
  }

  @Mutation()
  async addTrackToFavourites(
    @Args('id') trackId: string,
    @Context() context: any,
  ) {
    return this.favouritesService.addToFavourites('tracks', trackId, context);
  }

  @Mutation()
  async addBandToFavourites(
    @Args('id') bandId: string,
    @Context() context: any,
  ) {
    return this.favouritesService.addToFavourites('bands', bandId, context);
  }

  @Mutation()
  async addArtistToFavourites(
    @Args('id') artistId: string,
    @Context() context: any,
  ) {
    return this.favouritesService.addToFavourites('artists', artistId, context);
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
  async addGenreToFavourites(
    @Args('id') genreId: string,
    @Context() context: any,
  ) {
    return this.favouritesService.addToFavourites('genres', genreId, context);
  }
}

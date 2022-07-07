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
    @Args('type') type: string,
    @Args('id') trackId: string,
    @Context() context: any,
  ) {
    return this.favouritesService.addToFavourites(type, trackId, context);
  }

  @Mutation()
  async addBandToFavourites(
    @Args('type') type: string,
    @Args('id') bandId: string,
    @Context() context: any,
  ) {
    return this.favouritesService.addToFavourites(type, bandId, context);
  }

  @Mutation()
  async addArtistToFavourites(
    @Args('type') type: string,
    @Args('id') artistId: string,
    @Context() context: any,
  ) {
    return this.favouritesService.addToFavourites(type, artistId, context);
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
  async addGenreToFavourites(
    @Args('type') type: string,
    @Args('id') genreId: string,
    @Context() context: any,
  ) {
    return this.favouritesService.addToFavourites(type, genreId, context);
  }
}

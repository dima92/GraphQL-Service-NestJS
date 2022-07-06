import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TracksService } from '../services/tracks.service';
import { ArtistsService } from '../../artists/services/artists.service';
import { BandsService } from '../../bands/services/bands.service';
import { GenresService } from '../../genres/services/genres.service';

@Resolver()
export class TracksResolver {
  constructor(
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
  ) {}

  @Query()
  async track(@Args('id') id: string) {
    return this.tracksService.getTrackById(id);
  }

  @Query()
  async tracks(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.tracksService.getAllTracks(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() track) {
    const { artistsIds } = track;
    return await Promise.all(
      artistsIds.map((id) => {
        return this.artistsService.getArtistById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() track) {
    const { bandsIds } = track;
    return await Promise.all(
      bandsIds.map((id) => {
        return this.bandsService.getBandById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() track) {
    const { genresIds } = track;
    return await Promise.all(
      genresIds.map((id) => {
        return this.genresService.getGenreById(id);
      }),
    );
  }
}

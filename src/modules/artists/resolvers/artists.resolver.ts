import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArtistsService } from '../services/artists.service';
import { BandsService } from '../../bands/services/bands.service';

@Resolver()
export class ArtistsResolver {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
  ) {}

  @Query()
  async artist(@Args('id') id: string) {
    return this.artistsService.getArtistById(id);
  }

  @Query()
  async artists(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.artistsService.getAllArtists(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() artist) {
    const { bandsIds } = artist;
    return await Promise.all(
      bandsIds.map((id) => {
        return this.bandsService.getBandById(id);
      }),
    );
  }
}

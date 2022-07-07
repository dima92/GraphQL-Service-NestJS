import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ArtistsService } from '../services/artists.service';
import { BandsService } from '../../bands/services/bands.service';
import { NewArtistInterface, UpdateArtistInterface } from '../artistInterface';

@Resolver('Artist')
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

  @Mutation()
  async createArtist(
    @Args('newArtist') newArtist: NewArtistInterface,
    @Context() context: any,
  ) {
    return this.artistsService.createArtist(newArtist, context);
  }

  @Mutation()
  async updateArtist(
    @Args('id') id: string,
    @Args('updatedArtist') updatedArtist: UpdateArtistInterface,
    @Context() context: any,
  ) {
    return this.artistsService.updateArtist(id, updatedArtist, context);
  }

  @Mutation()
  async deleteArtist(@Args('id') id: string, @Context() context: any) {
    return this.artistsService.deleteArtist(id, context);
  }
}

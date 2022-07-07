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
    return this.artistsService.getById(id);
  }

  @Query()
  async artists(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.artistsService.getAll(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async bands(@Parent() artist) {
    const { bandsIds } = artist;
    return await Promise.all(
      bandsIds.map((id) => {
        return this.bandsService.getById(id);
      }),
    );
  }

  @Mutation()
  async createArtist(
    @Args('newArtist') newArtist: NewArtistInterface,
    @Context() context: any,
  ) {
    return this.artistsService.createItem<NewArtistInterface>(
      newArtist,
      context,
    );
  }

  @Mutation()
  async updateArtist(
    @Args('id') id: string,
    @Args('updatedArtist') updatedArtist: UpdateArtistInterface,
    @Context() context: any,
  ) {
    return this.artistsService.updateItem<NewArtistInterface>(
      id,
      updatedArtist,
      context,
    );
  }

  @Mutation()
  async deleteArtist(@Args('id') id: string, @Context() context: any) {
    return this.artistsService.deleteItem(id, context);
  }
}

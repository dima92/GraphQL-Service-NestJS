import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BandsService } from '../services/bands.service';
import { Query } from '@nestjs/graphql';
import { GenresService } from '../../genres/services/genres.service';
import { UpdateBandInterface, NewBandInterface } from '../bandInterface';

@Resolver('Band')
export class BandsResolver {
  constructor(
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
  ) {}

  @Query()
  async band(@Args('id') id: string) {
    return this.bandsService.getById(id);
  }

  @Query()
  async bands(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.bandsService.getAll(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async members(@Parent() band) {
    const { members } = band;
    return await Promise.all(
      members.map((member) => {
        return this.bandsService.getMembers(member);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() band) {
    const { genresIds } = band;
    return await Promise.all(
      genresIds.map((id) => {
        return this.genresService.getById(id);
      }),
    );
  }

  @Mutation()
  async createBand(
    @Args('newBand') newBand: NewBandInterface,
    @Context() context: any,
  ) {
    return this.bandsService.createItem<NewBandInterface>(newBand, context);
  }

  @Mutation()
  async updateBand(
    @Args('id') id: string,
    @Args('updatedBand') updatedBand: UpdateBandInterface,
    @Context() context: any,
  ) {
    return this.bandsService.updateItem<UpdateBandInterface>(
      id,
      updatedBand,
      context,
    );
  }

  @Mutation()
  async deleteBand(@Args('id') id: string, @Context() context: any) {
    return this.bandsService.deleteItem(id, context);
  }
}

import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BandsService } from '../services/bands.service';
import { Query } from '@nestjs/graphql';
import { GenresService } from '../../genres/services/genres.service';

@Resolver()
export class BandsResolver {
  constructor(
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
  ) {}

  @Query()
  async band(@Args('id') id: string) {
    return this.bandsService.getBandById(id);
  }

  @Query()
  async bands(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.bandsService.getAllBands(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async members(@Parent() band) {
    return this.bandsService.getMembers(band);
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() band) {
    const { genresIds } = band;
    return await Promise.all(
      genresIds.map((id) => {
        return this.genresService.getGenreById(id);
      }),
    );
  }
}

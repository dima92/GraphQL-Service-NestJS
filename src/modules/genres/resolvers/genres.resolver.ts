import { Args, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from '../services/genres.service';

@Resolver()
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query()
  async genre(@Args('id') id: string) {
    return this.genresService.getGenreById(id);
  }

  @Query()
  async genres(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.genresService.getAllGenres(limit, offset);
  }
}

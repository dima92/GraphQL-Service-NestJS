import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from '../services/genres.service';
import { NewGenreInterface, UpdateGenreInterface } from '../genreInterface';

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

  @Mutation()
  async createGenre(
    @Args('newGenre') newGenre: NewGenreInterface,
    @Context() context: any,
  ) {
    return this.genresService.createGenre(newGenre, context);
  }

  @Mutation()
  async updateGenre(
    @Args('id') id: string,
    @Args('updatedGenre') updatedGenre: UpdateGenreInterface,
    @Context() context: any,
  ) {
    return this.genresService.updateGenre(id, updatedGenre, context);
  }
}

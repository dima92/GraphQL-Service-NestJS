import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from '../services/genres.service';
import { NewGenreInterface, UpdateGenreInterface } from '../genreInterface';

@Resolver('Genre')
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query()
  async genre(@Args('id') id: string) {
    return this.genresService.getById(id);
  }

  @Query()
  async genres(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.genresService.getAll(limit, offset);
  }

  @Mutation()
  async createGenre(
    @Args('newGenre') newGenre: NewGenreInterface,
    @Context() context: any,
  ) {
    return this.genresService.createItem<NewGenreInterface>(newGenre, context);
  }

  @Mutation()
  async updateGenre(
    @Args('id') id: string,
    @Args('updatedGenre') updatedGenre: UpdateGenreInterface,
    @Context() context: any,
  ) {
    return this.genresService.updateItem<UpdateGenreInterface>(id, updatedGenre, context);
  }

  @Mutation()
  async deleteGenre(@Args('id') id: string, @Context() context: any) {
    return this.genresService.deleteItem(id, context);
  }
}

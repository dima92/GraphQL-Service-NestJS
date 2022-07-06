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
  async genres() {
    return this.genresService.getAllGenres();
  }
}

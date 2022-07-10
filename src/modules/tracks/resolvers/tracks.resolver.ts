import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TracksService } from '../services/tracks.service';
import { ArtistsService } from '../../artists/services/artists.service';
import { BandsService } from '../../bands/services/bands.service';
import { GenresService } from '../../genres/services/genres.service';
import { NewTrackInterface, UpdateTrackInterface } from '../trackInterface';

@Resolver('Track')
export class TracksResolver {
  constructor(
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
  ) {}

  @Query()
  async track(@Args('id') id: string) {
    return this.tracksService.getById(id);
  }

  @Query()
  async tracks(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.tracksService.getAll(limit, offset);
  }

  @Resolver()
  @ResolveField()
  async artists(@Parent() track) {
    const { artistsIds } = track;
    return await Promise.all(
      artistsIds.map((id) => {
        return this.artistsService.getById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField('bands')
  async bands(@Parent() track) {
    const { bandsIds } = track;
    return await Promise.all(
      bandsIds.map((id) => {
        return this.bandsService.getById(id);
      }),
    );
  }

  @Resolver()
  @ResolveField()
  async genres(@Parent() track) {
    const { genresIds } = track;
    return await Promise.all(
      genresIds.map((id: string) => {
        return this.genresService.getById(id);
      }),
    );
  }

  @Mutation()
  async createTrack(
    @Args('newTrack') newTrack: NewTrackInterface,
    @Context() context: any,
  ) {
    return this.tracksService.createItem<NewTrackInterface>(newTrack, context);
  }

  @Mutation()
  async updateTrack(
    @Args('id') id: string,
    @Args('track') updatedTrack: UpdateTrackInterface,
    @Context() context: any,
  ) {
    return this.tracksService.updateItem<UpdateTrackInterface>(
      id,
      updatedTrack,
      context,
    );
  }

  @Mutation()
  async deleteTrack(@Args('id') id: string, @Context() context: any) {
    return this.tracksService.deleteItem(id, context);
  }
}

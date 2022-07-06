import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  async jwt(@Args('email') email: string, @Args('password') password: string) {
    return this.usersService.getJWT(email, password);
  }
}

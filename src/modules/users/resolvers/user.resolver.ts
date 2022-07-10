import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  async jwt(@Args('email') email: string, @Args('password') password: string) {
    return this.usersService.getJWT(email, password);
  }

  @Mutation()
  async register(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.usersService.registerUser({
      firstName,
      lastName,
      email,
      password,
    });
  }
}

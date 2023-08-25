import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { WalletsService } from './wallets.service';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { GqlRolesGuard } from 'src/roles/gql.role.guard';
import { CurrentUser } from 'src/auth/decorators/gql';
import { User } from 'src/users/entities/user.entity';

@UseGuards(GqlAuthGuard, GqlRolesGuard)
@Resolver(() => User)
export class WalletsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @Mutation(() => User)
  createWallet(
    @Args('addValue') createWalletInput: CreateWalletInput,
    @CurrentUser() user: User,
  ) {
    return this.walletsService.addValue(createWalletInput, user.email);
  }
}

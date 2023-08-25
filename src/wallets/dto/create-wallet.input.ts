import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateWalletInput {
  @Field(() => Float, { description: 'Its the value of user want to add' })
  value: number;
}

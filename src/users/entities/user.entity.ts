import { Extensions, Field, Float, ObjectType } from '@nestjs/graphql';
import { User as DBUser } from '@prisma/client';
import { Role } from 'src/roles/enums/role.enum';
import { checkRoleMiddleware } from 'src/roles/gql-role.middleware';

@ObjectType()
export class User implements DBUser {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cel: string;

  @Field(() => Float, { defaultValue: 0 })
  value: number;

  @Field({ nullable: true })
  file_id: string;

  @Field({ nullable: true })
  latitude: number;

  @Field({ nullable: true })
  longitude: number;

  @Field()
  doccument: string;

  @Field({ middleware: [checkRoleMiddleware] })
  @Extensions({ role: Role.ADMIN })
  password: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

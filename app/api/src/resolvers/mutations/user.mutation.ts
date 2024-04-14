import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserObject } from '../../infra/objects/user.object';
import {  registerUserUseCase, updateProfileUseCase, withdrawUseCase } from '../../usecases/users';
import { CreateUserDto, CreateUserInput, UpdateUserDto,UpdateUserInput } from '../../domains/dtos/user';


@Resolver((of) => UserObject)
export class UserMutation {
  constructor(
    private readonly registerUserUseCase: registerUserUseCase,
    private readonly updateProfileUseCase: updateProfileUseCase,
    private readonly withdrawUseCase: withdrawUseCase,
  ) {};


  @Mutation(returns => UserObject,  { name: 'registerUser', nullable: true })
  async registerUser(
    @Args('user', {
      type: () => CreateUserInput
    }) user: CreateUserDto
  ) {
    return await this.registerUserUseCase.exec(user);
  }

  @Mutation(returns => UserObject, { name: 'updateProfile', nullable: true })
  async updateProfile(
    @Args('id') id: string,
    @Args('user',{type: ()=>UpdateUserInput, nullable: true}) user: UpdateUserDto
  ) {
    return await this.updateProfileUseCase.exec(id,user);
  }

  @Mutation(returns => Boolean, { name: 'removeUser', nullable: true })
  async withdraw(
    @Args('id') id: string
  ) {
    return await this.withdrawUseCase.exec(id);
  }
}

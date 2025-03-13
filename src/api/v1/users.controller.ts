import { JsonController, Get, Post, Put, Delete, Param, Params, Body, HttpCode, Authorized, QueryParams, Patch } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { ContainerHelper } from 'application/ioc/helpers/container.helper';
import { ContainerItems } from 'application/ioc/static/container-items';
import { IUserService } from 'application/services/user.service';
import { GetUserArgs } from 'core/inputs/get-user.args';
import { CreateUserArgs } from 'core/inputs/create-user.args';
import { UpdateUserArgs } from 'core/inputs/update-user.args';
import { DeleteUserArgs } from 'core/inputs/delete-user.args';
import { createVersionedRoute } from 'application/helpers/utility-functions.helper';
import { Roles } from 'domain/enums/roles.enum';
import { GetQueryResultsArgs } from 'core/inputs/get-query-results.args';
import { UpdateUserPasswordArgs } from 'core/inputs/update-user-password.args';
import { swaggerSchemas } from 'application/helpers/swagger-schemas.helper';

@JsonController(createVersionedRoute({ controllerPath: '/users', version: 'v1' }))
export class UsersController {
  private _userService: IUserService;

  private get userService (): IUserService {
    if (!this._userService) {
      this._userService = ContainerHelper.get<IUserService>(ContainerItems.IUserService);
    }

    return this._userService;
  }

  @Authorized([Roles.GlobalAdmin, Roles.Admin])
  @Get('/')
  @OpenAPI(swaggerSchemas.users.getUserList)
  async get (@QueryParams() query: GetQueryResultsArgs) {
    return await this.userService.get(query);
  }

  @Authorized([Roles.GlobalAdmin, Roles.Admin])
  @Get('/:id')
  @OpenAPI(swaggerSchemas.users.getUserBy)
  async getBy (@Params() args: GetUserArgs) {
    return await this.userService.getBy(args);
  }

  @Authorized([Roles.GlobalAdmin, Roles.Admin])
  @HttpCode(201)
  @Post('/')
  @OpenAPI(swaggerSchemas.users.createUser)
  async create (@Body() args: CreateUserArgs) {
    return await this.userService.create(args);
  }

  @Authorized([Roles.GlobalAdmin, Roles.Admin])
  @Put('/:id')
  @OpenAPI(swaggerSchemas.users.updateUser)
  async update (@Param('id') id: number, @Body() args: UpdateUserArgs) {
    return await this.userService.update(id, args);
  }

  @Authorized([Roles.Standard])
  @Patch('/:id/password')
  @OpenAPI(swaggerSchemas.users.updatePassword)
  async updatePassword (@Param('id') id: number, @Body() args: UpdateUserPasswordArgs) {
    return await this.userService.updatePassword(id, args);
  }

  @Authorized([Roles.GlobalAdmin, Roles.Admin])
  @Delete('/:id')
  @OpenAPI(swaggerSchemas.users.deleteUser)
  async delete (@Params() args: DeleteUserArgs) {
    return await this.userService.delete(args);
  }
}

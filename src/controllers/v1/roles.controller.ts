import { JsonController, Get, Authorized } from 'routing-controllers';

import { createVersionedRoute } from 'helpers/utility-functions.helper';
import { IRoleService } from 'services/role.service';
import { ContainerHelper } from 'ioc/helpers/container.helper';
import { ContainerItems } from 'ioc/static/container-items';
import { Roles } from 'value-objects/enums/roles.enum';

@Authorized([Roles.GlobalAdmin, Roles.Admin])
@JsonController(createVersionedRoute('/roles', 'v1'))
export class RolesController {
  private roleService: IRoleService;

  constructor () {
    this.roleService = ContainerHelper.get<IRoleService>(ContainerItems.IRoleService);
  }

  @Get('/')
  async get () {
    return await this.roleService.get();
  }
}

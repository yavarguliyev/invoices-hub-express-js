import { Container } from 'typedi';
import { useContainer as typeormUseContainer } from 'typeorm';
import { useContainer as routingControllersUseContainer } from 'routing-controllers';

import { AuthController } from 'api/v1/auth.controller';
import { HealthcheckController } from 'api/v1/healthcheck.controller';
import { InvoicesController } from 'api/v1/invoices.controller';
import { OrdersController } from 'api/v1/orders.controller';
import { RolesController } from 'api/v1/roles.controller';
import { UsersController } from 'api/v1/users.controller';
import { AuthService } from 'application/services/auth.service';
import { HealthcheckService } from 'application/services/healthcheck.service';
import { InvoiceService } from 'application/services/invoice.service';
import { OrderService } from 'application/services/order.service';
import { RoleService } from 'application/services/role.service';
import { UserService } from 'application/services/user.service';
import { ContainerHelper } from 'application/ioc/helpers/container.helper';
import { ContainerItems } from 'application/ioc/static/container-items';
import { registerService } from 'application/helpers/utility-functions.helper';
import { HelmetMiddleware } from 'core/middlewares/helmet.middleware';
import { GlobalErrorHandlerMiddleware } from 'core/middlewares/error-handler.middleware';
import Invoice from 'domain/entities/invoice.entity';
import Order from 'domain/entities/order.entity';
import Role from 'domain/entities/role.entity';
import User from 'domain/entities/user.entity';
import { InvoiceRepository } from 'domain/repositories/invoice.repository';
import { OrderRepository } from 'domain/repositories/order.repository';
import { RoleRepository } from 'domain/repositories/role.repository';
import { UserRepository } from 'domain/repositories/user.repository';
import { ExpressServerInfrastructure } from 'infrastructure/express-server.infrastructure';
import { DbConnectionInfrastructure } from 'infrastructure/db-connection.infrastructure';

export function configureContainers () {
  typeormUseContainer(Container);
  routingControllersUseContainer(Container);
};

export async function configureRepositories () {
  const dataSource = await DbConnectionInfrastructure.create();
  await dataSource.initialize();

  const invoiceRepository = dataSource.getRepository(Invoice);
  const orderRepository = dataSource.getRepository(Order);
  const roleRepository = dataSource.getRepository(Role);
  const userRepository = dataSource.getRepository(User);

  Container.set(InvoiceRepository, invoiceRepository);
  Container.set(OrderRepository, orderRepository);
  Container.set(RoleRepository, roleRepository);
  Container.set(UserRepository, userRepository);
};

export function configureInfrastructures () {
  Container.set(ExpressServerInfrastructure, new ExpressServerInfrastructure());
};

export function configureMiddlewares () {
  Container.set(HelmetMiddleware, new HelmetMiddleware());
  Container.set(GlobalErrorHandlerMiddleware, new GlobalErrorHandlerMiddleware());
};

export function configureControllersAndServices () {
  registerService({ id: ContainerItems.IAuthService, service: AuthService });
  registerService({ id: ContainerItems.IHealthcheckService, service: HealthcheckService });
  registerService({ id: ContainerItems.IInvoiceService, service: InvoiceService });
  registerService({ id: ContainerItems.IOrderService, service: OrderService });
  registerService({ id: ContainerItems.IRoleService, service: RoleService });
  registerService({ id: ContainerItems.IUserService, service: UserService });

  ContainerHelper
    .registerController(AuthController)
    .registerController(HealthcheckController)
    .registerController(InvoicesController)
    .registerController(OrdersController)
    .registerController(RolesController)
    .registerController(UsersController);
};

import { Column, Entity, OneToMany, Index } from 'typeorm';

import BaseEntity from 'entities/base.entity';
import User from 'entities/user.entity';
import { Roles } from 'value-objects/enums/roles.enum';
import { Entities } from 'value-objects/enums/entities.enum';
import Invoice from 'entities/invoices.entity';

@Entity(Entities.ROLE)
export default class Role extends BaseEntity {
  @Column({ type: 'enum', enum: Roles, default: Roles.Standard })
  @Index({ unique: true })
  name: Roles;

  @OneToMany(() => Invoice, (invoice) => invoice.approvedByRole)
  public invoices: Invoice[];

  @OneToMany(() => User, (user) => user.role)
  public users: User[];
}

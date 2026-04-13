import { SetMetadata } from '@nestjs/common';
import { RolUsuario } from '../../usuarios/user-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolUsuario[]) => SetMetadata(ROLES_KEY, roles);

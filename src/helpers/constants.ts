import { User } from 'redux/reducers/types';

interface AccessUser {
  admin: string;
  superAdmin: string;
  employee: string;
  login: string;
}

export const URL = 'https://zet-bit-super-holiday-intern.herokuapp.com/';
export const accessUser: AccessUser = {
  admin: 'admin',
  superAdmin: 'super',
  employee: 'user',
  login: '/'
};

interface OnDefaultPass {
  dashboard: string;
  users: string;
}
export const defaultPass: OnDefaultPass = {
  dashboard: 'dashboard',
  users: 'users'
};

export function getUserAccess(user: User | null): string {
  if (!user) {
    return accessUser.login;
  }
  switch (user.role) {
    case accessUser.admin:
      return accessUser.admin;
    case accessUser.superAdmin:
      return accessUser.admin;
    case accessUser.employee:
      return accessUser.employee;
    default:
      return accessUser.login;
  }
}

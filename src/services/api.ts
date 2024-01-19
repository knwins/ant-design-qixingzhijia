import { PrivilegeItem } from '@/pages/Setting/data';
import { request } from '@umijs/max';
import host from '../host';

export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(host.api + 'api/user/current', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(host.api + 'api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: body,
    ...(options || {}),
  });
}

/**左侧动态导航 */
export async function privilegeMenus(options?: { [key: string]: any }) {
  return request<{
    data: PrivilegeItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/privilege/menus', {
    method: 'POST',
    ...(options || {}),
  });
}

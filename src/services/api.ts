// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../host';
 
 export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(host.api+'api/admin/adminuser/current', {
    method: 'POST',
    ...(options || {}),
  });
}

 export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(host.api+'api/admin/adminuser/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


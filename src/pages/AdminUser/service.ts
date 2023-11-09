// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../../host';
import type { AdminUserItem } from './data';

 
export async function queryAdminUserList(
  params: {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: AdminUserItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>(host.api+'api/admin/adminuser/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getAdminUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/admin/admin-user/get', {
    data,
    method: 'GET',
    ...(options || {}),
  });
}


export async function updateAdminUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    info?: string;
    status?: boolean;
  }>(host.api+'api/admin/admin-user/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

 
export async function removeAdminUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/admin/admin-user/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}


/**修改密码 */
export async function modifyPassword(
  data: { [username: string]: any },
  options?: { [id: string]: any },
) {
  return request<{ status?: boolean; info?: string }>(host.api+'api/admin-user/modifypassword', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}



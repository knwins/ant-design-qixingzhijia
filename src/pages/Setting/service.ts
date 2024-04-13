// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import host from '../../host';
import type {
  OptionData,
  OptionItem,
  OptionMarkItem,
  RoleItem,
  SiteConfigItem,
  TaskItem,
  UserItem,
} from './data';
import { PrivilegeItem } from './data';

export async function getSiteConfig(
  params: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: SiteConfigItem;
    success?: boolean;
  }>(host.api + 'api/system/siteconfig/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateSiteConfig(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/siteconfig/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

//---------------------Privilege---------------------------
export async function queryPrivilegeList(
  params: {
    current?: number;
    pageSize?: number;
    parentId?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: PrivilegeItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/privilege/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryParentList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: PrivilegeItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/privilege/parent', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryParentListCheckBox(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: PrivilegeItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/privilege/setting', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addPrivilege(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/privilege/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updatePrivilege(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/privilege/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function removePrivilege(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/privilege/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//---------------------role---------------------------
export async function queryRoleList(
  params: {
    current?: number;
    pageSize?: number;
    parentId?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: RoleItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/role/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getRole(params: { id: any }, options?: { [id: string]: any }) {
  return request<{
    data: RoleItem;
    success?: boolean;
  }>(host.api + 'api/system/role/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

export async function addRole(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/role/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateRole(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/role/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function removeRole(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/role/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/** SystemUser */

export async function querySystemUserList(
  params: {
    current?: number;
    pageSize?: number;
    type?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: UserItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/user/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function querySystemUserSelect(
  params: {
    current?: number;
    pageSize?: number;
    type?: string;
    keywords?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: UserItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/user/select', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getSystemUser(
  params: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: UserItem;
    success?: boolean;
  }>(host.api + 'api/system/user/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

export async function addSystemUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/user/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateSystemUser(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/user/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function removeSystemUser(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/user/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/**修改密码 */
export async function initPassword(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/user/init_password', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** Option */

export async function queryOptionList(
  params: {
    current?: number;
    pageSize?: number;
    mark?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: OptionItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/option/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryOptionSelect(params: {
  current?: number;
  pageSize?: number;
  type?: string;
}) {
  return request<{
    data: OptionData;
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/option/select', {
    method: 'POST',
    params: {
      ...params,
    },
  });
}

export async function queryOptionMark(
  params: {
    current?: number;
    pageSize?: number;
    type?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: OptionMarkItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/option/mark', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getOption(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: OptionItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/system/option/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateOption(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/system/option/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addOption(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/option/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeOption(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/system/option/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/**Task */

export async function queryTaskList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: TaskItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/system/task/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

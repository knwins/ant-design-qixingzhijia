export type SiteConfigItem = {
  id: string;
  name: string;
  title: string;
  domain: string;
  description: string;
  keywords: string;
  uploadFileServer: string;
  arrPush: string;
  quoteStartTime: string;
  tempTime: Date;
  blockNubmer: string;
  appVersion: string;
  verMessage: string;
  verUrl: string;
  appAndroidVersion: string;
  verAndroidMessage: string;
  verAndroidUrl: string;
  monitorSpot: number;
  monitorFuture: number;
};

export type pagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type SiteConfigParams = {
  id: string;
};

export type PrivilegeItem = {
  id: string;
  name?: string;
  path?: string;
  component?: string;
  type?: string;
  sort?: number;
  children?: Array<PrivilegeItem>;
  parent?: PrivilegeItem;
  parentId?: string;
};

export type PrivilegeParams = {
  parentId?: string;
  roleId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<PrivilegeItem>;

export type RoleItem = {
  id: string;
  name?: string;
  privileges?: PrivilegeItem[];
  privilegeIds?:any[];
};

export type RoleParams = {
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<RoleItem>;


export type SystemUserPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type SystemUserItem = {
  id: string;
  username: string;
  password:string;
  nick?: string;
  phone?: string;
  email?: string;
  description?: string;
  role?:RoleItem;
};

export type SystemUserParams = {
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<SystemUserItem>;
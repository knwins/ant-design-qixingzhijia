export type pagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type UserItem = {
  id: string;
  name: string;
  portrait: string;
  createTime: Date;
  state: string;
  nickName: string;
  signature: string;
  parent: UserItem;
};

export type UserParams = {
  username?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<UserItem>;


export type UserLogItem = {
  id: string;
  ip: string;
  content: string;
  createTime: Date;
  type: string;
  user: UserItem;
};

export type UserLogParams = {
  userId?: string;
  filter?: string;
  sorter?: string;
};


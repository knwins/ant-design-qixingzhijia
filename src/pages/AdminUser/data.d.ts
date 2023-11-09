export type AdminUserPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type AdminUserItem = {
  id: string;
  username: string;
  nick?: string;
  phone?: string;
  email?: string;
  description?: string;
};

 
import { UserItem } from '../User/data';

export type ExchangeItem = {
  id: string;
  name: string;
  account: string;
  state: string;
  user: UserItem;
  endTime: Date;
};

export type ExchangePagination = {
  total: number;
  pageSize: number;
  current: number;
};

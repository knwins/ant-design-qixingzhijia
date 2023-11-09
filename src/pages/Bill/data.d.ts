import type { UserItem } from '../User/data';

export type BillTypeItem = {
  id: string;
  name: string;
  value: string;
  mark: string;
  state: number;
};

export type BillItem = {
  id: string;
  name: string;
  currentBalance: number;
  amount: number;
  createTime: Date;
  user: UserItem;
  billType: BillTypeItem;
};

export type pagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type BillParams = {
  billTypeId?: string;
  userId?:string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<BillItem>;

//-------------------BillWithdraw-------------------------
export type BillWithdrawItem = {
  id: string;
  amount: number;
  state: number;
  sendAddress: string;
  receiveAddress: string;
  inro: string;
  txHash: string;
  createTime: Date;
  updateTime: Date;
  user: UserItem;
};

export type BillWithdrawParams = {
  userId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<BillWithdrawItem>;

//-------------------BillInvest-------------------------
export type BillInvestItem = {
  id: string;
  coin: number;
  amount: number;
  state: number;
  sendAddress: string;
  receiveAddress: string;
  txHash: string;
  createTime: Date;
  user: UserItem;
};

export type BillInvestParams = {
  userId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<BillInvestItem>;

//-------------------Wallet-------------------------
export type WalletItem = {
  id: string;
  name: string;
  coin: string;
  address: string;
  privateKey: string;
  publicKey: string;
  createTime: Date;
  state: number;
  user: UserItem;
};

export type WalletParams = {
  userId?: string;
  
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<WalletItem>;
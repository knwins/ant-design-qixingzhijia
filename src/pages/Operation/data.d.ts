import { ProductItem } from '../Asset/data';
import { UserItem } from '../Setting/data';

export type Pagination = {
  total?: number;
  pageSize: number;
  current: number;
};

export type StoreItem = {
  id: string;
  name: string;
  type: string;
  address?: string;
  user: UserItem;
  userId?: string;
  province: ProvinceCityDistrictItem;
  city: ProvinceCityDistrictItem;
  district: ProvinceCityDistrictItem;
};

export type StoreParams = {
  type?: string;
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<StoreItem>;



export type ProductCheckItem = {
  id: string;
  input0: boolean;
  input1: boolean;
  input2: boolean;
  input3: boolean;
  input4: boolean;
  content: string;
  address: string;
  imglist: string;
  inro:string;
  imgs:string[];
  createTime: Date;
  product: ProductItem;
  user: UserItem;
};



export type ProductLeaseItem = {
  id: string;
  product: ProductItem;
  user: UserItem;
  inro: string;
  deductAmount: number;
  amountTotal: number;
  deposit: number;
  numTotal: number;
  price: number;
  deposit: number;
  state: string;
  payType: string;
  createTime: Date;
  startTime: Date;
  endTime: Date;
  action:string;
};

export type ProductLeaseParams = {
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<ProductLeaseItem>;


export type ProductLeaseOrderItem = {
  id: string;
  productLease: ProductLeaseItem;
  inro: string;
  amount: number;
  num: number;
  action: string;
  createTime: Date;
};


export type ProductLeaseOrderParams = {
  keywords?: string;
  productLeaseId?:string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<ProductLeaseOrderItem>;


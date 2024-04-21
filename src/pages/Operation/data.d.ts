import { ProductItem } from '../Asset/data';
import { UserItem } from '../Setting/data';

export type Pagination = {
  total?: number;
  pageSize: number;
  current: number;
};


export type StoreGroupItem = {
  id: string;
  name: string;
  user: UserItem;
  Business:BusinessItem;
  userId?: string;
  businessId:string;
  label?:string;
  value?:string;
};

export type StoreGroupParams = {
  businessId?:string;
  userId?:string;
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<StoreItem>;


export type StoreItem = {
  id: string;
  name: string;
  typeArr: string;
  categoryArr:string[];
  address?: string;
  user: UserItem;
  userId?: string;
  label?:string;
  value?:string;
  storeGroup?:StoreGroupItem;
  address?:AddressItem;
  business?:BusinessItem;
  fnjToken?:string;
};

export type StoreParams = {
  type?: string;
  category?:string;
  businessId?:string;
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<StoreItem>;


export type AddressItem = {
  id: string;
  detail?: string;
  province: ProvinceCityDistrictItem;
  city: ProvinceCityDistrictItem;
  district: ProvinceCityDistrictItem;
  latitude?:string;
  longitude?:string;
  label?:string;
  value?:string;
};

export type AddressParams = {
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<AddressItem>;



export type BusinessItem = {
  id: string;
  name: string;
  label:?string;
  value:?string;
};

export type BusinessParams = {
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<BusinessItem>;


export type PartnerItem = {
  id: string;
  name: string;
  username: string;
  phone: string;
  label?:string;
  value?:string;
};

export type PartnerParams = {
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<PartnerItem>;





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
  leaseUser:UserItem;
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


export type BusinessItem = {
  id: string;
  name:string;
  state:string;
  createTime: Date;
};


export type BusinessParams = {
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<BusinessItem>;



export type WarnInfoItem = {
  id: string;
  readTime: Date;
  createTime: Date;
  devId: string;
  alarmTime: Date;
  alarmDesc: string;
  alarmFlag: number;
  alarmId: string;
  alarmType: string;
  alarmMessage: string;
  type: string;
  business:BusinessItem;
};


export type WarnInfoParams = {
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<WarnInfoItem>;


export type CoinPriceItem = {
  id: string;
  symbol: string;
  symbolType: string;
  exchange: string;
  buyPrice: string;
  sellPrice: string;
  createTime: Date;
};

export type pagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type CoinThrendItem = {
  id: string;
  symbol: string;
  symbolType: string;
  threndType: string;
  longShort: string;
  interval: string;
  message: string;
  updateTime: Date;
};

export type CoinItem = {
  id: string;
  name: string;
  state: string;
  symbol: string;
  symbolType: string;
  lot: number;
  min: number;
  max: number;
  top: string;
};


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
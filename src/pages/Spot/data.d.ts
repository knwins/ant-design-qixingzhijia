import { ExchangeItem } from "../Coin/data";
import { UserItem } from "../User/data";

export type SpotItem = {
  id: string;
  name: string;
  symbol: string;
  state: string;
  runEnvironment: string;
  trackType: string;
  averagePrice: number;
  tokenTotal: number;
  moneyTotal: number;
  tradeNumber: number;
  profit: number;
  lastRunTime: Date;
};

export type Pagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type SpotStrategyItem = {
  id: string;
  name: string;
  handOperation: boolean;
  state: boolean;
  everyTradePercent: number;
  planBuyPercent: number;
  planSellPercent: number;
  forceSellPercent: number;
  incomePercent: number;
  pauseMinute: number;
  forceSellCacheTime: number;
  cancelOrderTime: number;
  interval: string;
  records: number;
  maxNumber: number;
  cancelOrderTime: number;

  //trackDown
  trackDown: boolean;
  trackDownInterval: string;
  trackDownPercent: number;
  trackDownMaxNumber: number;
  trackDownMaxHoldPercent: number;

  //trackUp
  trackUp: string;
  trackUpInterval: string;
  trackUpPercent: number;
  trackUpMaxNumber: number;
  trackUpMaxHoldPercent: number;

  // 首尾减仓模式参数
  subFristLastHold: boolean;
  subFristLastHoldPercent: number;

  // 首尾减仓模式参数
  subLastHold: boolean;
  subLastHoldPercent: number;

  // 倍投模式参数
  doubleHold: boolean;
  doubleHoldPercent: number;

  // AI
  trackAI: boolean;
  trackAIName: string;
  trackAISymbol: string;
  trackAISide: string;
  trackAITradeNumber: number;
  trackAIStopTime: Date;

  //递增递减模式
  initPlanBuyPercent: number;
  initPlanBuyDecrease: number;
};


export type SpotTradeItem = {
  id: string;
  createTime:Date;
  tradeType: string;
  orderId: string;
  clientOrderId: string;
  price?: number;
  rUnitQty: number;
  lUnitQty: number;
  origRUnitQty: number;
  origLUnitQty: number;
  fee: number;
  number: number;
  profit: number;
  runEnvironment: string;
  syncCount: number;
  trackType: string;
  status: string;
  userMsg: string;
  systemMsg: string;
  exchange:ExchangeItem;
  spot:FutureItem;
  user:UserItem;
};

export type SpotTradeParams = {
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<SpotTradeItem>;
 





	 
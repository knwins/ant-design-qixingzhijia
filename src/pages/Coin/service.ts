// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../../host';
import type { CoinItem, CoinPriceItem, CoinThrendItem ,ExchangeItem} from './data';

//-------------------------Coin---------------------
export async function queryCoinList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: CoinItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/coin/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function addCoin(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/coin/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateCoin(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/coin/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function removeCoin(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/coin/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//-------------CoinPrice--------------


export async function queryCoinPriceList(
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
    data: CoinPriceItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/coin/price/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}



export async function queryCoinThrendList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: CoinThrendItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/coin/thrend/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function queryExchangeList(
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
    data: ExchangeItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/exchange/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

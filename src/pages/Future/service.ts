// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../../host';
import type { FutureExtOrderItem, FutureItem, FutureTradeItem } from './data';

export async function queryFutureList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FutureItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/future/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}



export async function getFuture(params: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: FutureItem;
    success?: boolean;
  }>(host.api+'api/admin/future/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

//------------------FutureStrategy--------
export async function queryFutureStrategyList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FutureItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/future/strategy/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addFutureStrategy(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/future/strategy/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateFutureStrategy(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/future/strategy/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function removeFutureStrategy(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/future/strategy/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//------------------FutureTrade--------
export async function queryFutureTradeList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FutureTradeItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/future/trade/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getFutureTrade(params: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: FutureTradeItem;
    success?: boolean;
  }>(host.api+'api/admin/future/trade/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

//------------------FutureExtOrder--------
export async function queryFutureExtOrderList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FutureExtOrderItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/future/ext/order/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}



export async function getFutureExtOrder(params: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: FutureExtOrderItem;
    success?: boolean;
  }>(host.api+'api/admin/future/ext/order/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

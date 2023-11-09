// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../../host';
import type { SpotItem, SpotTradeItem } from './data';

export async function querySpotList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: SpotItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/spot/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

//------------------SpotStrategy--------
export async function querySpotStrategyList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: SpotItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/spot/strategy/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addSpotStrategy(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/spot/strategy/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateSpotStrategy(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/spot/strategy/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function removeSpotStrategy(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/spot/strategy/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}


//------------------SpotTrade--------
export async function querySpotTradeList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: SpotTradeItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/admin/spot/trade/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getSpotTrade(params: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: SpotTradeItem;
    success?: boolean;
  }>(host.api+'api/admin/spot/trade/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}


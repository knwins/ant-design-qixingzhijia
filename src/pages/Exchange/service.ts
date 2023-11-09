// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../../host';
import type { ExchangeItem } from './data';

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

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../../host';
import type { TaskItem } from './data';

export async function queryTaskList(
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
    data: TaskItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/task/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

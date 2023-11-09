// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import host from '../../host';
import type { SiteConfigItem } from './data';

export async function getSiteConfig(
  params: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: SiteConfigItem;
    success?: boolean;
  }>(host.api + 'api/admin/siteconfig/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateSiteConfig(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/admin/siteconfig/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

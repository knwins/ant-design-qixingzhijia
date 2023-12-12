import { request } from 'umi';
import host from '../../host';
import { ArticleItem, ArticleTypeItem, ExpressItem } from './data';

export async function queryArticleList(
  params: {
    current?: number;
    articleTypeId?: null;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ArticleItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/article/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getArticle(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: ArticleItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/article/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateArticle(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/article/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addArticle(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/article/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeArticle(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/article/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function queryArticleTypeList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<{
    data: ArticleTypeItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/article/type/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getArticleType(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: ArticleTypeItem;
    success?: boolean;
  }>(host.api + 'api/manage/article/type/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateArticleType(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/article/type/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addArticleType(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/article/type/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeArticleType(data: { id: string }, options?: { [key: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/article/type/delete', {
    data,
    method: 'DELETE',

    ...(options || {}),
  });
}

//-----------------Express------------

export async function queryExpressList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<{
    data: ExpressItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/express/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getExpress(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: ExpressItem;
    success?: boolean;
  }>(host.api + 'api/manage/express/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateExpress(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/express/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addExpress(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/express/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeExpress(data: { id: string }, options?: { [key: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/express/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
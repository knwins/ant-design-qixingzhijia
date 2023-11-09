import { UserItem } from "../User/data";

export type ArticleItem = {
  id: string;
  title: string;
  status: number;
  keywords?: string;
  createTime: Date;
  contentTxtUrl:string;
  sort: number;
  articleTypeId: string;
  articleType: ArticleTypeItem;
  body:string;
};

export type Pagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type ArticleParams = {
  title?: string;
  status?: number;
  ArticleTypeId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type ArticleTypeItem = {
  id: string;
  name: string;
  description: string;
  mark?: string;
  thumbImgWidth?: number;
  thumbImgHeight?: number;
  lang?: string;
};

export type ArticleTypePagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type ArticleTypeData = {
  list: ArticleTypeItem[];
  pagination: Partial<ArticleTypePagination>;
};

export type ArticleTypeParams = {
  name?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};


export type ExpressItem={
  id: string;
  title: string;
  status: number;
  content: string;
  createTime: Date;
  showEndtime?:Date;
  hitCount: number;
  source:string;
  user?:UserItem;
}
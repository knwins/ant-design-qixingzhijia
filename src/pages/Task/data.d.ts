export type TaskItem = {
  id: string;
  name:string;
  status: string;
  startTime: Date;
  endTime:Date;
  lastUpdateTime:Date;
  takeTime:number;
  number:number;
  httpurl?:string;
  description?:string;
  sort:number;
};

export type TaskPagination = {
  total: number;
  pageSize: number;
  current: number;
};

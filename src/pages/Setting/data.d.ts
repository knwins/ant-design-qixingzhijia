export type SiteConfigItem = {
  id: string;
  name: string;
  title: string;
  domain: string;
  description: string;
  keywords: string;
  uploadFileServer: string;
  arrPush: string;
  quoteStartTime: string;
  tempTime: Date;
  blockNubmer: string;
  appVersion: string;
  verMessage: string;
  verUrl: string;
  appAndroidVersion: string;
  verAndroidMessage: string;
  verAndroidUrl: string;
  monitorSpot: number;
  monitorFuture: number;
};

export type pagination = {
  total: number;
  pageSize: number;
  current: number;
};


export type SiteConfigParams = {
  id: string
};




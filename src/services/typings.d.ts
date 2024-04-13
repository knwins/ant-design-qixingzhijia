declare namespace API {
  type CurrentUser = {
    id: string;
    username: string;
    nick: string;
    avatar?:string;
    phone?:string;
    group?:string;
  };

  // LoginResult
  type LoginResult = {
    currentAuthority?: string;
    status?: boolean;
    token: string;
    roleGroup: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    username?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type CaptchaParams = {
    username?: string;
    lang?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    lang?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };
}

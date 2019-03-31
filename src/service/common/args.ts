export interface INoTokenSession {
  account: string;
  user: string;
  groups: string[];
}

export interface ISession extends INoTokenSession {
  token: string;
}

export interface IServiceArgs {
  session: ISession;
}

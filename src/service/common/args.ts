export interface ISession {
  token: string;
  account: string;
  user: string;
  groups: string[];
}

export interface IServiceArgs {
  session: ISession;
}

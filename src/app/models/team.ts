import { IUserPublicInfo } from './user-info';

export interface ITeam {
  name: string;
  employees?: IUserPublicInfo[];
}

export interface IUserInfo {
  id?: string;
  name: string;
  cpf: string;
  position: string;
  team: string;
  salary: number;
  email: string;
  password: string;
  phoneNumber: string;
  profilePic?: string;
}

export interface IUserPublicInfo {
  name: string;
  position: string;
  team: string;
  teamID: string;
  email: string;
  phoneNumber: string;
  profilePic: string;
}

/*
name: [null],
      cpf: [null],
      position: [null],
      team: [null],
      salary: [null],
      profilePic: [],
      email: [null],
      password: [null],
      phoneNumber: [null],
*/

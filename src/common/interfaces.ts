import { IBaseEntity } from "./base.interface";
import { UserRole } from "./constants/enum";

export interface ISignUpUser {
  name: string;
  firstName: string;
  lastName: string;
  type: UserRole;
  phone: string;
  password: string;
  email: string;
  confirmPassword: string;
}

export interface IAnnouncement extends IBaseEntity {
  content: string;
}

export interface ISignIn {
  email: string;
  password: string;
  platform?: string;
}

export interface ISettings {
  name: string;
  value: string;
}

export interface IUser extends ISignUpUser, Omit<ISignUpUser, "password"> {
  id: string;
  status: string; // Active or Inactive
}

export interface IAppUsers {
  id: string;
  address: string;
  bannedIpAddress: string;
  createdAt: string;
  deliveries: number;
  electricityBill: string;
  email: string;
  firstName: string;
  lastName: string;
  idImageBack: string;
  idImageFront: string;
  idNumber: number;
  idType: string;
  isActivated: boolean;
  isBanned: boolean;
  phone: string;
  phone2: string;
  profilePhoto: string;
  rating: number;
  registrationFeeStatus: boolean;
  role: UserRole;
  status: string;
  totalRating: number;
  username: string;
}

export interface IKeywords {
  onSearch: (query: string) => void;
}
// take out

export interface ICategories {
  id: string;
  name: string;
  description: string;
  amount: number;
}

export enum UserStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

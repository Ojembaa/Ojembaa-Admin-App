import { IBaseEntity } from "./base.interface";
import { UserRole } from "./constants/enum";

export interface ISignUpUser {
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
  activate: boolean;
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

export interface ICourierDetails {
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
  activate: boolean;
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
  tools: ITool[];
  bankInformation: IBankInformation[];
  guarantor: ICourierGuarantor[];
}

export interface ITool {
  id: string;
  vehicleType: string;
  proof: string;
  image: string;
}

export interface IBankInformation {
  id: string;
  name: string;
  code: string;
  bvn: string;
  holder: string;
  number: string;
}

export interface ICourierGuarantor {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  occupation: string;
  address: string;
  phone: string;
  email: string;
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

export interface ITransaction {
  id: string;
  courierId: string;
  courier: IUser;
  type: TransactionEnums;
  amount: number;
  prevBalance: number;
  currBalance: number;
  recordId: string;
  proof: string;
  status: TransactionStatus;
}

export enum TransactionEnums {
  DELIVERY = "DELIVERY",
  RECONCILIATION = "RECONCILIATION",
}

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  REJECTED = "rejected",
}

export enum UserStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

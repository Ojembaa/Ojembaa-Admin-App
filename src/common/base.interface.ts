import { Method } from "axios";

export interface IBaseApiResponse<TEntity> {
  success: boolean;
  message: string;
  data: TEntity;
}

export interface IBaseErrorObject {
  message: string;
  method?: Method;
  path?: string;
  statusCode: number;
  timestamp?: string;
}

export interface IBaseEntity {
  id: string;
  entityName: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}

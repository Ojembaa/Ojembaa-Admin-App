import axios from "axios";
import {
  IAppUsers,
  ICategories,
  ISettings,
  ISignIn,
  ISignUpUser,
} from "@/common/interfaces";
import { getAuthFromLocal } from "./store";

export interface QueryParamDto {
  limit?: number;
  start_date?: string;
  end_date?: string;
  search?: string | null;
  next_page_token?: string | null;
  current_date?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Auth Request
export function httpLogin(authObject: ISignIn) {
  try {
    return axios.post(`${API_URL}/auth/sign-in`, authObject);
  } catch (error) {
    console.log(error);
  }
}

export async function httpRegister(authObject: ISignUpUser) {
  try {
    return await axios.post(`${API_URL}/admin/auth/sign-up`, authObject);
  } catch (error) {
    console.log(error);
  }
}

// Category Request
export async function httpCreateCategory(value: ICategories) {
  try {
    return axios.post(`${API_URL}/categories`, value, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function httpGetCategories(query?: QueryParamDto) {
  const response = await axios.get(`${API_URL}/categories`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
    params: { ...query },
  });
  return response.data.data;
}

export async function httpUpdateCategoryById(id: string, object: ICategories) {
  try {
    return await axios.put(`${API_URL}/categories/${id}`, object, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function httpDeleteCategoryById({ id }: { id: string }) {
  try {
    return axios.delete(`${API_URL}/categories/${id}`, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error, "error");
  }
}

export async function httpGetReconciliationData(query?: QueryParamDto) {
  const response = await axios.get(`${API_URL}/admin/transactions`, {
    headers: {
      Authorization: "Bearer " + getAuthFromLocal(),
    },
    params: { ...query },
  });
  return response.data.data;
}

export async function httpGetBulletinById(id: string) {
  try {
    return axios.get(`${API_URL}/bulletin/${id}`, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error, "error");
  }
}

// Setting Request
export async function httpCreateSetting(Obj: ISettings) {
  try {
    return axios.post(`${API_URL}/admin/settings`, Obj, {
      headers: { Authorization: "Bearer " + getAuthFromLocal() },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function httpGetSettings() {
  try {
    return axios.get(`${API_URL}/admin/settings`, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function httpGetCourierDetailById(id: string) {
  try {
    return axios.get(`${API_URL}/admin/couriers/${id}`, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error, "error");
  }
}

export async function httpDeleteAnnouncementById(id: string) {
  try {
    return axios.delete(`${API_URL}/announcement/${id}`, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error, "error");
  }
}

// User
export async function httpGetUsers() {
  try {
    return axios.get(`${API_URL}/admin/users`, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function httpUpdateUserById(id: string, data: Partial<IAppUsers>) {
  try {
    return await axios.patch(`${API_URL}/admin/couriers/${id}`, data, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

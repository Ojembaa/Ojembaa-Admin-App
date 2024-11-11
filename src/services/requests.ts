import axios from "axios";
import {
  AppUsers,
  BulletinStatusEnum,
  CreateBulletinDTO,
  IAnnouncement,
  ICategories,
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

export async function httpUpdateBulletinById(
  id: string,
  authObject: CreateBulletinDTO
) {
  try {
    return await axios.patch(`${API_URL}/bulletin/${id}`, authObject, {
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

export async function httpDeleteCategoryById(id: string) {
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

// Announcement Request
export async function httpCreateAnnouncement(Obj: IAnnouncement) {
  try {
    return axios.post(`${API_URL}/announcement/create`, Obj, {
      headers: { Authorization: "Bearer " + getAuthFromLocal() },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function httpGetAnnouncements() {
  try {
    return axios.get(`${API_URL}/announcement`, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function httpGetAnnouncementById(id: string) {
  try {
    return axios.get(`${API_URL}/announcement/${id}`, {
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

export async function httpPublishBulletin(
  id: string,
  status: BulletinStatusEnum
) {
  try {
    return axios.patch(
      `${API_URL}/bulletin/${id}/status?status=${status}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + getAuthFromLocal(),
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// export async function httpCreateAnnouncement(Obj: IAnnouncement) {
//   try {
//     return await axios.post(`${API_URL}/announcement/create`, Obj, {
//       headers: { Authorization: "Bearer " + getAuthFromLocal() },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

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

export async function httpUpdateUserById(id: string, data: Partial<AppUsers>) {
  try {
    return await axios.patch(`${API_URL}/auth/verify-user/${id}`, data, {
      headers: {
        Authorization: "Bearer " + getAuthFromLocal(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

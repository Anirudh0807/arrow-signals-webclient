import axios, { AxiosError, AxiosResponse } from "axios";
import { baseUrl } from "./constants";

const authBaseUrl = baseUrl + "/auth";

interface AuthResponseDto {
  accessToken: string;
  userData: AuthUserData;
}

interface AuthUserData {
  id: number;
  name: string;
  email: string;
  type: string;
  profilePic: string;
  deleted: string;
  authType: string;
}

export interface AuthResponseWrapper {
  success: boolean;
  data: AuthResponseDto;
}

const authAxios = axios.create({
  baseURL: authBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function localAuth(authData: any): Promise<AuthResponseWrapper> {
  let res: AuthResponseWrapper;
  return authAxios
    .post(authBaseUrl + "/signin", authData)
    .then((authRes: AxiosResponse<AuthResponseDto>) => {
      res = {
        success: true,
        data: authRes.data,
      };
      console.log(authRes);
      return res;
    })
    .catch((err) => {
      console.error(err);
      res.success = false;
      return res;
    });
}

export async function googleAuth() {}

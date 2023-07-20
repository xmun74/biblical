import { axiosInstance } from '@/config/axiosConfig';

export interface LoginResponse {
  message: string;
  userInfo?: {
    userId: number;
    nickname: string;
    email: string;
  };
}

/** AUTH */
export const login = async (email: string, password: string): Promise<LoginResponse | null> => {
  const { data } = await axiosInstance.post(`/auth/login`, { email, password });
  return data;
};

export const logout = async (): Promise<{ message: string }> => {
  const { data } = await axiosInstance.get(`/auth/logout`);
  return data;
};

export const getCheckAuth = async () => {
  const { data } = await axiosInstance.get('/auth/check');
  return data;
};

/** USER */
export const getUser = async (userId: number) => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data;
};
export const patchUser = async (userId: number, nickname: string) => {
  const { data } = await axiosInstance.patch(`/users/${userId}`, { nickname });
  return data;
};
export const deleteUser = async (userId: number) => {
  const res = await axiosInstance.delete(`/users/${userId}`);
  return res;
};

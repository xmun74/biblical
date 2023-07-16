import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000,
  withCredentials: true,
});

const logOnDev = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
};

const onRequest = async (config: InternalAxiosRequestConfig) => {
  const { method, url } = config;
  logOnDev(`👉 Req [${method?.toUpperCase()}] | URL: ${url}`);
  config.timeout = 15000;

  return config;
};

const onResponse = async (response: AxiosResponse) => {
  const { method, url } = response.config;
  const { status } = response;
  logOnDev(`👈 Res [${method?.toUpperCase()}] ${status} | URL: ${url}`);

  return response;
};

const onErrorResponse = async (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    // const originRequest = error.config;

    logOnDev(`🚨 Error [${method?.toUpperCase()}] ${status} :${message} | URL: ${url}`);
  } else {
    logOnDev(`🚨 Error ${error.message}`);
    console.error(error.message);
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, err => Promise.reject(err));
axiosInstance.interceptors.response.use(onResponse, onErrorResponse);

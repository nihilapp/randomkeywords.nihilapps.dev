import { AxiosError, HttpStatusCode } from 'axios';

export type ApiResponse<T> = {
  resData: T;
  message: string;
}

type ResponseError = {
  resData: null;
  message: string;
}

export type ApiError = AxiosError<ResponseError>;

export interface CreateResponse<T> {
  type: 'success' | 'error'
  resData: T;
  message: string,
  status: keyof typeof HttpStatusCode;
}

export interface ISiteMeta {
  title: string;
  url?: string;
  description?: string;
  author?: string;
  keywords?: string;
  type?: string;
  tags?: string;
  section?: string;
  created?: string;
  updated?: string;
  image?: {
    link: string;
    alt: string;
  };
}

export interface IConfigData {
  title: string;
  description: string;
  url: string;
  type: string;
  image: {
    link: string;
    alt: string;
  };
  keywords: string;
  author: {
    name: string;
    url: string;
  };
  version: string;
  googleVerfi: string;
  googleAdSrc: string;
  googleAnalyticsId: string;
  isBaseUrl: string;
}

import axios, {AxiosResponse} from 'axios';
import Apis from '../api/Apis';

const instance = axios.create({
  // native使用安卓模拟器访问localhost需要把http://127.0.0.1替换为http://10.0.2.2
  // https://stackoverflow.com/questions/49370747/network-error-with-axios-and-react-native
  // baseURL: 'http://127.0.0.1:7001',
  baseURL: 'http://10.0.2.2:7001',
  timeout: 10 * 1000,
});

export const request = (
  name: keyof typeof Apis,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  const api = (Apis as any)[name];
  const {url, method} = api;
  if (method === 'get') {
    return get(url, params);
  } else {
    return post(url, params);
  }
};

export const get = (
  url: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  return instance.get(url, {
    params: params,
  });
};

export const post = (
  url: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  return instance.post(url, params);
};

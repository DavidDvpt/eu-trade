import axios from 'axios';

export function AxiosPublicInstance() {
  const request = axios.create({ baseURL: 'http://localhost:8000/api/v1' });

  return request;
}

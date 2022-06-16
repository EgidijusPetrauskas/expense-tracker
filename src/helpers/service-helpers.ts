/* eslint-disable import/prefer-default-export */
import { AxiosError, AxiosResponse } from 'axios';

export type ResponseError = Omit<AxiosError, 'response'> & {
  response: AxiosResponse<{ error: string }>
};
export const isResponseError = (err: unknown | ResponseError): err is ResponseError => Boolean(
  err instanceof AxiosError
  && err.response
  && err.response.data.error,
);

export const formatError = (err: unknown): string => {
  if (isResponseError(err)) {
    return err.response.data.error;
  } if (err instanceof Error) {
    return err.message;
  }
  return err as string;
};

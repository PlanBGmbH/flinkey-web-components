import { HttpResponse } from './utils';

/**
 * Sends an HTTP request via fetch API.
 * @param {Request} request - The HTTP request to send via fetch API.
 * @returns {Promise<HttpResponse<T>>} The HTTP response.
 * @template T
 */
async function http<T>(request: Request): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  let parsedBody: unknown;

  try {
    if (response.status !== 204) {
      // This would may error if there is no body.
      parsedBody = await response.json();
    }
  } catch {}

  if (!response.ok) {
    throw response;
  }

  response.parsedBody = parsedBody as T | undefined;

  return response;
}

export { http };

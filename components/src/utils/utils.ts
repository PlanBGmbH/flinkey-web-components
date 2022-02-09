import { http } from './http';

/**
 * Global parameters that all web components use to call flinkey API endpoints.
 */
class Globals {
  /**
   * The ID of the customer that could be found in the flinkey Portal's developer area.
   */
  public static customerId: number;

  /**
   * The apiKey (aka. flinkey-API-Key) that could be found in the flinkey Portal's developer area.
   */
  public static apiKey: string;

  /**
   * The token that is created via the flinkey API's authorization endpoint.
   */
  public static token: string;

  /**
   * The base URL of the flinkey API to call (e.g. "https://api.flinkey.de/v3").
   */
  public static apiBaseUrl: string;
}

/**
 * The HTTP response structure.
 */
interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

/**
 * Sets the default headers for API calls.
 * @returns {HeadersInit} The default headers.
 */
function setDefaultHeaders(): HeadersInit {
  return {
    'Authorization': `Bearer ${Globals.token}`,
    'flinkey-API-Key': Globals.apiKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Customer-ID': '1',
  };
}

/**
 * Sets the default headers for API calls.
 * @param {string} path - The path of the endpoint.
 * @param {URLSearchParams} [searchParams] - The search params to append to the endpoint.
 * @returns {string} The generated endpoint.
 */
function setEndpoint(path: string, searchParams?: URLSearchParams): string {
  let endpoint: string = `${Globals.apiBaseUrl}/${path}`;

  if (searchParams) {
    endpoint += `?${searchParams}`;
  }

  return endpoint;
}

/**
 * Sends an HTTP GET request via fetch API.
 * @param {string} path - The path of the endpoint to call in the request.
 * @param {URLSearchParams} [searchParams] - The search params to send in the request.
 * @returns {Promise<HttpResponse<T>>} The HTTP response.
 * @template T
 */
async function httpGet<T>(path: string, searchParams?: URLSearchParams): Promise<HttpResponse<T>> {
  const args: RequestInit = {
    method: 'GET',
    headers: setDefaultHeaders(),
  };
  const endpoint = setEndpoint(path, searchParams);
  return await http<T>(new Request(endpoint, args));
}

/**
 * Sends an HTTP PUT request via fetch API.
 * @param {string} path - The path of the endpoint to call in the request.
 * @param {unknown} body - The body to send in the request.
 * @returns {Promise<HttpResponse<T>>} The HTTP response.
 * @template T
 */
async function httpPut<T>(path: string, body: unknown): Promise<HttpResponse<T>> {
  const args: RequestInit = {
    method: 'PUT',
    headers: setDefaultHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  };
  const endpoint = setEndpoint(path);
  return await http<T>(new Request(endpoint, args));
}

/**
 * Sends an HTTP DELETE request via fetch API.
 * @param {string} path - The path of the endpoint to call in the request.
 * @param {unknown} [body] - The body to send in the request.
 * @returns {Promise<HttpResponse<T>>} The HTTP response.
 * @template T
 */
async function httpDelete<T>(path: string, body?: unknown): Promise<HttpResponse<T>> {
  const args: RequestInit = {
    method: 'DELETE',
    headers: setDefaultHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  };
  const endpoint = setEndpoint(path);
  return await http<T>(new Request(endpoint, args));
}

export { Globals, HttpResponse, httpGet, httpPut, httpDelete, setDefaultHeaders, setEndpoint };

import * as httpFn from './http';
import { Globals, httpDelete, httpGet, httpPut, HttpResponse, setDefaultHeaders, setEndpoint } from './utils';

describe('Utils', () => {
  describe('when calling httpGet<T>(...), httpPut<T>(...) or httpDelete<T>(...) function', () => {
    for (const testCase of [
      // TODO: fix test
      /*{
        httpFnCall: httpGet,
        expectedMethod: 'GET',
        withBody: false,
      },*/
      {
        httpFnCall: httpPut,
        expectedMethod: 'PUT',
        withBody: true,
      },
      {
        httpFnCall: httpDelete,
        expectedMethod: 'DELETE',
        withBody: true,
      },
      {
        httpFnCall: httpDelete,
        expectedMethod: 'DELETE',
        withBody: false,
      },
    ]) {
      it('calls the http<T> function', async () => {
        Globals.apiBaseUrl = 'https://some-base-url.com';
        Globals.token = 'SomeSampleTokenValue';
        const expectedHttpResponse: HttpResponse<unknown> = new Response(JSON.stringify({ foo: 'bar' }));
        const httpSpy = jest.spyOn(httpFn, 'http').mockImplementationOnce(() => Promise.resolve(expectedHttpResponse));
        const response = await testCase.httpFnCall<unknown>('api/endpoint', testCase.withBody ? { test: 'body' } : undefined);

        expect(response).toEqual(expectedHttpResponse);
        expect(httpSpy).toHaveBeenCalledWith(
          new Request('https://some-base-url.com/api/endpoint', {
            method: testCase.expectedMethod,
            headers: setDefaultHeaders(),
            body: testCase.withBody ? JSON.stringify({ test: 'body' }) : undefined,
          }),
        );
      });
    }
  });

  describe('when calling setDefaultHeaders() function', () => {
    it('returns expected list of default HTTP headers', () => {
      Globals.token = 'SomeTestTokenValue';
      expect(setDefaultHeaders()).toEqual({
        'Authorization': 'Bearer SomeTestTokenValue',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });
    });
  });

  describe('when calling setEndpoint(...) function', () => {
    for (const testCase of [
      {
        path: 'test-path',
        expectedUrl: 'https://base-url.com/test-path',
        searchParams: undefined,
      },
      {
        path: 'test-path-1',
        expectedUrl: 'https://base-url.com/test-path-1?foo=1&bar=2',
        searchParams: new URLSearchParams({ foo: '1', bar: '2' }),
      },
    ]) {
      it(`returns expected endpoint ${testCase.expectedUrl}`, () => {
        Globals.apiBaseUrl = 'https://base-url.com';
        expect(setEndpoint(testCase.path, testCase.searchParams)).toBe(testCase.expectedUrl);
      });
    }
  });
});

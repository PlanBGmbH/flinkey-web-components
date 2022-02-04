import { HttpResponse } from './utils';
import { http } from './http';

describe('http<T>(...) function', () => {
  it('returns the expected response', async () => {
    const expectedHttpResponse: HttpResponse<unknown> = new Response(JSON.stringify({ foo: 'bar' }), { status: 200 });
    const fetchMock = (global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve(expectedHttpResponse)));

    const response = await http<unknown>(new Request('', {}));

    expect(response).toEqual(expectedHttpResponse);
    expect(fetchMock).toHaveBeenCalledWith(new Request('', {}));
  });
});

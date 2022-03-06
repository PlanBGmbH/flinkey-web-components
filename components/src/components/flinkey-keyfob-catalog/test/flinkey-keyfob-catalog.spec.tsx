import { FlinkeyKeyfobCatalog } from '../flinkey-keyfob-catalog';
import * as utils from '../../../utils/utils';
import { HttpResponse } from '../../../utils/utils';
import { Key } from '../flinkey-keyfob-catalog.interfaces';

describe('when calling componentWillLoad() function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call httpGet<T>(...) function with expected parameters', async () => {
    const keyfobCatalog = new FlinkeyKeyfobCatalog();
    const httpGetSpy = jest.spyOn(utils, 'httpGet').mockImplementationOnce(() => {
      const resp: HttpResponse<string[]> = new Response();
      resp.parsedBody = ['SomeBrand'];
      return Promise.resolve(resp);
    });

    await keyfobCatalog.componentWillLoad();

    expect(httpGetSpy).toHaveBeenCalledTimes(1);
    expect(httpGetSpy).toHaveBeenCalledWith('brands');
    expect(keyfobCatalog.brands).toEqual(['SomeBrand']);
  });
});

describe('when calling onBrandChanged(...)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call httpGet<T>(...) function with expected parameters', async () => {
    const keyfobCatalog = new FlinkeyKeyfobCatalog();
    const httpGetSpy = jest.spyOn(utils, 'httpGet').mockImplementationOnce(() => {
      const resp: HttpResponse<Key[]> = new Response();
      resp.parsedBody = [
        {
          id: 1,
          boxName: 'SomeBoxName',
          keyForm: {
            imageUrl: 'https://some-image-url.com',
          },
        },
      ];
      return Promise.resolve(resp);
    });
    const event: CustomEvent<string> = { detail: 'the-brand' } as CustomEvent<string>;

    await keyfobCatalog.brandChangedHandler(event);

    expect(httpGetSpy).toHaveBeenCalledTimes(1);
    expect(httpGetSpy).toHaveBeenCalledWith(
      'brands/the-brand/keys',
      new URLSearchParams([
        ['$select', 'boxName'],
        ['$expand', 'keyForm($select=imageUrl)'],
      ]),
    );
    expect(keyfobCatalog.keys).toEqual([
      {
        id: 1,
        boxName: 'SomeBoxName',
        keyForm: {
          imageUrl: 'https://some-image-url.com',
        },
      },
    ]);
  });
});

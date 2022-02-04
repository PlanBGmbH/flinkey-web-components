import { Component, Host, h, State } from '@stencil/core';
import { Globals, httpGet, HttpResponse } from '../../utils/utils';
import { Key } from './flinkey-keyfob-catalog.interfaces';

@Component({
  tag: 'flinkey-keyfob-catalog',
  styleUrl: '../../utils/common.css',
  shadow: true,
})
export class FlinkeyKeyfobCatalog {
  @State() brands: string[];
  @State() keys: Key[];

  componentWillLoad() {
    return httpGet<string[]>('brands')
      .then((httpResponse: HttpResponse<string[]>) => {
        this.brands = httpResponse.parsedBody!;
      })
      .catch(() => {
        //TODO
      });
  }

  onBrandChanged(event: Event) {
    const brand = (event.target as HTMLSelectElement).value;
    const path = `brands/${brand}/keys`;
    const searchParams = new URLSearchParams([
      ['$select', 'id, boxName'],
      ['$expand', 'keyForm($select=imageUrl)'],
    ]);
    return httpGet<Key[]>(path, searchParams)
      .then((httpResponse: HttpResponse<Key[]>) => {
        console.log(httpResponse.parsedBody);
        this.keys = httpResponse.parsedBody!;
      })
      .catch(() => {
        //TODO
      });
  }

  render() {
    return (
      <Host>
        <select name="brands" onChange={e => this.onBrandChanged(e)}>
          {this.brands?.map(brand => (
            <option value={brand}>{brand}</option>
          ))}
        </select>
        <ul>
          {this.keys?.map(key => (
            <div>
              {key.boxName}
              <img src={key.keyForm.imageUrl} alt={key.boxName} />
            </div>
          ))}
        </ul>
      </Host>
    );
  }
}

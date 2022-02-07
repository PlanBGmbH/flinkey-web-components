import { Component, Host, h, State } from '@stencil/core';
import { httpGet, HttpResponse } from '../../utils/utils';
import { Key } from './flinkey-keyfob-catalog.interfaces';

@Component({
  tag: 'flinkey-keyfob-catalog',
  styleUrl: '../../utils/common.css',
  shadow: true,
})
export class FlinkeyKeyfobCatalog {
  @State() brands: string[];
  @State() keys: Key[];
  @State() dropdownOpen: boolean;

  componentWillLoad() {
    return httpGet<string[]>('brands')
      .then((httpResponse: HttpResponse<string[]>) => {
        this.brands = httpResponse.parsedBody;
      })
      .catch(() => {
        // TODO
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
        this.keys = httpResponse.parsedBody;
      })
      .catch(() => {
        // TODO
      });
  }

  render() {
    return (
      <Host>
        <div class="mb-4">
          <select
            onChange={e => this.onBrandChanged(e)}
            class="font-sans mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option selected disabled hidden>
              Choose brand
            </option>
            {this.brands?.map(brand => (
              <option value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div class="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {this.keys?.map(key => (
            <div class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
              <div class="flex-1 flex flex-col p-8">
                <img class="w-44 h-auto flex-shrink-0 mx-auto" src={key.keyForm.imageUrl} alt="" />
                <h3 class="mt-6 text-gray-900 text-sm font-medium font-sans">{key.boxName}</h3>
              </div>
            </div>
          ))}
        </div>
      </Host>
    );
  }
}

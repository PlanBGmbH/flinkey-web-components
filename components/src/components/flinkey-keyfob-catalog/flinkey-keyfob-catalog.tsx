import { Component, Host, h, State, Listen } from '@stencil/core';
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

  dropdownPlaceholderLabel: string = 'Choose brand';

  componentWillLoad() {
    return httpGet<string[]>('brands')
      .then((httpResponse: HttpResponse<string[]>) => {
        this.brands = httpResponse.parsedBody;
      })
      .catch(() => {
        // TODO
      });
  }

  @Listen('selectedItemChanged')
  brandChangedHandler(event: CustomEvent<string>) {
    const selectedBrand = event.detail;
    const path = `brands/${selectedBrand}/keys`;
    const searchParams = new URLSearchParams([
      ['$select', 'boxName'],
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
        <flinkey-dropdown placeholderItemLabel={this.dropdownPlaceholderLabel} data={this.brands} />
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

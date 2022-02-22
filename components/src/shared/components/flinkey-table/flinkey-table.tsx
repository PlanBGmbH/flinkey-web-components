import { Component, h, Host, Prop } from '@stencil/core';
import { Column } from '../../interfaces';

@Component({
  tag: 'flinkey-table',
  styleUrl: '../../../utils/common.css',
  shadow: true,
})
export class Table {
  @Prop() columns: Column[];
  @Prop() data: any[];

  getFieldValue(field: string, entry: any) {
    const path = field?.split('.') ?? [];
    let fieldValue: any;

    for (const pathItem of path) {
      if (!fieldValue) {
        fieldValue = entry[pathItem];
      } else {
        fieldValue = fieldValue[pathItem];
      }

      if (!fieldValue) {
        fieldValue = '-';
        break;
      }
    }

    return fieldValue;
  }

  render() {
    return (
      <Host class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    {this.columns?.map(
                      column =>
                        column.isVisible && (
                          <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div>{column.label}</div>
                          </th>
                        ),
                    )}
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {this.data?.map(entry => {
                    return (
                      <tr class="text-center">
                        {this.columns.map(
                          column => column.isVisible && <td class="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">{this.getFieldValue(column.field, entry)}</td>,
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

import { Component, h, Prop } from '@stencil/core';
import { Column } from '../../interfaces';

@Component({
  tag: 'flinkey-table',
  styleUrl: '../../../utils/common.css',
  shadow: true,
})
export class FlinkeyTable {
  @Prop() columns: Column[];
  @Prop() data: any[];

  getFieldValue(column: Column, entry: any) {
    let fieldValue: any;

    if (column.cell) {
      fieldValue = column.cell(entry);
    } else {
      const path = column.field?.split('.') ?? [];

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
    }

    return fieldValue;
  }

  getVisibility(visibility: (() => boolean) | boolean) {
    let result: boolean;

    if (visibility instanceof Function) {
      result = visibility();
    } else {
      result = visibility;
    }

    return result;
  }

  render() {
    return (
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200 font-sans">
          <thead class="bg-gray-50">
            <tr>
              {this.columns?.map(
                column =>
                  this.getVisibility(column.isVisible) && (
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
                  {this.columns?.map(
                    column =>
                      this.getVisibility(column.isVisible) && <td class="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">{this.getFieldValue(column, entry)}</td>,
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

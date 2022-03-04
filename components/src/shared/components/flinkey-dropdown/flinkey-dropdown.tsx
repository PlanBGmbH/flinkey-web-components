import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'flinkey-dropdown',
  styleUrl: '../../../utils/common.css',
  shadow: true,
})
export class FlinkeyDropdown {
  @Prop() label: string;
  @Prop() placeholderItemLabel: string;
  @Prop() data: any[];
  @Prop() textField: string;
  @Prop() valueField: string;

  getEntryValue(dataItem: any): string | number {
    return this.getValue(dataItem, this.valueField);
  }

  getEntryText(dataItem: any): string | number {
    return this.getValue(dataItem, this.textField);
  }

  getValue(dataItem: any, field: string): string | number {
    let value: string | number;

    if (typeof dataItem === 'object') {
      value = dataItem[field];
    } else if (typeof dataItem === 'boolean') {
      value = (dataItem as boolean).toString();
    } else {
      value = dataItem;
    }

    return value;
  }

  @Event() selectedItemChanged: EventEmitter<string>;
  selectedItemChangedHandler(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedItemChanged.emit(selectedValue);
  }

  render() {
    return (
      <div class="mb-4 font-sans">
        {this.label && <label class="block text-sm font-medium text-gray-700">{this.label}</label>}
        <select
          onChange={e => this.selectedItemChangedHandler(e)}
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {this.placeholderItemLabel && (
            <option selected disabled hidden>
              {this.placeholderItemLabel}
            </option>
          )}
          {this.data?.map(dataItem => (
            <option value={this.getEntryValue(dataItem)}>{this.getEntryText(dataItem)}</option>
          ))}
        </select>
      </div>
    );
  }
}

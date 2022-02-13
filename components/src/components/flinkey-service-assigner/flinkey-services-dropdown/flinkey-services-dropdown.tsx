import { Component, h, State, Prop, EventEmitter, Event } from '@stencil/core';
import { httpGet, HttpResponse } from '../../../utils/utils';
import { Service } from '../flinkey-service-assigner.interfaces';

@Component({
  tag: 'flinkey-services-dropdown',
  styleUrl: '../../../utils/common.css',
  shadow: true,
})
export class ServiceDropdown {
  @Prop() linkedServices: any;

  @State() unlinkedServices: any = [];

  // Dropdown state managment
  @State() dropdownIsOpen: boolean = false;
  @State() dropDownValue: boolean = false;

  @State() selectedService: number = 0;

  // Pass selected service to Modal
  @Event() valueChanged: EventEmitter<any>;
  onServiceSelectedHandler(item: { id: number }) {
    this.valueChanged.emit(item.id);
    this.selectedService = item.id;
    this.dropDownValue = true;
    this.dropdownIsOpen = false;
  }

  fetchUnactiveServices() {
    const searchParams = new URLSearchParams(`$filter=id in (${this.linkedServices}) eq false`);
    return httpGet<Service[]>('services', searchParams)
      .then((httpResponse: HttpResponse<Service[]>) => {
        this.unlinkedServices = httpResponse.parsedBody;
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillLoad() {
    this.fetchUnactiveServices();
  }

  render() {
    return (
      <div class="relative inline-block text-left">
        <div>
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 z-10"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => (this.dropdownIsOpen = !this.dropdownIsOpen)}
          >
            {!this.dropDownValue ? 'Link service' : this.selectedService}
            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          class="w-full origin-top-right mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          {this.dropdownIsOpen && (
            <div class={`py-1 ${this.unlinkedServices.length !== 0 && 'overflow-y-scroll h-24'}`} role="none">
              {this.unlinkedServices.length !== 0 ? (
                this.unlinkedServices.map((items: { id: any }) => {
                  return (
                    <a
                      class="w-full text-black-700 block px-4 py-2 text-sm hover:bg-emerald-200"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                      onClick={() => this.onServiceSelectedHandler(items)}
                    >
                      {items.id}
                    </a>
                  );
                })
              ) : (
                <p class="text-xs text-center">0 unactive services</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

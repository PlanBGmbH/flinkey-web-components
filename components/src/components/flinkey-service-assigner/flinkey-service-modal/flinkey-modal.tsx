import { Component, Event, EventEmitter, h, Prop, Listen, State } from '@stencil/core';
import { httpDelete, httpPut, HttpResponse } from '../../../utils/utils';

@Component({
  tag: 'flinkey-modal',
  styleUrl: '../../../utils/common.css',
  shadow: true,
})
export class FlinkeyModal {
  // Customization of modal
  @Prop() modalTitle: string = '';
  @Prop() body: string = '';

  // Inherited props
  @Prop() product: number;
  @Prop() service: number = 0;
  @Prop() linkedServices: any;

  // Selected Service from Dropdown
  @State() dropdownService: any;

  @Event() closeModal: EventEmitter<boolean>;
  onCloseHandler() {
    this.closeModal.emit(false);
  }

  @Event() updateData: EventEmitter<any>;
  onPairingHandler() {
    this.updateData.emit(true);
  }

  // OnDropdown
  @Listen('valueChanged')
  valueChanged(value: any) {
    this.dropdownService = value.detail;
  }

  onLinkHandler(serviceId: number, productId: number) {
    const body = { serviceId: `${serviceId}`, productId: `${productId}` };
    httpPut<string>('pairings', body)
      .then((httpResponse: HttpResponse<string>) => {
        if (httpResponse.parsedBody === undefined) {
          console.log('Service Successfully Linked');
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.onCloseHandler();
    this.onPairingHandler();
  }

  onUnlinkHandler(serviceId: number, productId: number) {
    const body = { serviceId: `${serviceId}`, productId: `${productId}` };
    httpDelete<string>('pairings', body)
      .then((httpResponse: HttpResponse<string>) => {
        if (httpResponse.parsedBody === undefined) {
          console.log('Service Successfully Unlinked');
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.onCloseHandler();
    this.onPairingHandler();
  }

  render() {
    return (
      <div class="fixed inset-0 font-sans" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:items-center md:items-center sm:p-0 items-end">
          <div class="fixed inset-0 bg-slate-50 opacity-50" aria-hidden="true"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {this.modalTitle}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">{this.body}</p>
                </div>
              </div>
            </div>

            <div class="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex justify-between">
              <div class="flex items-start">
                <button class="mr-3 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm">
                  {this.product}
                </button>
                {this.service === 0 ? (
                  <flinkey-services-dropdown linkedServices={this.linkedServices} />
                ) : (
                  <button class="mr-3 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm">
                    {this.service}
                  </button>
                )}
              </div>
              <div>
                {this.service === 0 ? (
                  <button
                    type="button"
                    class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-300 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                    onClick={() => this.onLinkHandler(this.dropdownService, this.product)}
                  >
                    Link
                  </button>
                ) : (
                  <button
                    type="button"
                    class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-300 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                    onClick={() => this.onUnlinkHandler(this.service, this.product)}
                  >
                    Unlink
                  </button>
                )}
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => this.onCloseHandler()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import { Component, h, State, Watch, Listen, Host } from '@stencil/core';
import { httpGet, HttpResponse } from '../../utils/utils';

@Component({
  tag: 'flinkey-product-service-admin-table',
  styleUrl: '../../utils/common.css',
  shadow: true,
})
export class ProductServiceAdminTable {
  @State() services: Array<any>;
  @State() products: Array<any>;
  @State() productsAndServices = [];
  @State() activeServices = [];

  // Column state managment
  @State() idIsOpen: boolean = true;
  @State() uniqueIdIsOpen: boolean = true;
  @State() sNumberIsOpen: boolean = true;
  @State() sapIsOpen: boolean = true;
  @State() actServicesIsOpen: boolean = true;
  fetchProducts = async () => {
    return httpGet<string[]>('products')
      .then((httpResponse: HttpResponse<string[]>) => {
        this.products = httpResponse.parsedBody;
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchServices = async () => {
    return httpGet<string[]>('services')
      .then((httpResponse: HttpResponse<string[]>) => {
        this.services = httpResponse.parsedBody;
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchProductToService = async (productId: any) => {
    const path = `products/${productId.id}/services`;
    return httpGet<any>(path)
      .then((httpResponse: HttpResponse<any>) => {
        const service = httpResponse.parsedBody;
        this.productsAndServices = [...this.productsAndServices, { service, product: productId }];
        this.activeServices = [...this.activeServices, { id: service.id }];
      })
      .catch(() => {
        this.productsAndServices = [...this.productsAndServices, { product: productId }];
        if (this.activeServices.length === 0) {
          this.activeServices = [];
        }
      });
  };

  componentWillLoad() {
    console.log('Will -> fetch');
    this.fetchProducts();
    this.fetchServices();
  }

  @Watch('products')
  watchStateHandler() {
    if (this.products) {
      console.log('Will -> fetchP2S');
      this.products.forEach(element => {
        this.fetchProductToService(element);
      });
    }
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
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex flex-row items-center justify-center">
                        {this.idIsOpen && <div>ID</div>}
                        <button onClick={() => (this.idIsOpen = !this.idIsOpen)}>
                          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex flex-row items-center justify-center">
                        {this.uniqueIdIsOpen && <div>Unique ID</div>}
                        <button onClick={() => (this.uniqueIdIsOpen = !this.uniqueIdIsOpen)}>
                          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex flex-row items-center justify-center">
                        {this.sNumberIsOpen && <div> Serial Number</div>}
                        <button onClick={() => (this.sNumberIsOpen = !this.sNumberIsOpen)}>
                          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex flex-row items-center justify-center">
                        {this.sapIsOpen && <div>Sap Number</div>}
                        <button onClick={() => (this.sapIsOpen = !this.sapIsOpen)}>
                          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex flex-row items-center justify-center">
                        {this.actServicesIsOpen && <div>Active Services</div>}
                        <button onClick={() => (this.actServicesIsOpen = !this.actServicesIsOpen)}>
                          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Functionen
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {this.productsAndServices &&
                    this.productsAndServices.map(product => {
                      return (
                        <tr class="text-center">
                          <td class="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">{this.idIsOpen && `${product.product.id}`}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{this.uniqueIdIsOpen && `${product.product.uniqueId}`}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{this.sNumberIsOpen && `${product.product.serialNumber}`}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {this.sapIsOpen && `${product.product.sapNumber}`}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {this.actServicesIsOpen && product.service !== undefined ? product.service.id : this.actServicesIsOpen && '-'}
                          </td>

                          <td>
                            {product.service !== undefined ? (
                              <button
                                type="button"
                                class="px-6 py-4 mt-px whitespace-nowrap text-right text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                Uninstall
                              </button>
                            ) : (
                              <button
                                type="button"
                                class="px-6 py-4 mt-px whitespace-nowrap text-right text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                Link
                              </button>
                            )}
                          </td>
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

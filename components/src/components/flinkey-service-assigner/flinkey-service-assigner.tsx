import { Component, h, State, Watch, Listen, Host } from '@stencil/core';
import Service from './flinkey-service-assigner.interfaces';
import { httpGet, HttpResponse } from '../../utils/utils';

@Component({
  tag: 'flinkey-product-service-admin-table',
  styleUrl: '../../utils/common.css',
  shadow: true,
})
export class ProductServiceAdminTable {
  @State() products: Array<any>;
  @State() productsAndServices = [];
  @State() activeServices = [];

  // Column state managment
  @State() idIsVisible: boolean = true;
  @State() uniqueIdIsVisible: boolean = true;
  @State() sNumberIsVisible: boolean = true;
  @State() sapIsVisible: boolean = true;
  @State() actServicesIsVisible: boolean = true;

  // Modal
  @State() linkingIsVisible: boolean = false;
  @State() unlinkingIsVisible: boolean = false;
  @State() selectedProduct: any;
  @State() selectedService: number;

  fetchProducts() {
    return httpGet<string[]>('products')
      .then((httpResponse: HttpResponse<string[]>) => {
        this.products = httpResponse.parsedBody;
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchActiveServices(product) {
    const path = `products/${product.id}/services`;
    httpGet<Service>(path)
      .then((httpResponse: HttpResponse<Service>) => {
        this.activeServices = [...this.activeServices, httpResponse.parsedBody.id];
        this.productsAndServices = [...this.productsAndServices, { product: product, service: httpResponse.parsedBody.id }];
      })
      .catch(() => {
        this.productsAndServices = [...this.productsAndServices, { product: product }];
        // TODO
      });
  }

  componentWillLoad() {
    console.log('Will -> fetch');
    this.fetchProducts();
  }

  @Watch('products')
  watchStateHandler() {
    if (this.products) {
      console.log('Will -> fetchP2S');
      this.products.forEach(element => {
        this.fetchActiveServices(element);
      });
    }
  }

  // Modal - Close
  @Listen('closeModal')
  closeModal(value: any) {
    this.linkingIsVisible = value.detail;
    this.unlinkingIsVisible = value.detail;
  }

  // Overwritte all previous data
  updateDOM() {
    this.products = [];
    this.productsAndServices = [];
    this.activeServices = [];
    this.fetchProducts();
  }

  // Modal - onPairing
  @Listen('updateData')
  updateDataHandler(value: any) {
    if (value) {
      this.updateDOM();
    } else {
      return;
    }
  }

  linkingModalHandler(productId: any) {
    this.linkingIsVisible = true;
    this.selectedProduct = productId;
  }

  unlinkingModalHandler(productId: any, serviceId: any) {
    this.unlinkingIsVisible = true;
    this.selectedProduct = productId;
    this.selectedService = serviceId;
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
                        {this.idIsVisible && <div>ID</div>}
                        <button onClick={() => (this.idIsVisible = !this.idIsVisible)}>
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
                        {this.uniqueIdIsVisible && <div>Unique ID</div>}
                        <button onClick={() => (this.uniqueIdIsVisible = !this.uniqueIdIsVisible)}>
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
                        {this.sNumberIsVisible && <div> Serial Number</div>}
                        <button onClick={() => (this.sNumberIsVisible = !this.sNumberIsVisible)}>
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
                        {this.sapIsVisible && <div>Sap Number</div>}
                        <button onClick={() => (this.sapIsVisible = !this.sapIsVisible)}>
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
                        {this.actServicesIsVisible && <div>Active Services</div>}
                        <button onClick={() => (this.actServicesIsVisible = !this.actServicesIsVisible)}>
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
                          <td class="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">{this.idIsVisible && `${product.product.id}`}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{this.uniqueIdIsVisible && `${product.product.uniqueId}`}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{this.sNumberIsVisible && `${product.product.serialNumber}`}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {this.sapIsVisible && `${product.product.sapNumber}`}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {this.actServicesIsVisible && product.service !== undefined ? product.service : this.actServicesIsVisible && '-'}
                          </td>

                          <td>
                            {product.service !== undefined ? (
                              <button
                                type="button"
                                onClick={() => this.unlinkingModalHandler(product.product.id, product.service)}
                                class="px-6 py-4 mt-px whitespace-nowrap text-right text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                Uninstall
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => this.linkingModalHandler(product.product.id)}
                                class="px-6 py-4 mt-px whitespace-nowrap text-right text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                Link
                              </button>
                            )}
                            {this.linkingIsVisible && (
                              <flinkey-modal
                                modalTitle="Link a new Service to Product"
                                body="Here, you can link your a Service to a product. Go ahead a choose a service to link."
                                product={this.selectedProduct}
                                linkedServices={this.activeServices}
                              />
                            )}
                            {this.unlinkingIsVisible && (
                              <flinkey-modal
                                modalTitle="Unlink Service from Product"
                                body="Here, you can unlink your Service from a product. Go ahead a choose a service to link."
                                product={this.selectedProduct}
                                service={this.selectedService}
                              />
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

import { Component, h, State, Watch, Listen, Host, Prop } from '@stencil/core';
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

  @Prop() idIsVisible: boolean = true;
  @Prop() uniqueIdIsVisible: boolean = true;
  @Prop() sNumberIsVisible: boolean = true;
  @Prop() sapIsVisible: boolean = true;
  @Prop() actServicesIsVisible: boolean = true;

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
                    {this.idIsVisible && (
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div>ID</div>
                      </th>
                    )}

                    {this.uniqueIdIsVisible && (
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div>Unique ID</div>
                      </th>
                    )}

                    {this.sNumberIsVisible && (
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div> Serial Number</div>
                      </th>
                    )}
                    {this.sapIsVisible && (
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div>Sap Number</div>
                      </th>
                    )}
                    {this.actServicesIsVisible && (
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div>Active Services</div>
                      </th>
                    )}
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
                          {this.idIsVisible && <td class="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">{product.product.id}</td>}
                          {this.uniqueIdIsVisible && <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product.uniqueId}</td>}
                          {this.sNumberIsVisible && <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product.serialNumber}</td>}
                          {this.sapIsVisible && <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product.sapNumber}</td>}
                          {this.actServicesIsVisible && (
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {product.service !== undefined ? product.service : this.actServicesIsVisible && '-'}
                            </td>
                          )}

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

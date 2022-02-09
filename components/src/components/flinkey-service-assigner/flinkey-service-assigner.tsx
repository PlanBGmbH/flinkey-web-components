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
                        <div>ID</div>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex flex-row items-center justify-center">
                        <div>Unique ID</div>
                      </div>
                    </th>

                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex flex-row items-center justify-center">
                        <div>Serial Number</div>
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex flex-row items-center justify-center">
                        <div>Sap Number</div>
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex flex-row items-center justify-center">
                        <div>Active Services</div>
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

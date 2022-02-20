import { Component, h, State, Listen, Host, Prop } from '@stencil/core';
import { Column, Product, Service } from './flinkey-service-assigner.interfaces';
import { httpGet, HttpResponse } from '../../utils/utils';

@Component({
  tag: 'flinkey-product-service-admin-table',
  styleUrl: '../../utils/common.css',
  shadow: true,
})
export class ProductServiceAdminTable {
  @Prop() isIdVisible: boolean = true;
  @Prop() isUniqueIdVisible: boolean = true;
  @Prop() isSerialNumberVisible: boolean = true;
  @Prop() isSapNumberVisible: boolean = true;

  @State() products: Product[] = [];
  @State() columns: Column[] = [
    { name: 'id', label: 'ID', isVisible: () => this.isIdVisible },
    { name: 'uniqueId', label: 'Unique ID', isVisible: () => this.isUniqueIdVisible },
    { name: 'serialNumber', label: 'Serial Number', isVisible: () => this.isSerialNumberVisible },
    { name: 'sapNumber', label: 'SAP Number', isVisible: () => this.isSapNumberVisible },
  ];

  // Modal
  @State() linkingIsVisible: boolean = false;
  @State() unlinkingIsVisible: boolean = false;
  @State() selectedProductId: number;
  @State() selectedServiceId: number;

  componentWillLoad() {
    return this.fetchProducts();
  }

  buildProductSelectFilter() {
    const visibleColumns: string[] = this.columns.filter((column: Column) => column.isVisible).map((column: Column) => column.name);
    const selectFilter = visibleColumns.join(', ');
    return selectFilter;
  }

  fetchProducts() {
    const searchParams = new URLSearchParams([['$select', this.buildProductSelectFilter()]]);
    return httpGet<Product[]>('products', searchParams)
      .then((httpResponse: HttpResponse<Product[]>) => {
        for (const product of httpResponse.parsedBody) {
          this.products.push(product);
        }
      })
      .then(() => {
        const fetchServiceCalls: Promise<void>[] = [];
        for (const product of this.products) {
          fetchServiceCalls.push(this.fetchActiveService(product));
        }
        return Promise.all(fetchServiceCalls);
      })
      .catch(() => {
        // TODO
      });
  }

  fetchActiveService(product: Product) {
    const path = `products/${product.id}/services`;
    const searchParams = new URLSearchParams([['$select', 'id']]);
    return httpGet<Service>(path, searchParams)
      .then((httpResponse: HttpResponse<Service>) => {
        this.products = [...this.products, { ...product, service: httpResponse.parsedBody }];
      })
      .catch(() => {
        // TODO
      });
  }

  // Modal - Close
  @Listen('closeModal')
  closeModal(value: any) {
    this.linkingIsVisible = value.detail;
    this.unlinkingIsVisible = value.detail;
  }

  // Modal - onPairing
  @Listen('updateData')
  updateDataHandler(value: any) {
    if (value) {
      return this.fetchProducts();
    } else {
      return;
    }
  }

  linkingModalHandler(productId: number) {
    this.linkingIsVisible = true;
    this.selectedProductId = productId;
  }

  unlinkingModalHandler(productId: number, serviceId: number) {
    this.unlinkingIsVisible = true;
    this.selectedProductId = productId;
    this.selectedServiceId = serviceId;
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
                    {this.columns.map(
                      column =>
                        column.isVisible && (
                          <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div>{column.label}</div>
                          </th>
                        ),
                    )}
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div>Active Service</div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {this.products?.map(product => {
                    return (
                      <tr class="text-center">
                        {this.columns.map(column => column.isVisible && <td class="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">{product[column.name]}</td>)}
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.service?.id ?? '-'}</td>
                        <td>
                          {product.service ? (
                            <button
                              type="button"
                              onClick={() => this.unlinkingModalHandler(product.id, product.service.id)}
                              class="px-6 py-4 mt-px whitespace-nowrap text-right text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              Uninstall
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => this.linkingModalHandler(product.id)}
                              class="px-6 py-4 mt-px whitespace-nowrap text-right text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              Link
                            </button>
                          )}
                          {this.linkingIsVisible && (
                            <flinkey-modal
                              modalTitle="Link a new Service to Product"
                              body="Here, you can link a Service to a Product. Go ahead and choose a Service to link."
                              product={this.selectedProductId}
                              linkedServices={this.activeServices}
                            />
                          )}
                          {this.unlinkingIsVisible && (
                            <flinkey-modal
                              modalTitle="Unlink Service from Product"
                              body="Unlink a Service from a Product by pressing Unlink."
                              product={this.selectedProductId}
                              service={this.selectedServiceId}
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

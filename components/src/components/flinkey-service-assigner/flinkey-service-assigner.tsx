import { Component, h, State, Listen, Host, Prop } from '@stencil/core';
import { Product, Service } from './flinkey-service-assigner.interfaces';
import { httpGet, HttpResponse } from '../../utils/utils';
import {Column} from "../../shared/interfaces";

@Component({
  tag: 'flinkey-product-service-table',
  styleUrl: '../../utils/common.css',
  shadow: true,
})
export class ProductServiceTable {
  @Prop() isIdVisible: boolean = true;
  @Prop() isUniqueIdVisible: boolean = true;
  @Prop() isSerialNumberVisible: boolean = true;
  @Prop() isSapNumberVisible: boolean = true;

  @State() products: Product[] = [];
  @State() columns: Column[] = [
    { field: 'id', label: 'ID', isVisible: () => this.isIdVisible },
    { field: 'uniqueId', label: 'Unique ID', isVisible: () => this.isUniqueIdVisible },
    { field: 'serialNumber', label: 'Serial Number', isVisible: () => this.isSerialNumberVisible },
    { field: 'sapNumber', label: 'SAP Number', isVisible: () => this.isSapNumberVisible },
    { field: 'service.id', label: 'Service ID', isVisible: () => this.isSapNumberVisible },
    { label: 'Action', isVisible: () => this.isSapNumberVisible },
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
    const visibleColumns: string[] = this.columns.filter((column: Column) => column.isVisible).map((column: Column) => column.field);
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
      <Host>
        <flinkey-table columns={this.columns} data={this.products}></flinkey-table>
        {/*<td>
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
                        </td>*/}
      </Host>
    );
  }
}

import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'flinkey-keyfob-catalog',
  shadow: true,
})
export class FlinkeyKeyfobCatalog {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

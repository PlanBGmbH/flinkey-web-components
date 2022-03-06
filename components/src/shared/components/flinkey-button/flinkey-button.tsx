import { Component, EventEmitter, h, Prop, Event } from '@stencil/core';
import { ButtonSize, ButtonType } from '../../enums';

@Component({
  tag: 'flinkey-button',
  styleUrl: '../../../utils/common.css',
  shadow: true,
})
export class FlinkeyButton {
  @Prop() text: string;
  @Prop() type: ButtonType;
  @Prop() size: ButtonSize;

  @Event() buttonClicked: EventEmitter<unknown>;
  onButtonClickedHandler() {
    this.buttonClicked.emit();
  }

  getButtonClasses() {
    let classes = 'font-sans inline-flex items-center border font-medium focus:outline-none';

    switch (this.size) {
      case ButtonSize.XS:
        classes += ' rounded px-2.5 py-1.5 text-xs';
        break;
      case ButtonSize.S:
        classes += ' rounded-md px-3 py-2 text-sm leading-4';
        break;
      case ButtonSize.M:
        classes += ' rounded-md px-4 py-2 text-sm';
        break;
      case ButtonSize.L:
        classes += ' rounded-md px-4 py-2 text-base';
        break;
      case ButtonSize.XL:
        classes += ' rounded-md px-6 py-3 text-base';
        break;
    }

    switch (this.type) {
      case ButtonType.Primary:
        classes += ' shadow-sm border-transparent text-white bg-indigo-600 hover:bg-indigo-700';
        break;
      case ButtonType.Secondary:
        classes += ' border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200';
        break;
      case ButtonType.White:
        classes += ' border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50';
        break;
    }

    return classes;
  }

  render() {
    return (
      <button type="button" class={this.getButtonClasses()} onClick={() => this.onButtonClickedHandler()}>
        {this.text}
      </button>
    );
  }
}

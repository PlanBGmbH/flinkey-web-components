import { newSpecPage } from '@stencil/core/testing';
import { FlinkeyKeyfobCatalog } from '../flinkey-keyfob-catalog';

describe('flinkey-keyfob-catalog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FlinkeyKeyfobCatalog],
      html: `<flinkey-keyfob-catalog></flinkey-keyfob-catalog>`,
    });
    expect(page.root).toEqualHtml(`
      <flinkey-keyfob-catalog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </flinkey-keyfob-catalog>
    `);
  });
});

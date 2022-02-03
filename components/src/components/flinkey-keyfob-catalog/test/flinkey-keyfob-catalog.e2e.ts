import { newE2EPage } from '@stencil/core/testing';

describe('flinkey-keyfob-catalog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flinkey-keyfob-catalog></flinkey-keyfob-catalog>');

    const element = await page.find('flinkey-keyfob-catalog');
    expect(element).toHaveClass('hydrated');
  });
});

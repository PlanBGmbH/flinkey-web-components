import { FlinkeyDropdown } from '../flinkey-dropdown';

describe('flinkey-dropdown', () => {
  describe('when calling getEntryValue(...)', () => {
    it('should call getValue(...) with expected parameters', () => {
      const dropdown = new FlinkeyDropdown();
      dropdown.valueField = 'id';
      const getValueSpy = jest.spyOn(dropdown, 'getValue');

      dropdown.getEntryValue({ id: 1242 });

      expect(getValueSpy).toHaveBeenCalledTimes(1);
      expect(getValueSpy).toHaveBeenCalledWith({ id: 1242 }, 'id');
    });
  });

  describe('when calling getEntryText(...)', () => {
    it('should call getValue(...) with expected parameters', () => {
      const dropdown = new FlinkeyDropdown();
      dropdown.textField = 'fieldWithLabel';
      const getValueSpy = jest.spyOn(dropdown, 'getValue');

      dropdown.getEntryText({ fieldWithLabel: 'TextLabel123' });

      expect(getValueSpy).toHaveBeenCalledTimes(1);
      expect(getValueSpy).toHaveBeenCalledWith({ fieldWithLabel: 'TextLabel123' }, 'fieldWithLabel');
    });
  });

  for (const testCase of [
    {
      dataItem: { name: 'Foobar' },
      field: 'name',
      expectedValue: 'Foobar',
    },
    {
      dataItem: true,
      field: undefined,
      expectedValue: 'true',
    },
    {
      dataItem: 'Foobar123',
      field: undefined,
      expectedValue: 'Foobar123',
    },
    {
      dataItem: 32145,
      field: undefined,
      expectedValue: 32145,
    },
    {
      dataItem: undefined,
      field: undefined,
      expectedValue: undefined,
    },
  ]) {
    describe(`when calling getValue(...) with dataItem ${JSON.stringify(testCase.dataItem)} and field ${testCase.field}`, () => {
      it('should return expected value', () => {
        const dropdown = new FlinkeyDropdown();

        const value = dropdown.getValue(testCase.dataItem, testCase.field);

        expect(value).toEqual(testCase.expectedValue);
      });
    });
  }

  describe('when calling selectedItemChangedHandler(...)', () => {
    it('should emit selectedItemChanged event', () => {
      const button = new FlinkeyDropdown();
      const emitSpy = jest.spyOn(button.selectedItemChanged, 'emit').mockImplementationOnce(() => {
        return {} as CustomEvent<string>;
      });

      button.selectedItemChangedHandler({ target: { value: 'SomeValue' } } as unknown as Event);

      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith('SomeValue');
    });
  });
});

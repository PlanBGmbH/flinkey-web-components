import { FlinkeyButton } from '../flinkey-button';
import { ButtonSize, ButtonType } from '../../../enums';

describe('flinkey-button', () => {
  for (const testCase of [
    {
      size: ButtonSize.XS,
      type: ButtonType.Primary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded px-2.5 py-1.5 text-xs shadow-sm border-transparent text-white bg-indigo-600 hover:bg-indigo-700',
    },
    {
      size: ButtonSize.S,
      type: ButtonType.Primary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-3 py-2 text-sm leading-4 shadow-sm border-transparent text-white bg-indigo-600 hover:bg-indigo-700',
    },
    {
      size: ButtonSize.M,
      type: ButtonType.Primary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-4 py-2 text-sm shadow-sm border-transparent text-white bg-indigo-600 hover:bg-indigo-700',
    },
    {
      size: ButtonSize.L,
      type: ButtonType.Primary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-4 py-2 text-base shadow-sm border-transparent text-white bg-indigo-600 hover:bg-indigo-700',
    },
    {
      size: ButtonSize.XL,
      type: ButtonType.Primary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-6 py-3 text-base shadow-sm border-transparent text-white bg-indigo-600 hover:bg-indigo-700',
    },
    {
      size: ButtonSize.XS,
      type: ButtonType.Secondary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded px-2.5 py-1.5 text-xs border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200',
    },
    {
      size: ButtonSize.S,
      type: ButtonType.Secondary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-3 py-2 text-sm leading-4 border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200',
    },
    {
      size: ButtonSize.M,
      type: ButtonType.Secondary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-4 py-2 text-sm border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200',
    },
    {
      size: ButtonSize.L,
      type: ButtonType.Secondary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-4 py-2 text-base border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200',
    },
    {
      size: ButtonSize.XL,
      type: ButtonType.Secondary,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-6 py-3 text-base border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200',
    },
    {
      size: ButtonSize.XS,
      type: ButtonType.White,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded px-2.5 py-1.5 text-xs border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50',
    },
    {
      size: ButtonSize.S,
      type: ButtonType.White,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-3 py-2 text-sm leading-4 border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50',
    },
    {
      size: ButtonSize.M,
      type: ButtonType.White,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-4 py-2 text-sm border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50',
    },
    {
      size: ButtonSize.L,
      type: ButtonType.White,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-4 py-2 text-base border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50',
    },
    {
      size: ButtonSize.XL,
      type: ButtonType.White,
      expectedClasses:
        'font-sans inline-flex items-center border font-medium focus:outline-none rounded-md px-6 py-3 text-base border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50',
    },
  ]) {
    describe(`when calling getButtonClasses() function and preset type is ${testCase.type} and preset size is ${testCase.size}`, () => {
      it('should return expected value', () => {
        const button = new FlinkeyButton();
        button.size = testCase.size;
        button.type = testCase.type;

        expect(button.getButtonClasses()).toBe(testCase.expectedClasses);
      });
    });
  }

  describe('when calling buttonClickedHandler()', () => {
    it('should emit buttonClicked event', () => {
      const button = new FlinkeyButton();
      const emitSpy = jest.spyOn(button.buttonClicked, 'emit').mockImplementationOnce(() => {
        return {} as CustomEvent<unknown>;
      });

      button.buttonClickedHandler();

      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith();
    });
  });
});

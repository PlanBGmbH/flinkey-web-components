import { FlinkeyTable } from '../flinkey-table';

describe('flinkey-table', () => {
  for (const testCase of [
    {
      type: 'boolean true',
      expectedVisibility: true,
      input: true,
    },
    {
      type: 'boolean false',
      expectedVisibility: false,
      input: false,
    },
    {
      type: 'arrow function returning boolean true',
      expectedVisibility: true,
      input: () => {
        return true;
      },
    },
    {
      type: 'arrow function returning boolean false',
      expectedVisibility: false,
      input: () => {
        return false;
      },
    },
  ]) {
    describe(`when calling getVisibility(...) with ${testCase.type}`, () => {
      it(`should return visibility ${testCase.expectedVisibility.toString()} as boolean`, () => {
        const button = new FlinkeyTable();
        const visibility = button.getVisibility(testCase.input);

        if (testCase.expectedVisibility) {
          expect(visibility).toBeTruthy();
        } else {
          expect(visibility).toBeFalsy();
        }
      });
    });
  }
});
